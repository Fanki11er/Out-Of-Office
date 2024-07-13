import {
  ColumnFiltersState,
  createColumnHelper,
  getCoreRowModel,
  getFacetedRowModel,
  getFacetedUniqueValues,
  getFilteredRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import useAxiosPrivate from "../../../hooks/useAxiosPrivate";
import { LeaveRequestDTO } from "../../../types/outOffOffice";
import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import TableLoader from "../TableLoader/TableLoader";
import TableError from "../TableError/TableError";
import TableWithFiltersAndSorting from "../TableWithFiltersAndSorting/TableWithFiltersAndSorting";
import DetailsCell from "../DetailsCell/DetailsCell";
import { createPortal } from "react-dom";
import Modal from "../Modal/Modal";
import LeaveRequestDetails from "../LeaveRequestDetails/LeaveRequestDetails";
import { StyledDefaultListContainer } from "../../atoms/StyledDefaultListContainer/StyledDefaultListContainer.styles";
import { filterCombinedValue } from "../../../Utilities/utilities";

const columnHelper = createColumnHelper<LeaveRequestDTO>();

const columns = [
  columnHelper.accessor("id", {
    header: "Id",
    cell: (info) => info.getValue(),
    meta: {
      filterVariant: "number",
    },
    size: 100,
  }),
  columnHelper.accessor("employee", {
    header: "Employee",
    cell: (info) => info.getValue(),
    meta: {
      filterVariant: "standardSelect",
    },
    size: 200,
  }),
  columnHelper.accessor("absenceReason", {
    header: "Absence reason",
    size: 180,
    cell: (info) => info.getValue(),
    meta: {
      filterVariant: "combinedSelect",
    },
    filterFn: filterCombinedValue,
  }),
  columnHelper.accessor("startDate", {
    header: "Start date",
    cell: (info) => info.getValue(),
    size: 170,
    meta: {
      filterVariant: "standardSelect",
    },
  }),
  columnHelper.accessor("endDate", {
    header: "End date",
    size: 140,
    cell: (info) => info.getValue(),
    meta: {
      filterVariant: "standardSelect",
    },
  }),
  columnHelper.accessor("status", {
    header: "Status",
    size: 200,
    cell: (info) => info.getValue(),
    meta: {
      filterVariant: "standardSelect",
    },
  }),
  columnHelper.accessor("comment", {
    header: "Comment",
    size: 220,
    cell: (info) => info.getValue(),
  }),
  columnHelper.display({
    header: "Details",
    cell: DetailsCell,
    size: 100,
  }),
];
type Props = {
  getDataApiPath: string;
  queryKey: string;
};

const LeaveRequestsList = ({ getDataApiPath, queryKey }: Props) => {
  const axiosPrivate = useAxiosPrivate();
  const [data, setData] = useState<LeaveRequestDTO[]>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [selectedRowId, setSelectedRowId] = useState(-1);
  const handleSelectRow = (rowIndex: number) => {
    setSelectedRowId(rowIndex);
  };

  const handleDeselectRow = () => {
    setSelectedRowId(-1);
  };

  const getSelectedRow = (rowId: number) => {
    if (data.length < rowId) {
      return null;
    }

    const selectedRow = data[rowId];

    return selectedRow;
  };

  const modal = createPortal(
    <Modal handleCloseModal={handleDeselectRow}>
      {<LeaveRequestDetails leaveRequest={getSelectedRow(selectedRowId)} />}
    </Modal>,
    document.body
  );

  const getLeaveRequestsListHR = async () => {
    const response = await axiosPrivate.get(getDataApiPath);
    return response.data;
  };

  const {
    data: queryData,
    isLoading,
    isError,
    error,
  } = useQuery<LeaveRequestDTO[]>({
    queryKey: [queryKey],
    queryFn: getLeaveRequestsListHR,
  });

  useEffect(() => {
    queryData && setData(queryData);
  }, [queryData]);

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
        comment: false,
      },
      columnFilters,
    },
    meta: {
      handleSelectRow,
    },
  });

  return (
    <StyledDefaultListContainer>
      {isLoading && <TableLoader />}
      {isError && <TableError errorMessage={error.message} />}
      {!isLoading && !error && (
        <TableWithFiltersAndSorting table={table} dataLength={data.length} />
      )}
      {selectedRowId >= 0 && modal}
    </StyledDefaultListContainer>
  );
};

export default LeaveRequestsList;
