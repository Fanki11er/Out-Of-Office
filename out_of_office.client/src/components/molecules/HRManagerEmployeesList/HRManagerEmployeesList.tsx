import { useEffect, useState } from "react";
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
import EditCell from "../EditCell/EditCell";
import InputCell from "../InputCell/InputCell";
import SelectCell from "../SelectCell/SelectCell";
import { useQuery } from "@tanstack/react-query";
import { axiosPrivate } from "../../../api/axios";
import { hrManagerEmployeesListEndpoint } from "../../../api/apiEndpoints";
import { EMPLOYEES_HR_KEY } from "../../../api/QueryKeys";

const getEmployeesHR = async () => {
  const response = await axiosPrivate.get(hrManagerEmployeesListEndpoint);
  return response.data;
};

const columnHelper = createColumnHelper<EmployeeDTO>();

const columns = [
  columnHelper.accessor("fullName", {
    header: "Full Name",
    cell: InputCell,
  }),
  columnHelper.accessor("subdivision", {
    header: "Subdivision",
    cell: SelectCell,
    meta: {
      optionsType: "subdivisions",
    },
  }),
  columnHelper.accessor("position", {
    header: "Position",
    cell: SelectCell,
    meta: {
      optionsType: "positions",
    },
  }),
  columnHelper.accessor("status", {
    header: "Status",
    cell: SelectCell,
    meta: {
      optionsType: "statuses",
    },
  }),
  columnHelper.accessor("peoplePartner", {
    header: "People Partner",
    cell: SelectCell,
    meta: {
      optionsType: "peoplePartners",
    },
  }),
  columnHelper.accessor("outOfOfficeBalance", {
    header: "Out of office balance",
    cell: (info) => info.getValue(),
  }),
  columnHelper.display({
    header: "Edit",
    cell: EditCell,
  }),
];

const HRManagerEmployeesList = () => {
  const [data, setData] = useState<EmployeeDTO[]>([]);
  const [originalData, setOriginalData] = useState<EmployeeDTO[]>([]);
  const [editedRows, setEditedRows] = useState<Set<number>>(() => new Set());

  const { data: queryData } = useQuery<EmployeeDTO[]>({
    queryKey: [EMPLOYEES_HR_KEY],
    queryFn: getEmployeesHR,
  });

  useEffect(() => {
    queryData && setData(queryData);
    queryData && setOriginalData(queryData);
  }, [queryData]);

  function updateDataFromInput<T>(
    rowIndex: number,
    columnId: string,
    value: T
  ) {
    setData((prev) => {
      return prev.map((row, index) => {
        return index === rowIndex
          ? { ...prev[rowIndex], [columnId]: value }
          : row;
      });
    });
    setEditedRows((prev) => prev.add(rowIndex));
  }

  const table = useReactTable({
    columns: columns,
    data: data,
    getCoreRowModel: getCoreRowModel(),
    meta: {
      updateDataFromInput,
      editedRows,
    },
  });
  console.log(data);
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
