namespace Out_Of_Office.Server.Models
{
    public class ChangeLeaveRequestStatusDTO
    {
        public required int RequestId { get; set; }
        public required string NewStatus { get; set; }
    }
}
