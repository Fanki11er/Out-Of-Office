// Ignore Spelling: Validator Validators

using FluentValidation;
using Out_Of_Office.Server.Data;
using Out_Of_Office.Server.Models;

namespace Out_Of_Office.Server.Validators
{
    public class EditLeaveRequestDTOValidator: AbstractValidator<EditLeaveRequestDTO>
    {
        private readonly DataContext _dataContext;
        public EditLeaveRequestDTOValidator(DataContext dataContext)
        {
            _dataContext = dataContext;

            RuleFor(r => r.LeaveRequestId)
                .GreaterThan(0)
                .WithMessage("Leave request not found");

            RuleFor(r => r.AbsenceReason)
                .Custom((value, context) =>
                {
                    var absenceReasonExists = _dataContext.AbsenceReasons.Any(ar => ar.Id == value);
                    if (!absenceReasonExists)
                    {
                        context.AddFailure("Absence reason does not exist");
                    }
                });

            RuleFor(r => r.StartDate).
                Custom((value, context) =>
                {

                    var now = DateOnly.FromDateTime(DateTime.Now);

                    var dateForValidate = DateOnly.Parse(value);

                    if (now > dateForValidate)
                    {
                        context.AddFailure("Start date is in the past");
                    }

                });

            RuleFor(r => r.EndDate)
                .Must((model, filed) =>
                {
                    return DateOnly.Parse(model.StartDate) < DateOnly.Parse(model.EndDate);
                }).WithMessage("End date must be after start date");

        }
    }
}
