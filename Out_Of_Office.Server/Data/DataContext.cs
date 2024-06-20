using Microsoft.EntityFrameworkCore;
using Out_Of_Office.Server.Entities;

namespace Out_Of_Office.Server.Data
{
    public class DataContext :DbContext
    {
        public DataContext(DbContextOptions<DataContext> options) : base(options)
        {
            
        }

        public DbSet<Employee> Employees { get; set; }
        public DbSet<Project> Projects { get; set; }
        public DbSet<LeaveRequest> LeaveRequests { get; set; }
        public DbSet<ApprovalRequest> ApprovalRequests { get; set; }
        public DbSet<AbsenceReason> AbsenceReasons { get; set; }
        public DbSet<ProjectType> ProjectTypes { get; set; }
        public DbSet<Subdivision> Subdivisions { get; set; }
    }
}
