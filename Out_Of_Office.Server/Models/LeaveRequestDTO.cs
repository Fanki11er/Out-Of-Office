namespace Out_Of_Office.Server.Models
{
    public class LeaveRequestDTO
    {
        public required int Id { get; set; }
        public required string Employee { get; set; }
        public required string AbsenceReason { get; set; }
        public required string StartDate { get; set; }
        public required string EndDate { get; set; }
        public required string Status { get; set; }
        public string Comment { get; set; } =  String.Empty;
    }
}
