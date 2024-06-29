import { RowData } from "@tanstack/react-table";

export type CombinedValue = {
  id: number;
  value: string;
};

export type EmployeeDTO = {
  fullName: string;
  subdivision: CombinedValue;
  position: CombinedValue;
  status: CombinedValue;
  outOfOfficeBalance: number;
  peoplePartner: CombinedValue;
};

// export type EditedRows = {
//   [key: string]: boolean;
// };

declare module "@tanstack/react-table" {
  interface TableMeta<TData extends RowData> {
    updateDataFromInput?: <T>(
      rowIndex: number,
      columnId: string,
      value: T
    ) => void;
    editedRows?: Set<number>;
    // setEditedRows?: React.Dispatch<React.SetStateAction<EditedRows>>;
    // editedRows?: EditedRows;
    // revertData?: unknown;
  }
}
