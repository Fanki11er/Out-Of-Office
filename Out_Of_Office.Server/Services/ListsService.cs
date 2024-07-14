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
using System.Security.Cryptography.Xml;

namespace Out_Of_Office.Server.Services
{
    public interface IListService
    {
        public List<EmployeeDTO> GetHRManagerEmployees();
        public EmployeeDTO UpdateHRManagerEmployeeList(EmployeeDTO employeeDTO);
        public List<LeaveRequestDTO> GetHRManagerLeaveRequests();
        public List<ApprovalRequestDTO> GetHRManagerApprovalRequests();
        public List<ApprovalRequestDTO> GetEmployeeApprovalRequests();
        public List<LeaveRequestDTO> GetEmployeeLeaveRequests();
        public void CreateNewEmployeeLeaveRequest(NewLeaveRequestDTO newLeaveRequestDTO);
        public void EditEmployeeLeaveRequest(EditLeaveRequestDTO editLeaveRequestDTO);
        public List<ProjectDTO> GetHRManagerProjects();
        public List<ProjectDTO> GetEmployeeProjects();
        public void ChangeApprovalRequestStatus(ChangeApprovalRequestStatusDTO newStatusDTO);
        public List<CombinedValueDTO> GetSubdivisionOptions();
        public List<CombinedValueDTO> GetPeoplePartnerOptions();
        public List<CombinedValueDTO> GetPositionOptions();
        public List<CombinedValueDTO> GetStatusOptions();
        public List<CombinedValueDTO> GetAbsenceReasonOptions();
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

                if (newPosition != EPositions.HR_Director)
                {
                    var hasProjects = _dataContext.Projects
                        .Any(p => p.ProjectManagerId == employeeForUpdate.Id);

                    if (hasProjects)
                    {
                        throw new BadHttpRequestException("Can't change position from Project Manager if there are connected projects");
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
                    AbsenceReason = new CombinedValueDTO()
                    { 
                        Id = elr.AbsenceReason!.Id, 
                        Value = elr.AbsenceReason!.Value, 
                    },
                    Status = elr.Status.ToString(),
                    Comment = elr.Comment,

                }).ToList();

            return leaveRequestsDTOs;
       }

        public List<LeaveRequestDTO> GetEmployeeLeaveRequests()
        {
            //var authenticatedUserId = _userContextService.GetUserId();
            var authenticatedUserId = 4;

            var leaveRequestsDTOs = _dataContext.LeaveRequests
                .Include(i => i.AbsenceReason)
                .Include (i=> i.Employee)
                .Where(lr => lr.EmployeeId == authenticatedUserId)
                .Select(elr => new LeaveRequestDTO()
                {
                    Id = elr.Id,
                    Employee = elr.Employee!.FullName,
                    StartDate = elr.StartDate.ToString(),
                    EndDate = elr.EndDate.ToString(),
                    AbsenceReason = new CombinedValueDTO()
                    {
                        Id = elr.AbsenceReason!.Id,
                        Value = elr.AbsenceReason!.Value,
                    },
                    Status = elr.Status.ToString(),
                    Comment = elr.Comment
                }).ToList();

            return leaveRequestsDTOs;
        }

        public void CreateNewEmployeeLeaveRequest(NewLeaveRequestDTO newLeaveRequestDTO)
        {
            //var authenticatedUserId = _userContextService.GetUserId();

            var authenticatedUserId = 4;

            var newLeaveRequest = new LeaveRequest()
            {
                EmployeeId = authenticatedUserId,
                AbsenceReasonId = newLeaveRequestDTO.AbsenceReason,
                StartDate = DateOnly.Parse(newLeaveRequestDTO.StartDate),
                EndDate = DateOnly.Parse(newLeaveRequestDTO.EndDate),
                Comment = newLeaveRequestDTO.Comment?? "",
            };

            _dataContext.LeaveRequests.Add(newLeaveRequest);

            Utilities.DatabaseUtilities.SaveChangesToDatabase(_dataContext);


            if(newLeaveRequest.Id == 0)
            {
                throw new BadHttpRequestException("Problem with leave request occurred");
            }

            var newApprovalRequest = new ApprovalRequest()
            {
                LeaveRequestId = newLeaveRequest.Id,
                Status = ERequestStatus.New,
            };

            _dataContext.ApprovalRequests.Add(newApprovalRequest);

            Utilities.DatabaseUtilities.SaveChangesToDatabase(_dataContext);
        }

