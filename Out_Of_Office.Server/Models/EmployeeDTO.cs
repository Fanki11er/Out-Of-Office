using Out_Of_Office.Server.Entities;
using Out_Of_Office.Server.Enums;

namespace Out_Of_Office.Server.Models
{
    public class EmployeeDTO
    {
        public required int Id { get; set; }
        public required string FullName { get; set; }
        public required CombinedValueDTO Subdivision { get; set; }
        public required CombinedValueDTO Position { get; set; }
        public required CombinedValueDTO Status { get; set; }
        public required int OutOfOfficeBalance { get; set; }
        public  CombinedValueDTO? PeoplePartner { get; set; }
    }
}
