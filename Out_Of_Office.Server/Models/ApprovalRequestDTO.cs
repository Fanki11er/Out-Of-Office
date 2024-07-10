using static System.Runtime.InteropServices.JavaScript.JSType;

namespace Out_Of_Office.Server.Models
{
    public class ApprovalRequestDTO
    {
        public required int Id { get; set; }
        public string? Approver { get; set; } = string.Empty;
        public required int LeaveRequest { get; set; }
        public required string Status { get; set; }
        public string? Comment { get; set; } = string.Empty;
    }
}
