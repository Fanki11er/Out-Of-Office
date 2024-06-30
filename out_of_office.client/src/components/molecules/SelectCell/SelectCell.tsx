import { CellContext } from "@tanstack/react-table";
import { StyledOption, StyledSelect } from "./SelectCell.styles";
import { CombinedValue, EmployeeDTO } from "../../../types/outOffOffice";
import { useQuery } from "@tanstack/react-query";
import { axiosPrivate } from "../../../api/axios";
import { getOptionsFromApi } from "../../../api/apiEndpoints";

const SelectCell = ({
  getValue,
  row,
  column,
  table,
}: CellContext<EmployeeDTO, CombinedValue | undefined>) => {
  const cellValue = getValue();

  const optionsType = column.columnDef.meta?.optionsType || "";

  const getOptions = async () => {
    const response = await axiosPrivate.get(getOptionsFromApi(optionsType));
    return response.data;
  };

  const { data } = useQuery<CombinedValue[]>({
    queryKey: [optionsType],
    queryFn: getOptions,
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
        <StyledOption key={option.id} value={option.id}>
          {option.value}
        </StyledOption>
      );
    });
  };

  return data && data.length > 1 ? (
    <StyledSelect onChange={(e) => handleChange(e.target.value)}>
      {cellValue && (
        <StyledOption hidden defaultChecked value={cellValue.id}>
          {cellValue.value}
        </StyledOption>
      )}
      {renderOptions(data)}
    </StyledSelect>
  ) : (
    <span>{cellValue?.value || ""}</span>
  );
};

export default SelectCell;
