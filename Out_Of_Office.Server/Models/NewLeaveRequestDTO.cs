using Out_Of_Office.Server.Entities;
using Out_Of_Office.Server.Enums;

namespace Out_Of_Office.Server.Models
{
    public class NewLeaveRequestDTO
    {
        public required int AbsenceReason { get; set; }
        public required string StartDate { get; set; }
        public required string EndDate { get; set; }
        public string? Comment { get; set; } = string.Empty;
    }
}
