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
}: CellContext<EmployeeDTO, CombinedValue>) => {
  const { id, value } = getValue();
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

  const renderOptions = (options: CombinedValue[]) => {
    return options.map((option) => {
      const selected = id === option.id;
      const optionValue = selected ? value : option.value;
      return (
        <StyledOption
          key={option.id}
          hidden={selected}
          defaultChecked={selected}
          value={option.id}
        >
          {optionValue}
        </StyledOption>
      );
    });
  };

  return (
    <StyledSelect
      defaultValue={value}
      onChange={(e) => handleChange(e.target.value)}
    >
      {data ? (
        renderOptions(data)
      ) : (
        <StyledOption hidden defaultChecked value={id}>
          {value}
        </StyledOption>
      )}
    </StyledSelect>
  );
};

export default SelectCell;
