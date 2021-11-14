using System;
namespace testdrug.Models
{
    public class Appointment
    {
        public int ApId { get; set; }
        public string UserName { get; set; }
        public string UserEmail { get; set; }
        public string Doctor { get; set; } 
        public string Test { get; set; } 
        public string ApDate { get; set; } 
        public string ApTime { get; set; } 
        public string Fee { get; set; } 
    }
}
