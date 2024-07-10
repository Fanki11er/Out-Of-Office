using Azure.Core;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Out_Of_Office.Server.Data;
using Out_Of_Office.Server.Entities;
using Out_Of_Office.Server.Enums;
using Out_Of_Office.Server.Exceptions;
using Out_Of_Office.Server.Models;
using Out_Of_Office.Server.Utilities;
using System.Linq.Expressions;

namespace Out_Of_Office.Server.Services
{
    public interface IListService
    {
        public List<EmployeeDTO> GetHRManagerEmployees();
        public EmployeeDTO UpdateHRManagerEmployeeList(EmployeeDTO employeeDTO);
        public List<LeaveRequestDTO> GetHRManagerLeaveRequests();
        public List<ApprovalRequestDTO> GetHRManagerApprovalRequests();
        public void ChangeApprovalRequestStatus(ChangeApprovalRequestStatusDTO newStatusDTO);
        public List<CombinedValueDTO> GetSubdivisionOptions();
        public List<CombinedValueDTO> GetPeoplePartnerOptions();
        public List<CombinedValueDTO> GetPositionOptions();
        public List<CombinedValueDTO> GetStatusOptions();
    };
    public class ListsService(DataContext dataContext, IUserContextService userContextService): IListService
    {
        private readonly DataContext _dataContext = dataContext;

        private readonly IUserContextService _userContextService = userContextService;

        public List<EmployeeDTO> GetHRManagerEmployees()
        {
            List<EmployeeDTO> employeeesDTOs = [];

            //var authenticatedUserId = _userContextService.GetUserId();
            var authenticatedUserId = 2;

            var employees = _dataContext.Employees
                .Where(emp => emp.PeoplePartnerId == authenticatedUserId)
                .Include(i => i.Subdivision)
            .ToList();

            var peoplePartner = _dataContext.Employees
                .FirstOrDefault(e => e.Id == authenticatedUserId);
            
            foreach (var employee in employees)
            {
                var dto = Utilities.Utilities.CreateEmployeeDTO(employee, peoplePartner);

                employeeesDTOs.Add(dto);
            }

            return employeeesDTOs;
        }

        public EmployeeDTO UpdateHRManagerEmployeeList(EmployeeDTO employeeDTO)
        {

            var employeeForUpdate =  _dataContext.Employees
                .FirstOrDefault(e => e.Id == employeeDTO.Id) ?? 
                throw new BadHttpRequestException("Employee for update entry not found");

            if (employeeForUpdate.Position != EPositions.HR_Manager &&
                employeeForUpdate.Position != EPositions.HR_Director &&
                employeeDTO.PeoplePartner is null)
            {
                throw new BadHttpRequestException("Only HR Director position not need People Partner entry");
            }

            if (employeeForUpdate.Position == EPositions.HR_Manager)
            {
                var newPosition = (EPositions)employeeDTO.Position.Id;

                if(newPosition != EPositions.HR_Director)
                {
                    var hasEmployees = _dataContext.Employees
                        .Any(e => e.PeoplePartnerId == employeeForUpdate.Id);

                    if (hasEmployees)
                    {
                        throw new BadHttpRequestException("Can't change position from HR Manager if there are connected employees");
                    }
                }   
            }

            if (employeeForUpdate.Position == EPositions.Project_Manager)
            {
                var newPosition = (EPositions)employeeDTO.Position.Id;

                if (newPosition != EPositions.Project_Manager)
                {
                    var hasProjets = _dataContext.Projects
                        .Any(e => e.ProjectManagerId == employeeForUpdate.Id);

                    if (hasProjets)
                    {
                        throw new BadHttpRequestException("Can't change position from Project Manager if there are connected projects");
                    }
                }
            }


            employeeForUpdate.FullName = employeeDTO.FullName;
            employeeForUpdate.PeoplePartnerId = employeeDTO.PeoplePartner?.Id;
            employeeForUpdate.Status = (EStatus)employeeDTO.Status.Id;
            employeeForUpdate.Position = (EPositions)employeeDTO.Position.Id;
            employeeForUpdate.SubdivisionId = employeeDTO.Subdivision.Id;

            _dataContext.Employees.Update(employeeForUpdate);

            DatabaseUtilities.SaveChangesToDatabase(_dataContext);

            return employeeDTO;
        }

       public List<LeaveRequestDTO> GetHRManagerLeaveRequests()
       {
            //var authenticatedUserId = _userContextService.GetUserId();
            var authenticatedUserId = 2;

            var leaveRequestsDTOs = _dataContext.LeaveRequests
                .Include(i => i.Employee)
                .Include(i=> i.AbsenceReason)
                .Where(lr => lr.Employee != null && lr.Employee.PeoplePartnerId == authenticatedUserId)
                .Select(elr => new LeaveRequestDTO() 
                {
                    Id = elr.Id,
                    Employee = elr.Employee!.FullName,
                    StartDate = elr.StartDate.ToString(),
                    EndDate = elr.EndDate.ToString(),
                    AbsenceReason = elr.AbsenceReason!.Value,
                    Status = elr.Status.ToString(),
                    Comment = elr.Comment,

                }).ToList();

            return leaveRequestsDTOs;
       }

