import { RowData } from "@tanstack/react-table";

export type CombinedValue = {
  id: number;
  value: string;
};

export type EmployeeDTO = {
  id: number;
  fullName: string;
  subdivision: CombinedValue;
  position: CombinedValue;
  status: CombinedValue;
  outOfOfficeBalance: number;
  peoplePartner?: CombinedValue;
};

export type LeaveRequestDTO = {
  id: number;
  employee: string;
  absenceReason: CombinedValue;
  startDate: string;
  endDate: string;
  status: string;
  comment: string;
};

export type ApprovalRequestDTO = {
  id: number;
  approver?: string;
  leaveRequest: number;
  status: string;
  comment: string;
};

export type ProjectDTO = {
  id: number;
  projectType: string;
  startDate: string;
  endDate: string;
  projectManager: string;
  status: string;
  comment: string;
};

export type ErrorData = {
  errors: {
    [key: string]: string[];
  };
  status: number;
};

export type ApprovalRequestStatus = "New" | "Accepted" | "Rejected";

export type LeaveRequestSubmissionStatus = "New" | "Submitted" | "Cancelled";

type SelectOption<T> = {
  value: T;
  displayValue: string;
};

declare module "@tanstack/react-table" {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  interface TableMeta<TData extends RowData> {
    updateDataFromInput?: <T>(
      rowIndex: number,
      columnId: string,
      value: T
    ) => void;
    addRowToEditedRows?: (rowIndex: number) => void;
    cancelRowChanges?: (rowIndex: number) => void;
    updateEmployeeOnServer?: <T>(row: Row<T>) => void;
    handleSelectRow?: (rowIndex: number) => void;
    handleSelectRowForStatusChange?: (rowIndex: number) => void;
    editedRows?: number[];
  }
}

declare module "@tanstack/react-table" {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  interface ColumnMeta<TData extends RowData, TValue> {
    optionsType?: string;
    filterVariant?:
      | "text"
      | "range"
      | "combinedSelect"
      | "standardSelect"
      | "number";
  }
}
