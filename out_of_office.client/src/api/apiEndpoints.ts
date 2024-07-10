export const BASE_URL = "https://localhost:7007";

export const loginEndpoint = "/authentication/login";

export const registerNewEmployeeApiEndpoint = "/authentication/register";

export const hrManagerEmployeesListEndpoint = "/lists/employeesHR";

export const hrManagerLeaveRequestsListEndpoint = "/lists/leaveRequestsHR";

export const hrManagerApproveRequestsListEndpoint = "/lists/approvalRequestsHR";

export const getOptionsFromApi = (optionType: string) => {
  return `/lists/${optionType}`;
};
