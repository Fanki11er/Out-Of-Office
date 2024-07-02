import { Row } from "@tanstack/react-table";
import { CombinedValue, EmployeeDTO } from "../types/outOffOffice";

export const filterCombinedValue = (
  row: Row<EmployeeDTO>,
  columnId: string,
  filterValue: string
) => {
  const cellValue = row.getValue(columnId) as CombinedValue;

  return cellValue.id.toString() === filterValue;
};
