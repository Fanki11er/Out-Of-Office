using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using Out_Of_Office.Server.Data;

namespace Out_Of_Office.Server.Utilities
{
    public static class DatabaseUtilities
    {

    public static void  SeedDatabase(WebApplication application)           
        {
           using (var scope = application.Services.CreateScope())
           {
                var dbInitializer = scope.ServiceProvider.GetRequiredService<DbSeeder>();
                dbInitializer.Seed();
           };
        }

        public static void CreateDatabase(WebApplication application)
        {
            using (var scope = application.Services.CreateScope())
            {
                var context = scope.ServiceProvider.GetRequiredService<DataContext>();
                context.Database.Migrate();
            };
        }

    }

   
}
