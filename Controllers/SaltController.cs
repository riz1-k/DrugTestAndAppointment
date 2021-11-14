using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using System.Data.SqlClient;
using System.Data;
using testdrug.Models;
using System.IO;
using Microsoft.AspNetCore.HostFiltering;   

namespace testdrug.Controllers
{
    [Route("api/saltreport")]
    [ApiController]
    public class SaltController : ControllerBase
    {

        private readonly IConfiguration _configuration;

        public SaltController(IConfiguration configuration)
        {
            _configuration = configuration;
        }
        [HttpGet]
        public JsonResult Get()
        {
            string query = @"
                    select * from dbo.SaltReport";
            DataTable table = new DataTable();
            string sqlDataSource = _configuration.GetConnectionString("DrugTestConnection");
            SqlDataReader myReader;
            using (SqlConnection myCon = new SqlConnection(sqlDataSource))
            {
                myCon.Open();
                using (SqlCommand myCommand = new SqlCommand(query, myCon))
                {
                    myReader = myCommand.ExecuteReader();
                    table.Load(myReader);

                    myReader.Close();
                    myCon.Close();
                }
            }
            return new JsonResult(table);
        }
        [HttpPost]
        public JsonResult Post(SaltReport user)
        {
            string query = @"
                    insert into dbo.SaltReport (UserName,Doctor,Glucose,Potassium,Urea,Calcium,RepTime)
                    values
                    ('" + user.UserName+ @"'
                    ,'" + user.Doctor + @"'
                    ,'" + user.Glucose + @"'
                    ,'" + user.Potassium + @"'
                    ,'" + user.Urea + @"'
                    ,'" + user.Calcium + @"'
                    ,'" + user.RepTime + @"'
                    )";
            DataTable table = new DataTable();
            string sqlDataSource = _configuration.GetConnectionString("DrugTestConnection");
            SqlDataReader myReader;
            using (SqlConnection myCon = new SqlConnection(sqlDataSource))
            {
                myCon.Open();
                using (SqlCommand myCommand = new SqlCommand(query, myCon))
                {
                    myReader = myCommand.ExecuteReader();
                    table.Load(myReader);

                    myReader.Close();
                    myCon.Close();
                }
            }
            return new JsonResult("Added Successfully!");
        }
    }
}
