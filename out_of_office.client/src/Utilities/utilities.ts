import { Row } from "@tanstack/react-table";
import { CombinedValue, EmployeeDTO, ErrorData } from "../types/outOffOffice";
import { AxiosError } from "axios";

export const filterCombinedValue = (
  row: Row<EmployeeDTO>,
  columnId: string,
  filterValue: string
) => {
  const cellValue = row.getValue(columnId) as CombinedValue;

  return cellValue.id.toString() === filterValue;
};

export const getErrorMessages = (e: unknown) => {
  const errorMessages: string[] = [];
  const error: AxiosError = e as AxiosError;
  const data = error.response?.data;
  if (!data) {
    errorMessages.push("Something went very wrong");
    return errorMessages;
  }

  if (typeof data === "string") {
    errorMessages.push(data);
    return errorMessages;
  }

  const errorData = data as ErrorData;
  if (errorData.errors) {
    const errorValues = Object.values(errorData.errors).flat();
    errorValues.forEach((value) => {
      errorMessages.push(value);
    });
  } else {
    errorMessages.push(`Error with status: ${errorData.status}`);
  }

  return errorMessages;
};
