using Out_Of_Office.Server.Enums;

namespace Out_Of_Office.Server.Models
{
    public class LoggedEmployeeDTO
    {
        public required string FullName { get; set; }
        public required EPositions Position { get; set; }

    }
}
