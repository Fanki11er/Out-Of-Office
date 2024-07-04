import { CellContext } from "@tanstack/react-table";
import { StyledDetailsButton, StyledDetailsCell } from "./DetailsCell.styles";

function DetailsCell<T>({ row, table }: CellContext<T, unknown>) {
  const handleSelectRow = table.options.meta?.handleSelectRow;
  return (
    <StyledDetailsCell>
      <StyledDetailsButton
        onClick={() => handleSelectRow && handleSelectRow(row.index)}
      >
        Details
      </StyledDetailsButton>
    </StyledDetailsCell>
  );
}

export default DetailsCell;
