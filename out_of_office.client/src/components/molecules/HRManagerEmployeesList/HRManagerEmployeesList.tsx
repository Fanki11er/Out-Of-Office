import { useState } from "react";
import {
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { createColumnHelper } from "@tanstack/react-table";
import { EmployeeDTO } from "../../../types/outOffOffice";
import { StyledHRManagerEmployeesListRow } from "./HRManagerEmployeesList.styles";
import { StyledDefaultTableHeaderCell } from "../../atoms/StyledDefaultTableHeaderCell/StyledDefaultTableHeaderCell.styled";
import { StyledDefaultTable } from "../../atoms/StyledDevaultyTable/StyledDefaultTable.styles";
import { StyledDefaultTableCell } from "../../atoms/StyledDefaultTableCell/StyledDefaultTableCell.styles";

const mockData: EmployeeDTO[] = [
  {
    fullName: "Marta Grabowska",
    subdivision: {
      id: 1,
      value: "Back-end",
    },
    position: {
      id: 2,
      value: "Hr Manager",
    },
    status: {
      id: 1,
      value: "Active",
    },
    outOfOfficeBalance: 26,
    peoplePartner: {
      id: 1,
      value: "Krzysztof Dziedzic",
    },
  },
  {
    fullName: "Patryk Gruszka",
    subdivision: {
      id: 2,
      value: "Frontend-end",
    },
    position: {
      id: 2,
      value: "Employee",
    },
    status: {
      id: 1,
      value: "Active",
    },
    outOfOfficeBalance: 26,
    peoplePartner: {
      id: 2,
      value: "Marta Grabowska",
    },
  },
];
const columnHelper = createColumnHelper<EmployeeDTO>();

const columns = [
  columnHelper.accessor("fullName", {
    header: "Full Name",
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor("subdivision.value", {
    header: "Subdivision",
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor("position.value", {
    header: "Position",
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor("status.value", {
    header: "Status",
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor("peoplePartner.value", {
    header: "People Partner",
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor("outOfOfficeBalance", {
    header: "Out of office balance",
    cell: (info) => info.getValue(),
  }),
];

const HRManagerEmployeesList = () => {
  const [data, setData] = useState<EmployeeDTO[]>(mockData);
  const table = useReactTable({
    columns: columns,
    data: data,
    getCoreRowModel: getCoreRowModel(),
  });
  return (
    <StyledDefaultTable>
      <thead>
        {table.getHeaderGroups().map((headerGroup) => (
          <StyledHRManagerEmployeesListRow key={headerGroup.id}>
            {headerGroup.headers.map((header) => (
              <StyledDefaultTableHeaderCell key={header.id}>
                {header.isPlaceholder
                  ? null
                  : flexRender(
                      header.column.columnDef.header,
                      header.getContext()
                    )}
              </StyledDefaultTableHeaderCell>
            ))}
          </StyledHRManagerEmployeesListRow>
        ))}
      </thead>
      <tbody>
        {table.getRowModel().rows.map((row) => (
          <StyledHRManagerEmployeesListRow key={row.id}>
            {row.getVisibleCells().map((cell) => (
              <StyledDefaultTableCell key={cell.id}>
                {flexRender(cell.column.columnDef.cell, cell.getContext())}
              </StyledDefaultTableCell>
            ))}
          </StyledHRManagerEmployeesListRow>
        ))}
      </tbody>
    </StyledDefaultTable>
  );
};

export default HRManagerEmployeesList;
