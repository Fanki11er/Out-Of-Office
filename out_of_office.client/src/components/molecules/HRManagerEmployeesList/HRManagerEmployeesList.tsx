import { useEffect, useState } from "react";
import {
  Row,
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
import { useMutation, useQuery } from "@tanstack/react-query";
import { axiosPrivate } from "../../../api/axios";
import { hrManagerEmployeesListEndpoint } from "../../../api/apiEndpoints";
import { EMPLOYEES_HR_KEY } from "../../../api/QueryKeys";

const getEmployeesHR = async () => {
  const response = await axiosPrivate.get(hrManagerEmployeesListEndpoint);
  return response.data;
};

const columnHelper = createColumnHelper<EmployeeDTO>();

const columns = [
  columnHelper.accessor("id", {}),
  columnHelper.accessor("fullName", {
    header: "Full Name",
    cell: (info) => (
      <InputCell cell={info} pattern={"^[a-zA-z]{2,}[ ][a-zA-z- ]{2,}$"} />
    ),
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
  const [editedRows, setEditedRows] = useState<number[]>([]);

  const { data: queryData } = useQuery<EmployeeDTO[]>({
    queryKey: [EMPLOYEES_HR_KEY],
    queryFn: getEmployeesHR,
  });

  useEffect(() => {
    queryData && setData(queryData);
    queryData && setOriginalData(queryData);
  }, [queryData]);

  const { mutate } = useMutation({
    mutationFn: (row: Row<EmployeeDTO>) => {
      const values = row.original;
      return axiosPrivate.put(hrManagerEmployeesListEndpoint, values);
    },

    onSuccess: (response, row) => {
      setOriginalData((prev) => {
        const newData = [...prev];
        Object.assign([], newData, { [row.index]: response.data });
        return newData;
      });
      removeRowFromEdited(row.index);
    },
  });

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

    addRowToEditedRows(rowIndex);
  }

  const cancelRowChanges = (rowIndex: number) => {
    setData((prev) => {
      return prev.map((row, index) => {
        return index === rowIndex ? originalData[rowIndex] : row;
      });
    });

    removeRowFromEdited(rowIndex);
  };

  const removeRowFromEdited = (rowIndex: number) => {
    setEditedRows((prev) =>
      prev.filter((editedRowIndex) => {
        return editedRowIndex !== rowIndex;
      })
    );
  };

  const addRowToEditedRows = (rowIndex: number) => {
    const editedRowIndex = editedRows.findIndex((editedRowId) => {
      return editedRowId === rowIndex;
    });

    if (editedRowIndex < 0) {
      setEditedRows((prev) => [...prev, rowIndex]);
    }
  };

  const updateEmployeeOnServer = (row: Row<EmployeeDTO>) => {
    mutate(row);
  };

  const table = useReactTable({
    columns: columns,
    data: data,
    getCoreRowModel: getCoreRowModel(),
    state: {
      columnVisibility: {
        id: false,
      },
    },
    meta: {
      updateDataFromInput,
      cancelRowChanges,
      updateEmployeeOnServer,
      addRowToEditedRows,
      editedRows,
    },
  });
  console.log(data);
  console.log(editedRows);
  console.log(originalData);
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