        public List<ApprovalRequestDTO> GetHRManagerApprovalRequests()
        {
            //var authenticatedUserId = _userContextService.GetUserId();

            var authenticatedUserId = 2;

            var approvalRequests = _dataContext.ApprovalRequests
                .Include(i => i.LeaveRequest)
                .ThenInclude(e => e!.Employee!)
                .Where(ar => ar.LeaveRequest!.Employee!.PeoplePartnerId == authenticatedUserId);

            var approvalRequestsDtos = approvalRequests.Select(ar => new ApprovalRequestDTO()
            {
                Id = ar.Id,
                Status = ar.Status.ToString(),
                Comment = ar.Comment,
                LeaveRequest = ar.LeaveRequestId
            }).ToList();

            return approvalRequestsDtos;
        }

        public void ChangeApprovalRequestStatus(ChangeApprovalRequestStatusDTO newStatusDTO)
        {
            //var authenticatedUserId = _userContextService.GetUserId();

            var authenticatedUserId = 2;

            if (newStatusDTO.NewStatus == ERequestStatus.Accepted.ToString())
            {
                ApproveRequest(newStatusDTO.RequestId, authenticatedUserId);
            }
            else
            {
                RejectRequest(newStatusDTO.RequestId, newStatusDTO.Comment);
            }
        }

        public List<CombinedValueDTO> GetSubdivisionOptions()
        {
            List<CombinedValueDTO> combinedValueDTOs = [];

            var subdivisons = _dataContext.Subdivisions.ToList();
            foreach (var subdivision in subdivisons)
            {
                combinedValueDTOs.Add(new CombinedValueDTO()
                {
                    Id = subdivision.Id,
                    Value = subdivision.Name
                });
            }

            return combinedValueDTOs;
            
        }
        public List<CombinedValueDTO> GetPeoplePartnerOptions()
        {
            List<CombinedValueDTO> combinedValueDTOs = [];

            var peoplePartners = _dataContext.Employees
                .Where(e => e.Position == EPositions.HR_Manager)
                .ToList();

            foreach (var peoplePartner in peoplePartners)
            {
                combinedValueDTOs.Add(new CombinedValueDTO()
                {
                    Id = peoplePartner.Id,
                    Value = peoplePartner.FullName
                });
            }

            return combinedValueDTOs;

        }

        public List<CombinedValueDTO> GetPositionOptions()
        {

            List<CombinedValueDTO> combinedValueDTOs = Enum
               .GetValues(typeof(EPositions))
               .Cast<EPositions>()
               .Select(t => new CombinedValueDTO
               {
                   Id = ((int)t),
                   Value = t.ToString()
               }).Where(p => p.Value != EPositions.HR_Director.ToString()).ToList();
            return combinedValueDTOs;
        }

        public List<CombinedValueDTO> GetStatusOptions()
        {
            List<CombinedValueDTO> combinedValueDTOs = Enum
               .GetValues(typeof(EStatus))
               .Cast<EStatus>()
               .Select(t => new CombinedValueDTO
               {
                   Id = ((int)t),
                   Value = t.ToString()
               }).ToList();
            return combinedValueDTOs;
        }

        private void ApproveRequest(int requestId, int approverId)
        {
            var approvalRequest = _dataContext.ApprovalRequests.
                Include(i => i.LeaveRequest).
                ThenInclude(e => e!.Employee)
                .FirstOrDefault(ar => ar.Id == requestId) ?? 
                throw new BadHttpRequestException("Request not found");

            var leaveDays = approvalRequest.LeaveRequest!.EndDate.DayNumber - approvalRequest.LeaveRequest.StartDate.DayNumber;

            if (approvalRequest.LeaveRequest.Employee!.OutOfOfficeBalance < leaveDays)
            {
                throw new BadHttpRequestException("Not enough days in out of office balance ");
            }

            approvalRequest.Status = ERequestStatus.Accepted;
            approvalRequest.ApproverId = approverId;
            approvalRequest.LeaveRequest.Status = ERequestStatus.Accepted;
            approvalRequest.LeaveRequest.Employee.OutOfOfficeBalance -= leaveDays;

            _dataContext.Update(approvalRequest);

            DatabaseUtilities.SaveChangesToDatabase(_dataContext);
        }

        private void RejectRequest(int requestId, string? comment) 
        {
            var approvalRequest = _dataContext.ApprovalRequests.
               Include(i => i.LeaveRequest)
               .FirstOrDefault(ar => ar.Id == requestId) ??
               throw new BadHttpRequestException("Request not found");

            approvalRequest.Status = ERequestStatus.Rejected;
            approvalRequest.LeaveRequest!.Status = ERequestStatus.Rejected;
            approvalRequest.Comment = comment?? "";

            _dataContext.Update(approvalRequest);

            DatabaseUtilities.SaveChangesToDatabase(_dataContext);
        }
    }
}
