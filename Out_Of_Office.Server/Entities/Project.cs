using Out_Of_Office.Server.Enums;

namespace Out_Of_Office.Server.Entities
{
    public class Project
    {
        public int Id { get; set; }
        public required ProjectType ProjectType { get; set; }
        public required DateOnly StartDate { get; set; }
        public  DateOnly? EndDate { get; set; }
        public required int ProjectManagerId { get; set; }
        public virtual Employee? ProjectManager { get; set; }
        public string Comment { get; set; } = string.Empty;
        public required EStatus Status { get; set; }


    }
}
