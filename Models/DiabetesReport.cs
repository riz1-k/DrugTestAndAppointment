using System;
namespace testdrug.Models
{
    public class DiabetesReport
    {
        public int RepId { get; set; }
        public string UserName { get; set; } 
        public string Doctor { get; set; }
        public int Glucose { get; set; } 
        public string RepTime { get; set; } 
    }
}
