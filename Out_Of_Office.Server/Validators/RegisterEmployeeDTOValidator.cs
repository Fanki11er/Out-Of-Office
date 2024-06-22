// Ignore Spelling: Validator Validators

using FluentValidation;
using Microsoft.EntityFrameworkCore;
using Out_Of_Office.Server.Data;
using Out_Of_Office.Server.Enums;
using Out_Of_Office.Server.Models;
using System.Text.RegularExpressions;

namespace Out_Of_Office.Server.Validators
{ 
    public class RegisterUserDTOValidator: AbstractValidator<RegisterEmployeeDTO>
    {
        private readonly DataContext _dataContext;
        public RegisterUserDTOValidator(DataContext dataContext)
        {
            _dataContext = dataContext;

            RuleFor(r => r.Login)
                .NotEmpty()
                .WithMessage("Login is required");

            RuleFor(r => r.Login)
               .MinimumLength(2)
               .WithMessage("Minimum login length is 2");

            RuleFor(r => r.Login)
                .Custom((value, context) =>
                {
                    var loginExists = _dataContext.Employees.Any(e => e.Login == value);
                    if (loginExists)
                    {
                        context.AddFailure("Login", "Login already exists");
                    }
                });

            RuleFor(r => r.Password)
                .MinimumLength(8)
                .WithMessage("Minimal password length is 8");

            RuleFor(r => r.ConfirmPassword).Equal(u => u.Password).
               WithMessage("Passwords are not equal");

            RuleFor(r => r.FullName).Custom((value, context) => 
            {
                string pattern = @"^[a-zA-z]{2,}[ ][a-zA-z- ]{2,}$";
                if (value != "" && value != null && !Regex.IsMatch(value, pattern))
                {
                    context.AddFailure("Full Name", "Incorrect value");
                }
            });

            RuleFor(r => r.Subdivision).NotEmpty().WithMessage("Subdivision is required");

            RuleFor(r => r.Subdivision).Custom((value, context) =>
            {
                var subdivisionExists = _dataContext.Subdivisions.Any(s => s.Id == value);
                if (!subdivisionExists) 
                {
                    context.AddFailure("Subdivision", "Subdivision does not exist");
                }
            });

            RuleFor(r => r.Position)
                .NotEmpty()
                .WithMessage("Position is required");

            RuleFor(r => r.Position).Custom((value, context) =>
            {
                var positionExists = Enum.IsDefined(typeof(EPositions), value);
                if (!positionExists)
                {
                    context.AddFailure("Position", "Position does not exist");
                }
            });

            RuleFor(r => r.Status)
               .NotEmpty()
               .WithMessage("Status is required");

            RuleFor(r => r.Status).Custom((value, context) =>
            {
                var statusExists = Enum.IsDefined(typeof(EStatus), value);
                if (!statusExists)
                {
                    context.AddFailure("Status", "Status does not exist");
                }
            });

            RuleFor(r => r.PeoplePartner)
                .NotEmpty()
                .WithMessage("People partner is required");

            RuleFor(r => r.PeoplePartner).Custom((value, context) =>
            {
                var peopePartnerExists = _dataContext.Employees.Any(p => p.Id == value && p.Position == EPositions.HRManager );
                if (!peopePartnerExists)
                {
                    context.AddFailure("People Partner", "People Partner does not exist");
                }
            });

        }

    }
}
