namespace Out_Of_Office.Server.Models
{
    public class EditLeaveRequestDTO
    {
        public required int LeaveRequestId { get; set; }
        public required int AbsenceReason { get; set; }
        public required string StartDate { get; set; }
        public required string EndDate { get; set; }
        public string? Comment { get; set; } = string.Empty;
    }
}
