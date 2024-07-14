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
import { ProjectDTO } from "../../../types/outOffOffice";
import DetailsCell from "../DetailsCell/DetailsCell";
import useAxiosPrivate from "../../../hooks/useAxiosPrivate";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import Modal from "../Modal/Modal";
import { useQuery } from "@tanstack/react-query";
import { StyledDefaultListContainer } from "../../atoms/StyledDefaultListContainer/StyledDefaultListContainer.styles";
import TableLoader from "../TableLoader/TableLoader";
import TableError from "../TableError/TableError";
import TableWithFiltersAndSorting from "../TableWithFiltersAndSorting/TableWithFiltersAndSorting";
import ProjectReadOnlyDetails from "../ProjectReadOnlyDetails/ProjectReadOnlyDetails";

type Props = {
  getDataApiPath: string;
  queryKey: string;
};

const columnHelper = createColumnHelper<ProjectDTO>();

const columns = [
  columnHelper.accessor("id", {
    header: "Id",
    cell: (info) => info.getValue(),
    meta: {
      filterVariant: "number",
    },
    size: 100,
  }),
  columnHelper.accessor("projectType", {
    header: "Project type",
    cell: (info) => info.getValue(),
    meta: {
      filterVariant: "standardSelect",
    },
    size: 200,
  }),
  columnHelper.accessor("startDate", {
    header: "Start date",
    size: 180,
    cell: (info) => info.getValue(),
    meta: {
      filterVariant: "standardSelect",
    },
  }),
  columnHelper.accessor("endDate", {
    header: "End date",
    size: 200,
    cell: (info) => info.getValue(),
    meta: {
      filterVariant: "standardSelect",
    },
  }),
  columnHelper.accessor("projectManager", {
    header: "Project manager",
    size: 200,
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

const ReadOnlyProjectsList = ({ getDataApiPath, queryKey }: Props) => {
  const axiosPrivate = useAxiosPrivate();
  const [data, setData] = useState<ProjectDTO[]>([]);
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
      {<ProjectReadOnlyDetails project={getSelectedRow(selectedRowId)} />}
    </Modal>,
    document.body
  );

  //@ts-expect-error Signal is not typed properly
  const getProjectsList = async ({ signal }) => {
    const response = await axiosPrivate.get(getDataApiPath, { signal });
    return response.data;
  };

  const {
    data: queryData,
    isLoading,
    isError,
    error,
  } = useQuery<ProjectDTO[]>({
    queryKey: [queryKey],
    queryFn: (props) => getProjectsList(props),
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

export default ReadOnlyProjectsList;
