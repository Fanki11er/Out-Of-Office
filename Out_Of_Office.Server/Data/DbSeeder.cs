using Microsoft.EntityFrameworkCore;

namespace Out_Of_Office.Server.Data
{
    public class DbSeeder
    {
        private readonly DataContext _dataContext;

        public DbSeeder(DataContext dataContext)
        {
            _dataContext = dataContext;
        }

        public void Seed()
        {
            if (_dataContext.Database.CanConnect())
            {
                var pendingMigrations = _dataContext.Database.GetPendingMigrations();

                if (pendingMigrations != null && pendingMigrations.Any())
                {
                    _dataContext.Database.Migrate();
                }
            }
        }
    }
}
