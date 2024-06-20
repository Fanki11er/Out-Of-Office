using Out_Of_Office.Server.Enums;

namespace Out_Of_Office.Server.Entities
{
    public class ApprovalRequest
    {
        public required int Id { get; set; }
        public required int Approver { get; set; }
        public required int LeaveRequest { get; set; }
        public required ERequestStatus Status { get; set; }
        public string Comment { get; set; } = string.Empty;
    }
}
