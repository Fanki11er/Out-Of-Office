import { CellContext, Row } from "@tanstack/react-table";
import { EmployeeDTO } from "../../../types/outOffOffice";

const EditCell = ({ row, table }: CellContext<EmployeeDTO, unknown>) => {
  const editedRows = table.options.meta?.editedRows;

  const handleCancelRowChanges = (rowIndex: number) => {
    const cancelRowChanges = table.options.meta?.cancelRowChanges;
    cancelRowChanges && cancelRowChanges(rowIndex);
  };

  const handleUpdateEmployeeOnServer = (row: Row<EmployeeDTO>) => {
    const handleUpdateEmployeeOnServer =
      table.options.meta?.updateEmployeeOnServer;
    handleUpdateEmployeeOnServer && handleUpdateEmployeeOnServer(row);
  };

  return editedRows &&
    editedRows.findIndex((editedRowIndex) => {
      return editedRowIndex === row.index;
    }) >= 0 ? (
    <>
      <button onClick={() => handleUpdateEmployeeOnServer(row)}>✔</button>
      <button onClick={() => handleCancelRowChanges(row.index)}>X</button>
    </>
  ) : null;
};

export default EditCell;
