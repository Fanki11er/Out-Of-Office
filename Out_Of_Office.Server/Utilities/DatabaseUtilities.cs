using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using Out_Of_Office.Server.Data;
using Out_Of_Office.Server.Exceptions;

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

        public static void SaveChangesToDatabase(DataContext dataContext, string errorMessage = "Nie udało się zapisać do bazy")
        {
            var changesCounter = dataContext.SaveChanges();

            if (changesCounter == 0)
            {
                throw new DatabaseNotUpdatedException(errorMessage);
            }
        }

    }

   
}
