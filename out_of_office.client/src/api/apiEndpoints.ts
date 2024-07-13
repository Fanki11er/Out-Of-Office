export const BASE_URL = "https://localhost:7007";

export const loginEndpoint = "/authentication/login";

export const registerNewEmployeeApiEndpoint = "/authentication/register";

export const hrManagerEmployeesListEndpoint = "/lists/employeesHR";

export const hrManagerLeaveRequestsListEndpoint = "/lists/leaveRequestsHR";

export const managersApproveRequestsListEndpoint =
  "/lists/approvalRequestsManagers";

export const employeeApproveRequestsListEndpoint =
  "/lists/approvalRequestsEmployee";

export const hrManagerProjectsListEndpoint = "/lists/projectsHR";

export const employeeProjectsListEndpoint = "/lists/projectsEmployee";

export const getOptionsFromApi = (optionType: string) => {
  return `/lists/${optionType}`;
};
