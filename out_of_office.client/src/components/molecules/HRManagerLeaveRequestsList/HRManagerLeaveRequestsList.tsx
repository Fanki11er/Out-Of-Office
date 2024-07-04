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
import { StyledHRManagerLeaveRequestsListWrapper } from "./HRManagerLeaveRequestsList.styles";
import { LeaveRequestDTO } from "../../../types/outOffOffice";
import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { LEAVE_REQUESTS_HR_KEY } from "../../../api/QueryKeys";
import TableLoader from "../TableLoader/TableLoader";
import TableError from "../TableError/TableError";
import TableWithFiltersAndSorting from "../TableWithFiltersAndSorting/TableWithFiltersAndSorting";
import DetailsCell from "../DetailsCell/DetailsCell";
import useModal from "../../../hooks/useModal";
import { createPortal } from "react-dom";
import Modal from "../Modal/Modal";

const mockedData: LeaveRequestDTO[] = [
  {
    id: 1,
    employee: "Krzysztof Dziedzic",
    absenceReason: "Urlop",
    startDate: "24.10.2024",
    endDate: "30.10.2024",
    status: "New",
    comment: "",
  },
  {
    id: 2,
    employee: "Krzysztof Markowski",
    absenceReason: "Urlop",
    startDate: "24.11.2024",
    endDate: "25.10.2024",
    status: "Submitted",
    comment: "",
  },
];

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
      filterVariant: "standardSelect",
    },
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

const HRManagerLeaveRequestsList = () => {
  const axiosPrivate = useAxiosPrivate();
  const [data, setData] = useState<LeaveRequestDTO[]>(mockedData);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [selectedRow, setSelectedRow] = useState(-1);
  //const { isModalOpen, handleOpenModal, handleCloseModal } = useModal();
  console.log(selectedRow);
  const handleSelectRow = (rowIndex: number) => {
    setSelectedRow(rowIndex);
  };

  const handleDeselectRow = () => {
    setSelectedRow(-1);
  };

  const modal = createPortal(
    <Modal handleCloseModal={handleDeselectRow} />,
    document.body
  );

  const getLeaveRequestsListHR = async () => {
    const response = await axiosPrivate.get("");
    return response.data;
  };

  const {
    data: queryData,
    isLoading,
    isError,
    error,
  } = useQuery<LeaveRequestDTO[]>({
    queryKey: [LEAVE_REQUESTS_HR_KEY],
    queryFn: getLeaveRequestsListHR,
  });

  //   useEffect(() => {
  //     queryData && setData(queryData);
  //   }, [queryData]);

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
    <StyledHRManagerLeaveRequestsListWrapper>
      {/* {isLoading && <TableLoader />}
      {isError && <TableError errorMessage={error.message} />}
      {!isLoading && !error && (
        <TableWithFiltersAndSorting table={table} dataLength={data.length} />
      )} */}
      <TableWithFiltersAndSorting table={table} dataLength={data.length} />
      {selectedRow >= 0 && modal}
    </StyledHRManagerLeaveRequestsListWrapper>
  );
};

export default HRManagerLeaveRequestsList;
