// Ignore Spelling: Validator Validators

using FluentValidation;
using Out_Of_Office.Server.Data;
using Out_Of_Office.Server.Enums;
using Out_Of_Office.Server.Models;
using System.Text.RegularExpressions;

namespace Out_Of_Office.Server.Validators
{
    public class EmployeeDTOValidator : AbstractValidator<EmployeeDTO>
    {

        private readonly DataContext _dataContext;
        public EmployeeDTOValidator(DataContext dataContext)
        {
            _dataContext = dataContext;

            RuleFor(r => r.FullName).Custom((value, context) =>
            {
                string pattern = @"^[a-ząćęłńóżź]{2,}[- ]{1,1}[a-ząćęłńóżź]{2,}$";
                if (value != null && !Regex.IsMatch(value, pattern, RegexOptions.IgnoreCase))
                {
                    context.AddFailure("Full Name", "Format: Name Surname is required");
                }
            });

            RuleFor(r => r.Subdivision).NotEmpty().WithMessage("Subdivision is required");

            RuleFor(r => r.Subdivision).Custom((value, context) =>
            {
                var subdivisionExists = _dataContext.Subdivisions.Any(s => s.Id == value.Id);
                if (!subdivisionExists)
                {
                    context.AddFailure("Subdivision", "Subdivision does not exist");
                }
            });

            RuleFor(r => r.Position).Custom((value, context) =>
            {
                var positionExists = Enum.IsDefined(typeof(EPositions), value.Id);
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
                var statusExists = Enum.IsDefined(typeof(EStatus), value.Id);
                if (!statusExists)
                {
                    context.AddFailure("Status", "Status does not exist");
                }
            });

            RuleFor(r => r.PeoplePartner).Custom((value, context) =>
            {
               if (value is not null)
                {
                    var peopePartnerExists = _dataContext.Employees
                    .Any(p => p.Id == value.Id && p.Position == EPositions.HR_Manager);
                    if (!peopePartnerExists)
                    {
                        context.AddFailure("People Partner", "People Partner does not exist");
                    }
                }
            });

        }
    }
}