        public void EditEmployeeLeaveRequest(EditLeaveRequestDTO editLeaveRequestDTO)
        {
            var oldLeaveRequest = _dataContext.LeaveRequests
                .FirstOrDefault(lr => lr.Id == editLeaveRequestDTO.LeaveRequestId) ??
                throw new BadHttpRequestException("Leave request not found");

            if (oldLeaveRequest.Status == ERequestStatus.Accepted || oldLeaveRequest.Status == ERequestStatus.Rejected)
            {
                throw new BadHttpRequestException("Accepted or Rejected leave request can not be edited");
            }

            oldLeaveRequest.StartDate = DateOnly.Parse(editLeaveRequestDTO.StartDate);
            oldLeaveRequest.EndDate = DateOnly.Parse(editLeaveRequestDTO.EndDate);
            oldLeaveRequest.AbsenceReasonId = editLeaveRequestDTO.AbsenceReason;
            oldLeaveRequest.Comment = editLeaveRequestDTO.Comment ?? "";

            _dataContext.LeaveRequests.Update(oldLeaveRequest);

            Utilities.DatabaseUtilities.SaveChangesToDatabase(_dataContext);
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

        public List<ApprovalRequestDTO> GetEmployeeApprovalRequests()
        {
            //var authenticatedUserId = _userContextService.GetUserId();

            var authenticatedUserId = 5;

            var approvalRequestsDTOs = _dataContext.ApprovalRequests
                .Include(i => i.LeaveRequest)
                .Where(ar => ar.LeaveRequest!.EmployeeId == authenticatedUserId)
                .Select(ar => new ApprovalRequestDTO()
                {
                    Id = ar.Id,
                    Status = ar.Status.ToString(),
                    Comment = ar.Comment,
                    LeaveRequest = ar.LeaveRequestId
                }).ToList();

            return approvalRequestsDTOs;
        }

        public List<ProjectDTO> GetHRManagerProjects()
        {
            //var authenticatedUserId = _userContextService.GetUserId();

            var authenticatedUserId = 2;

            var projectsIds =  _dataContext.Employees.Where(e => e.PeoplePartnerId == authenticatedUserId && e.ProjectId != 0)
                .Select(e => e.ProjectId)
                .Distinct()
                .ToList();

            var projects = _dataContext.Projects
                .Include(pt => pt.ProjectType)
                .Where(p => projectsIds
                .Contains(p.Id));

            var projectsDTOs = projects.Select(p => new ProjectDTO()
            {
                Id= p.Id,
                ProjectType = p.ProjectType!.Value,
                ProjectManager = _dataContext.Employees.First(e => e.Id == p.ProjectManagerId).FullName,
                StartDate = p.StartDate.ToString(),
                EndDate = p.EndDate.ToString()?? "",
                Status = p.Status.ToString(),
                Comment= p.Comment,
            }).ToList();

            return projectsDTOs;
        }

        public List<ProjectDTO> GetEmployeeProjects()
        {
            //var authenticatedUserId = _userContextService.GetUserId();

            var authenticatedUserId = 5;

            var employee = _dataContext.Employees
                .FirstOrDefault(e => e.Id == authenticatedUserId) ??
                throw new BadHttpRequestException("Employee not found");

            var projectsDtos = _dataContext.Projects
                .Include(i => i.ProjectType)
                .Where(p => p.Id == employee.ProjectId)
                .Select(p => new ProjectDTO()
                {
                  Id = p.Id,
                  ProjectType = p.ProjectType!.Value,
                  ProjectManager = _dataContext.Employees.First(e => e.Id == p.ProjectManagerId).FullName,
                  StartDate = p.StartDate.ToString(),
                  EndDate = p.EndDate.ToString() ?? "",
                  Status = p.Status.ToString(),
                  Comment = p.Comment,
                }).ToList();

            return projectsDtos;
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

        public List<CombinedValueDTO> GetAbsenceReasonOptions()
        {

            var absenceReasonsDTOs = _dataContext.AbsenceReasons.Select(ar => new CombinedValueDTO()
            {
                Id = ar.Id,
                Value = ar.Value,
            }).ToList();

            return absenceReasonsDTOs ;

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
