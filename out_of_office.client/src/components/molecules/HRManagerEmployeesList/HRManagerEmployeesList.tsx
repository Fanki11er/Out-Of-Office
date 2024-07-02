import { useEffect, useState } from "react";
import {
  ColumnFiltersState,
  Header,
  Row,
  flexRender,
  getCoreRowModel,
  getFacetedRowModel,
  getFacetedUniqueValues,
  getFilteredRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { createColumnHelper } from "@tanstack/react-table";
import { EmployeeDTO } from "../../../types/outOffOffice";
import { StyledHRManagerEmployeesListRow } from "./HRManagerEmployeesList.styles";
import {
  StyledDefaultTableHeaderCell,
  StyledFlexWrapper,
} from "../../atoms/StyledDefaultTableHeaderCell/StyledDefaultTableHeaderCell.styled";
import { StyledDefaultTable } from "../../atoms/StyledDevaultyTable/StyledDefaultTable.styles";
import { StyledDefaultTableCell } from "../../atoms/StyledDefaultTableCell/StyledDefaultTableCell.styles";
import EditCell from "../EditCell/EditCell";
import InputCell from "../InputCell/InputCell";
import SelectCell from "../SelectCell/SelectCell";
import { useMutation, useQuery } from "@tanstack/react-query";
import { axiosPrivate } from "../../../api/axios";
import { hrManagerEmployeesListEndpoint } from "../../../api/apiEndpoints";
import { EMPLOYEES_HR_KEY } from "../../../api/QueryKeys";
import { StyledIcon } from "../../atoms/StyledIcon.styles";
import sortIcon from "../../../assets/sortIcon.svg";
import ascSortingDirectionIcon from "../../../assets/ascSortingDirectionIcon.svg";
import descSortingDirectionIcon from "../../../assets/descSortingDirectionIcon.svg";
import Filter from "../Filter/Filter";
import { filterCombinedValue } from "../../../Utilities/utilities";

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
    meta: {
      filterVariant: "text",
    },
  }),
  columnHelper.accessor("subdivision", {
    header: "Subdivision",
    cell: SelectCell,
    meta: {
      optionsType: "subdivisions",
      filterVariant: "select",
    },
    filterFn: filterCombinedValue,
  }),
  columnHelper.accessor("position", {
    header: "Position",
    cell: SelectCell,
    meta: {
      optionsType: "positions",
      filterVariant: "select",
    },
    filterFn: filterCombinedValue,
  }),
  columnHelper.accessor("status", {
    header: "Status",
    cell: SelectCell,
    meta: {
      optionsType: "statuses",
      filterVariant: "select",
    },
    filterFn: filterCombinedValue,
  }),
  columnHelper.accessor("peoplePartner", {
    header: "People Partner",
    cell: SelectCell,
    meta: {
      optionsType: "peoplePartners",
      filterVariant: "select",
    },
    filterFn: filterCombinedValue,
  }),
  columnHelper.accessor("outOfOfficeBalance", {
    header: "Out of office balance",
    cell: (info) => info.getValue(),
    meta: {
      filterVariant: "range",
    },
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
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);

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

  const renderSortingDirection = (header: Header<EmployeeDTO, unknown>) => {
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
  };

  const table = useReactTable({
    columns: columns,
    data: data,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFacetedRowModel: getFacetedRowModel(),
    getFacetedUniqueValues: getFacetedUniqueValues(),
    state: {
      columnVisibility: {
        id: false,
      },
      columnFilters,
    },
    meta: {
      updateDataFromInput,
      cancelRowChanges,
      updateEmployeeOnServer,
      addRowToEditedRows,
      editedRows,
    },
  });

  // console.log(data);
  // console.log(editedRows);
  // console.log(originalData);
  return (
    <StyledDefaultTable>
      <thead>
        {table.getHeaderGroups().map((headerGroup) => (
          <StyledHRManagerEmployeesListRow key={headerGroup.id}>
            {headerGroup.headers.map((header) => (
              <StyledDefaultTableHeaderCell key={header.id}>
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
                {header.column.getCanFilter() && data.length ? (
                  <StyledFlexWrapper>
                    <Filter column={header.column} />
                  </StyledFlexWrapper>
                ) : null}
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
