namespace Out_Of_Office.Server.Models
{
    public class ChangeApprovalRequestStatusDTO
    {
        public required  int RequestId { get; set; }
        public required string NewStatus { get; set; }
        public string? Comment { get; set; } = String.Empty;


    }
}
