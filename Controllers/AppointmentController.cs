using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using System.Data.SqlClient;
using System.Data;
using testdrug.Models;
using System.IO;
using Microsoft.AspNetCore.HostFiltering;

namespace drugttest.com.Controllers
{
    [Route("api/appointments")]
    [ApiController]
    public class AppointmentController : Controller
    {
        private readonly IConfiguration _configuration;

        public AppointmentController(IConfiguration configuration)
        {
            _configuration = configuration;
        }
        [HttpGet]
        public JsonResult Get()
        {
            string query = @"
                    select * from dbo.Appointments";
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
        public JsonResult Post(Appointment user)
        {
            string query = @"
                    insert into dbo.Appointments (UserName,UserEmail,Doctor,Test,ApDate,ApTime,Fee)
                    values
                    ('" + user.UserName + @"'
                    ,'" + user.UserEmail + @"'
                    ,'" + user.Doctor + @"'
                    ,'" + user.Test + @"'
                    ,'" + user.ApDate + @"'
                    ,'" + user.ApTime + @"'
                    ,'" + user.Fee + @"'
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
