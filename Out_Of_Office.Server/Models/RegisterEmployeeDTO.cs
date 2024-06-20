using Out_Of_Office.Server.Enums;

namespace Out_Of_Office.Server.Models
{
    public class RegisterEmployeeDTO
    {
        public required string Login { get; set; }
        public required string Password { get; set; }
        public  required string FullName { get; set; }
        public required int Subdivision { get; set; }
        public required EPositions Position { get; set; }
        public required EStatus Status { get; set; }
        public required int PeoplePartner { get; set; }
        public IFormFile? ImageFile { get; set; }
    }
}
