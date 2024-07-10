using Out_Of_Office.Server.Enums;

namespace Out_Of_Office.Server.Entities
{
    public class ApprovalRequest
    {
        public int Id { get; set; }
        public int? ApproverId { get; set; }
        public required int LeaveRequestId { get; set; }
        public virtual LeaveRequest? LeaveRequest { get; set; }
        public required ERequestStatus Status { get; set; }
        public string? Comment { get; set; } = string.Empty;
    }
}
