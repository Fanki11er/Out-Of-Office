using Out_Of_Office.Server.Enums;

namespace Out_Of_Office.Server.Entities
{
    public class Employee
    {
        public int Id { get; set; }
        public required string FullName { get; set; }
        public required string Login { get; set; }
        public required string PasswordHash { get; set; }
        public required int SubdivisionId { get; set; }
        public virtual Subdivision? Subdivision { get; set; }
        public required EPositions Position { get; set; }
        public required EStatus Status { get; set; }
        public required int OutOfOfficeBalance { get; set; }
        public string? ImagePath { get; set; }  
        public  int? PeoplePartnerId { get; set; }
        public int? ProjectId { get; set; }
    }
}
