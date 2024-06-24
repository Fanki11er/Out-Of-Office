using Out_Of_Office.Server.Entities;
using Out_Of_Office.Server.Enums;

namespace Out_Of_Office.Server.Models
{
    public class EmployeeDTO
    {
        public required string FullName { get; set; }
        public required string Subdivision { get; set; }
        public required EPositions Position { get; set; }
        public required EStatus Status { get; set; }
        public required int OutOfOfficeBalance { get; set; }
        public required string PeoplePartner { get; set; }
    }
}
