using Microsoft.AspNetCore.Authentication;
using Microsoft.EntityFrameworkCore;
using Out_Of_Office.Server.Data;
using Out_Of_Office.Server.Utilities;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
builder.Services.AddDbContext<DataContext>(options =>
{
    options.UseSqlServer(builder.Configuration.GetConnectionString("OutOfOfficeDb"));
});

builder.Services.AddScoped<DbSeeder, DbSeeder>();

builder.Services.AddScoped<IAuthenticationService, AuthenticationService>();

var app = builder.Build();

DatabaseUtilities.CreateDatabase(app);

DatabaseUtilities.SeedDatabase(app);

app.UseDefaultFiles();
app.UseStaticFiles();

// Configure the HTTP request pipeline.

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.MapFallbackToFile("/index.html");

app.Run();
