using System;
namespace testdrug.Models
{
    public class SaltReport
    {
        public int RepId { get; set; }
        public string UserName { get; set; } 
        public string Doctor { get; set; }
        public int Glucose { get; set; } 
        public int Potassium { get; set; } 
        public int Urea { get; set; } 
        public int Calcium { get; set; } 
        public string RepTime { get; set; } 
    }
}
