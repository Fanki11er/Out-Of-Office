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
  absenceReason: string;
  startDate: string;
  endDate: string;
  status: string;
  comment: string;
};

export type ErrorData = {
  errors: {
    [key: string]: string[];
  };
  status: number;
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
