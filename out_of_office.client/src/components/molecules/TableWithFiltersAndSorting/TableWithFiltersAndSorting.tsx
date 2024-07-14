import sortIcon from "../../../assets/sortIcon.svg";
import ascSortingDirectionIcon from "../../../assets/ascSortingDirectionIcon.svg";
import descSortingDirectionIcon from "../../../assets/descSortingDirectionIcon.svg";
import {
  StyledDefaultTableHeaderCell,
  StyledFlexWrapper,
} from "../../atoms/StyledDefaultTableHeaderCell/StyledDefaultTableHeaderCell.styled";
import { StyledDefaultTable } from "../../atoms/StyledDefaultTable/StyledDefaultTable.styles";
import { StyledDefaultTableCell } from "../../atoms/StyledDefaultTableCell/StyledDefaultTableCell.styles";
import { StyledIcon } from "../../atoms/StyledIcon/StyledIcon.styles";
import Filter from "../Filter/Filter";
import { Header, Table, flexRender } from "@tanstack/react-table";
import {
  StyledTableRow,
  StyledTableWrapper,
} from "./TableWithFiltersAndSorting.styles";

function renderSortingDirection<T>(header: Header<T, unknown>) {
  switch (header.column.getIsSorted()) {
    case "asc": {
      return <StyledIcon src={ascSortingDirectionIcon} />;
    }
    case "desc": {
      return <StyledIcon src={descSortingDirectionIcon} />;
    }
    default: {
      return null;
    }
  }
}

type Props<T> = {
  table: Table<T>;
  dataLength: number;
};

function TableWithFiltersAndSorting<T>({ table, dataLength }: Props<T>) {
  return (
    <StyledTableWrapper>
      <StyledDefaultTable>
        <thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <StyledTableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <StyledDefaultTableHeaderCell
                  width={header.getSize()}
                  key={header.id}
                >
                  <StyledFlexWrapper>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                    {header.column.getCanSort() && (
                      <StyledIcon
                        src={sortIcon}
                        onClick={header.column.getToggleSortingHandler()}
                      />
                    )}
                    {renderSortingDirection(header)}
                  </StyledFlexWrapper>
                  {header.column.getCanFilter() && dataLength ? (
                    <StyledFlexWrapper>
                      <Filter column={header.column} />
                    </StyledFlexWrapper>
                  ) : null}
                </StyledDefaultTableHeaderCell>
              ))}
            </StyledTableRow>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map((row) => (
            <StyledTableRow key={row.id}>
              {row.getVisibleCells().map((cell) => (
                <StyledDefaultTableCell
                  width={cell.column.getSize()}
                  key={cell.id}
                >
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </StyledDefaultTableCell>
              ))}
            </StyledTableRow>
          ))}
        </tbody>
      </StyledDefaultTable>
    </StyledTableWrapper>
  );
}

export default TableWithFiltersAndSorting;
