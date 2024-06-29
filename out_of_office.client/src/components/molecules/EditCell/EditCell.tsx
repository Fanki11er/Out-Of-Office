import { CellContext } from "@tanstack/react-table";
import { EmployeeDTO } from "../../../types/outOffOffice";

const EditCell = ({ row, table }: CellContext<EmployeeDTO, unknown>) => {
  const editedRows = table.options.meta?.editedRows;

  return editedRows && editedRows.has(row.index) ? (
    <>
      <button>✔</button> <button>X</button>
    </>
  ) : null;
};

export default EditCell;
