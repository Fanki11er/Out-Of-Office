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
import { ApprovalRequestDTO } from "../../../types/outOffOffice";
import DetailsCell from "../DetailsCell/DetailsCell";
import useAxiosPrivate from "../../../hooks/useAxiosPrivate";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import Modal from "../Modal/Modal";
import { hrManagerApproveRequestsListEndpoint } from "../../../api/apiEndpoints";
import { useQuery } from "@tanstack/react-query";
import { APPROVAL_REQUESTS_HR_KEY } from "../../../api/QueryKeys";
import { StyledDefaultListContainer } from "../../atoms/StyledDefaultListContainer/StyledDefaultListContainer.styles";
import TableLoader from "../TableLoader/TableLoader";
import TableError from "../TableError/TableError";
import TableWithFiltersAndSorting from "../TableWithFiltersAndSorting/TableWithFiltersAndSorting";
import ApproveRequestDetails from "../ApproveRequestDetails/ApproveRequestDetails";
import ApproveRequestForm from "../../organisms/ApproveRequestForm/ApproveRequestForm";

const columnHelper = createColumnHelper<ApprovalRequestDTO>();

const columns = [
  columnHelper.accessor("id", {
    header: "Id",
    cell: (info) => info.getValue(),
    meta: {
      filterVariant: "number",
    },
    size: 100,
  }),
  columnHelper.accessor("approver", {
    header: "Approver",
    cell: (info) => info.getValue(),
    meta: {
      filterVariant: "standardSelect",
    },
    size: 200,
  }),
  columnHelper.accessor("leaveRequest", {
    header: "Leave request",
    size: 180,
    cell: (info) => info.getValue(),
    meta: {
      filterVariant: "number",
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

const HRManagerApprovalRequestsList = () => {
  const axiosPrivate = useAxiosPrivate();
  const [data, setData] = useState<ApprovalRequestDTO[]>([]);
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

  const renderModal = (selectedRowId: number) => {
    const row = getSelectedRow(selectedRowId);
    const modal = createPortal(
      <Modal handleCloseModal={handleDeselectRow}>
        {row?.status === "New" ? (
          <ApproveRequestForm approveRequest={row} />
        ) : (
          <ApproveRequestDetails approveRequest={row} />
        )}
      </Modal>,
      document.body
    );
    return modal;
  };

  const getApprovalRequestsListHR = async () => {
    const response = await axiosPrivate.get(
      hrManagerApproveRequestsListEndpoint
    );
    return response.data;
  };

  const {
    data: queryData,
    isLoading,
    isError,
    error,
  } = useQuery<ApprovalRequestDTO[]>({
    queryKey: [APPROVAL_REQUESTS_HR_KEY],
    queryFn: getApprovalRequestsListHR,
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
      {selectedRowId >= 0 && renderModal(selectedRowId)}
    </StyledDefaultListContainer>
  );
};

export default HRManagerApprovalRequestsList;
