import { CellContext } from "@tanstack/react-table";
import { StyledOption, StyledSelect } from "./SelectCell.styles";
import { CombinedValue, EmployeeDTO } from "../../../types/outOffOffice";

const mockedData: CombinedValue[] = [
  {
    id: 1,
    value: "Option 1",
  },
  {
    id: 2,
    value: "Option 2",
  },
];
const SelectCell = ({
  getValue,
  row,
  column,
  table,
}: CellContext<EmployeeDTO, CombinedValue>) => {
  const { id, value } = getValue();

  const handleChange = (id: string) => {
    const value = mockedData.find((combinedValue) => {
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
      {renderOptions(mockedData)}
    </StyledSelect>
  );
};

export default SelectCell;
