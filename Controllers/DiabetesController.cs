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
    [Route("api/diabetesreport")]
    [ApiController]
    public class DiabetesController : ControllerBase
    {

        private readonly IConfiguration _configuration;

        public DiabetesController(IConfiguration configuration)
        {
            _configuration = configuration;
        }
        [HttpGet]
        public JsonResult Get()
        {
            string query = @"
                    select * from dbo.DiabetesReport";
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
        public JsonResult Post(DiabetesReport user)
        {
            string query = @"
                    insert into dbo.DiabetesReport (UserName,Doctor,Glucose,RepTime)
                    values
                    ('" + user.UserName+ @"'
                    ,'" + user.Doctor + @"'
                    ,'" + user.Glucose + @"'
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
