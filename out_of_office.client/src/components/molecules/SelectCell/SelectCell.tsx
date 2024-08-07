import { CellContext } from "@tanstack/react-table";
import { CombinedValue, EmployeeDTO } from "../../../types/outOffOffice";
import { useQuery } from "@tanstack/react-query";
import { getOptionsFromApi } from "../../../api/apiEndpoints";
import { StyledDefaultSelect } from "../../atoms/StyledDefaultSelect/StyledDefaultSelect.styles";
import useAxiosPrivate from "../../../hooks/useAxiosPrivate";

const SelectCell = ({
  getValue,
  row,
  column,
  table,
}: CellContext<EmployeeDTO, CombinedValue | undefined>) => {
  const axiosPrivate = useAxiosPrivate();
  const cellValue = getValue();

  const optionsType = column.columnDef.meta?.optionsType || "";
  //@ts-expect-error Signal is not typed properly
  const getOptions = async ({ signal }) => {
    const response = await axiosPrivate.get(getOptionsFromApi(optionsType), {
      signal,
    });
    return response.data;
  };

  const { data } = useQuery<CombinedValue[]>({
    queryKey: [optionsType],
    queryFn: (props) => getOptions(props),
    staleTime: 60000,
  });

  const handleChange = (id: string) => {
    const combinedValues = data || [];
    const value = combinedValues.find((combinedValue) => {
      return `${combinedValue.id}` === id;
    });

    const meta = table.options.meta;

    meta &&
      value &&
      meta.updateDataFromInput &&
      meta.updateDataFromInput(row.index, column.id, value);
  };

  const filterCurrentCellValue = (
    options: CombinedValue[],
    currentCellValue: CombinedValue | undefined
  ) => {
    if (!currentCellValue) {
      return options;
    }
    return options.filter((option) => {
      return option.id !== currentCellValue.id;
    });
  };

  const renderOptions = (options: CombinedValue[]) => {
    return filterCurrentCellValue(options, cellValue).map((option) => {
      return (
        <option key={option.id} value={option.id}>
          {option.value}
        </option>
      );
    });
  };

  return data && data.length > 1 ? (
    <StyledDefaultSelect onChange={(e) => handleChange(e.target.value)}>
      {cellValue && (
        <option hidden defaultChecked value={cellValue.id}>
          {cellValue.value}
        </option>
      )}
      {renderOptions(data)}
    </StyledDefaultSelect>
  ) : (
    <span>{cellValue?.value || ""}</span>
  );
};

export default SelectCell;
