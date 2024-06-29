import { ChangeEvent, useEffect, useState } from "react";
import { StyledInput } from "./InputCell.styles";
import { CellContext } from "@tanstack/react-table";
import { EmployeeDTO } from "../../../types/outOffOffice";

const InputCell = ({
  getValue,
  row,
  column,
  table,
}: CellContext<EmployeeDTO, string>) => {
  const initialValue = getValue();
  const [value, setValue] = useState(initialValue);

  useEffect(() => {
    setValue(initialValue);
  }, [initialValue]);

  const handleBlur = () => {
    const meta = table.options.meta;
    if (value !== initialValue) {
      meta &&
        meta.updateDataFromInput &&
        meta.updateDataFromInput(row.index, column.id, value);
    }
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  return (
    <StyledInput
      onChange={(e) => handleChange(e)}
      onBlur={handleBlur}
      value={value}
    />
  );
};

export default InputCell;

/*
revertData: (rowIndex: number, revert: boolean) => {
        if (revert) {
          setData((old) =>
            old.map((row, index) =>
              index === rowIndex ? originalData[rowIndex] : row
            )
          );
        } else {
          setOriginalData((old) =>
            old.map((row, index) => (index === rowIndex ? data[rowIndex] : row))
          );
        }
      },
*/
