import { useEffect, useState } from "react";
import {
  ColumnFiltersState,
  Row,
  getCoreRowModel,
  getFacetedRowModel,
  getFacetedUniqueValues,
  getFilteredRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { createColumnHelper } from "@tanstack/react-table";
import { EmployeeDTO } from "../../../types/outOffOffice";
import EditCell from "../EditCell/EditCell";
import InputCell from "../InputCell/InputCell";
import SelectCell from "../SelectCell/SelectCell";
import { useMutation, useQuery } from "@tanstack/react-query";
import { hrManagerEmployeesListEndpoint } from "../../../api/apiEndpoints";
import { EMPLOYEES_HR_KEY } from "../../../api/QueryKeys";

import {
  filterCombinedValue,
  getErrorMessages,
} from "../../../Utilities/utilities";
import TableWithFiltersAndSorting from "../TableWithFiltersAndSorting/TableWithFiltersAndSorting";
import TableLoader from "../TableLoader/TableLoader";
import TableError from "../TableError/TableError";
import {
  StyledHRManagerEmployeesListWrapper,
  StyledTableMutationStatusError,
  StyledTableMutationStatusPending,
  StyledTableMutationStatusSuccess,
} from "./HRManagerEmployeesList.styles";
import RegisterEmployeeForm from "../../organisms/RegisterEmployeeForm/RegisterEmployeeForm";
import { FULL_NAME_PATTERN } from "../../Constants/Constants";
import useAxiosPrivate from "../../../hooks/useAxiosPrivate";

const columnHelper = createColumnHelper<EmployeeDTO>();

const columns = [
  columnHelper.accessor("id", {}),
  columnHelper.accessor("fullName", {
    header: "Full Name",
    cell: (info) => <InputCell cell={info} pattern={FULL_NAME_PATTERN} />,
    meta: {
      filterVariant: "text",
    },
    size: 200,
  }),
  columnHelper.accessor("subdivision", {
    header: "Subdivision",
    size: 180,
    cell: SelectCell,
    meta: {
      optionsType: "subdivisions",
      filterVariant: "combinedSelect",
    },
    filterFn: filterCombinedValue,
  }),
  columnHelper.accessor("position", {
    header: "Position",
    cell: SelectCell,
    size: 170,
    meta: {
      optionsType: "positions",
      filterVariant: "combinedSelect",
    },
    filterFn: filterCombinedValue,
  }),
  columnHelper.accessor("status", {
    header: "Status",
    size: 140,
    cell: SelectCell,
    meta: {
      optionsType: "statuses",
      filterVariant: "combinedSelect",
    },
    filterFn: filterCombinedValue,
  }),
  columnHelper.accessor("peoplePartner", {
    header: "People Partner",
    size: 200,
    cell: SelectCell,
    meta: {
      optionsType: "peoplePartners",
      filterVariant: "combinedSelect",
    },
    filterFn: filterCombinedValue,
  }),
  columnHelper.accessor("outOfOfficeBalance", {
    header: "Out of office balance",
    size: 220,
    cell: (info) => info.getValue(),
    meta: {
      filterVariant: "range",
    },
  }),
  columnHelper.display({
    header: "Edit",
    cell: EditCell,
    size: 100,
  }),
];

const HRManagerEmployeesList = () => {
  const [data, setData] = useState<EmployeeDTO[]>([]);
  const [originalData, setOriginalData] = useState<EmployeeDTO[]>([]);
  const [editedRows, setEditedRows] = useState<number[]>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const axiosPrivate = useAxiosPrivate();

  const getEmployeesHR = async () => {
    const response = await axiosPrivate.get(hrManagerEmployeesListEndpoint);
    return response.data;
  };

  const {
    data: queryData,
    isLoading,
    isError,
    error,
  } = useQuery<EmployeeDTO[]>({
    queryKey: [EMPLOYEES_HR_KEY],
    queryFn: getEmployeesHR,
  });

  useEffect(() => {
    queryData && setData(queryData);
    queryData && setOriginalData(queryData);
  }, [queryData]);

  const {
    mutate,
    isError: isMutationError,
    isSuccess: isMutationSuccess,
    error: mutationError,
    isPending: isMutationPending,
  } = useMutation({
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

  return (
    <StyledHRManagerEmployeesListWrapper>
      <RegisterEmployeeForm />
      {isMutationPending && (
        <StyledTableMutationStatusPending>
          Pending...
        </StyledTableMutationStatusPending>
      )}
      {isMutationError && (
        <StyledTableMutationStatusError>
          {getErrorMessages(mutationError)}
        </StyledTableMutationStatusError>
      )}
      {isMutationSuccess && (
        <StyledTableMutationStatusSuccess>
          Employee data successfully changed
        </StyledTableMutationStatusSuccess>
      )}
      {isLoading && <TableLoader />}
      {isError && <TableError errorMessage={error.message} />}
      {!isLoading && !error && (
        <TableWithFiltersAndSorting table={table} dataLength={data.length} />
      )}
    </StyledHRManagerEmployeesListWrapper>
  );
};

export default HRManagerEmployeesList;

/*

*/
