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
import { StyledDefaultListContainer } from "../../atoms/StyledDefaultListContainer/StyledDefaultListContainer.styles";
import { filterCombinedValue } from "../../../Utilities/utilities";
import { employeeLeaveRequestsListEndpoint } from "../../../api/apiEndpoints";
import { LEAVE_REQUESTS_EMPLOYEE_KEY } from "../../../api/QueryKeys";
import LeaveRequestForm from "../../organisms/LeaveRequestForm/LeaveRequestForm";
import { StyledDefaultButton } from "../../atoms/StyledDefaultButton/StyledDefaultButton.styles";
import ChangeStatusCell from "../ChangeStatusCell/ChangeStatusCell";
import { StyledButtonWrapper } from "./EditableLeaveRequestsList.styles";

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
    cell: (info) => info.getValue().value,
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
  columnHelper.display({
    header: "Change Status",
    cell: ChangeStatusCell,
    size: 100,
  }),
];

const EditableLeaveRequestsList = () => {
  const axiosPrivate = useAxiosPrivate();
  const [data, setData] = useState<LeaveRequestDTO[]>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [selectedRowId, setSelectedRowId] = useState(-1);
  const [selectedRowForStatusChange, setSelectedRowIdForStatusChange] =
    useState(-1);
  const [isNewRequestFormOpened, setIsNewRequestFormOpened] = useState(false);

  const handleSelectRow = (rowIndex: number) => {
    setSelectedRowId(rowIndex);
  };

  const handleSelectRowForStatusChange = (rowIndex: number) => {
    setSelectedRowIdForStatusChange(rowIndex);
  };

  const handleDeselectRowForStatusChange = () => {
    setSelectedRowIdForStatusChange(-1);
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

  const toggleIsNewRequestFormOpened = () => {
    setIsNewRequestFormOpened((prev) => !prev);
  };
  //!!
  const editFormModal = createPortal(
    <Modal handleCloseModal={handleDeselectRow}>
      {
        <LeaveRequestForm
          leaveRequest={getSelectedRow(selectedRowId)}
          formType={"Edit"}
        />
      }
    </Modal>,
    document.body
  );

  const newRequestFormModal = createPortal(
    <Modal handleCloseModal={toggleIsNewRequestFormOpened}>
      {
        <LeaveRequestForm
          formType={"New"}
          handleCloseModal={toggleIsNewRequestFormOpened}
        />
      }
    </Modal>,
    document.body
  );

  //!!
  const changeStatusModal = createPortal(
    <Modal handleCloseModal={handleDeselectRowForStatusChange}>
      <div>Change Status</div>
    </Modal>,
    document.body
  );

  const getLeaveRequestsListEmployee = async () => {
    const response = await axiosPrivate.get(employeeLeaveRequestsListEndpoint);
    return response.data;
  };

  const {
    data: queryData,
    isLoading,
    isError,
    error,
  } = useQuery<LeaveRequestDTO[]>({
    queryKey: [LEAVE_REQUESTS_EMPLOYEE_KEY],
    queryFn: getLeaveRequestsListEmployee,
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
      handleSelectRowForStatusChange,
    },
  });

  return (
    <StyledDefaultListContainer>
      <StyledButtonWrapper>
        <StyledDefaultButton onClick={toggleIsNewRequestFormOpened}>
          Create new
        </StyledDefaultButton>
      </StyledButtonWrapper>
      {isLoading && <TableLoader />}
      {isError && <TableError errorMessage={error.message} />}
      {!isLoading && !error && (
        <TableWithFiltersAndSorting table={table} dataLength={data.length} />
      )}
      {selectedRowId >= 0 && editFormModal}
      {isNewRequestFormOpened && newRequestFormModal}
      {selectedRowForStatusChange >= 0 && changeStatusModal}
    </StyledDefaultListContainer>
  );
};

export default EditableLeaveRequestsList;
