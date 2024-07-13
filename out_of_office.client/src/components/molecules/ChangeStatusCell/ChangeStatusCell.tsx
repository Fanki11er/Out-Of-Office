import { CellContext } from "@tanstack/react-table";
import {
  StyledDetailsButton,
  StyledDetailsCell,
} from "../DetailsCell/DetailsCell.styles";

function ChangeStatusCell<T>({ row, table }: CellContext<T, unknown>) {
  const handleSelectRowForStatusChange =
    table.options.meta?.handleSelectRowForStatusChange;
  return (
    <StyledDetailsCell>
      <StyledDetailsButton
        onClick={() =>
          handleSelectRowForStatusChange &&
          handleSelectRowForStatusChange(row.index)
        }
      >
        Change
      </StyledDetailsButton>
    </StyledDetailsCell>
  );
}

export default ChangeStatusCell;
