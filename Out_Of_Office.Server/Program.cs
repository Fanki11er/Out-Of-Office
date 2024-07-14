using FluentValidation;
using FluentValidation.AspNetCore;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using Out_Of_Office.Server;
using Out_Of_Office.Server.Data;
using Out_Of_Office.Server.MiddleWares;
using Out_Of_Office.Server.Models;
using Out_Of_Office.Server.Services;
using Out_Of_Office.Server.Utilities;
using Out_Of_Office.Server.Validators;
using System.Text;

var builder = WebApplication.CreateBuilder(args);

var authenticationSettings = new AuthenticationSettings();

builder.Configuration.GetSection("AppSecuritySettings").Bind(authenticationSettings);

builder.Services.AddSingleton(authenticationSettings);

// Add services to the container.

builder.Services.AddControllers();

builder.Services.AddAuthentication()
.AddJwtBearer(cfg =>
{
    cfg.RequireHttpsMetadata = true;
    cfg.SaveToken = true;
    cfg.TokenValidationParameters = new TokenValidationParameters
    {
        ValidIssuer = authenticationSettings.JWTIssuer,
        ValidAudience = authenticationSettings.JWTIssuer,
        IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(authenticationSettings.JWTKey))
    };
});

builder.Services.AddDbContext<DataContext>(options =>
{
    options.UseSqlServer(builder.Configuration.GetConnectionString("OutOfOfficeDb"));
});

builder.Services.AddScoped<DbSeeder, DbSeeder>();

builder.Services.AddScoped<IAuthenticationService, AuthenticationService>();

builder.Services.AddHttpContextAccessor();

builder.Services.AddScoped<IUserContextService, UserContextService>();

builder.Services.AddScoped<IListService, ListsService>();

builder.Services.AddFluentValidationAutoValidation();

builder.Services.AddCors(p => p.AddPolicy("CORS", builder =>
{
    builder.WithOrigins("https://localhost:5173")
    .AllowAnyMethod()
    .AllowAnyHeader()
    .AllowCredentials();
}));

// Add Validators

builder.Services.AddScoped<IValidator<RegisterEmployeeDTO>, RegisterEmployeeDTOValidator>();
builder.Services.AddScoped<IValidator<LoginEmployeeDTO>, LoginEmployeeDTOValidator>();
builder.Services.AddScoped<IValidator<EmployeeDTO>, EmployeeDTOValidator>();
builder.Services.AddScoped<IValidator<ChangeApprovalRequestStatusDTO>, ChangeApprovalRequestStatusDTOValidator>();
builder.Services.AddScoped<IValidator<NewLeaveRequestDTO>, NewLeaveRequestDTOValidator>();
builder.Services.AddScoped<IValidator<EditLeaveRequestDTO>, EditLeaveRequestDTOValidator>();
builder.Services.AddScoped<IValidator<ChangeLeaveRequestStatusDTO>, ChangeLeaveRequestStatusDTOValidator>();


// Add MiddleWare
builder.Services.AddScoped<ErrorHandlingMiddleWare>();



var app = builder.Build();

DatabaseUtilities.CreateDatabase(app);

DatabaseUtilities.SeedDatabase(app);

app.UseMiddleware<ErrorHandlingMiddleWare>();

app.UseDefaultFiles();
app.UseStaticFiles();

// Configure the HTTP request pipeline.
app.UseCors("CORS");

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.MapFallbackToFile("/index.html");

app.Run();
