using Out_Of_Office.Server.Enums;

namespace Out_Of_Office.Server.Entities
{
    public class LeaveRequest
    {
        public int Id { get; set; }
        public required int EmployeeId { get; set; }
        public required int AbsenceReasonId { get; set; }   
        public virtual AbsenceReason? AbsenceReason {  get; set; }
        public required DateOnly StartDate { get; set; }
        public required DateOnly EndDate { get; set; }
        public string Comment { get; set; } = string.Empty;
        public ERequestStatus Status { get; set; } = ERequestStatus.New;
        public virtual Employee? Employee { get; set; }
    }
}
