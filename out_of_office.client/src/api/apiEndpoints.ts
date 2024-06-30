export const BASE_URL = "https://localhost:7007";

export const loginEndpoint = "/authentication/login";

export const hrManagerEmployeesListEndpoint = "/lists/employeesHR";

export const getOptionsFromApi = (optionType: string) => {
  return `/lists/${optionType}`;
};
