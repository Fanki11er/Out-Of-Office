export const BASE_URL = "https://localhost:7007";

export const loginEndpoint = "/authentication/login";

export const getOptionsFromApi = (optionType: string) => {
  return `/lists/${optionType}`;
};
