import { ChangeEvent, useEffect, useState } from "react";
import { StyledInput } from "./InputCell.styles";
import { CellContext } from "@tanstack/react-table";
import { EmployeeDTO } from "../../../types/outOffOffice";

type Props = {
  cell: CellContext<EmployeeDTO, string>;
  pattern?: string;
};
const InputCell = (props: Props) => {
  const {
    cell: { table, row, column, getValue },
    pattern,
  } = props;

  const initialValue = getValue();
  const meta = table.options.meta;

  const [value, setValue] = useState(initialValue);
  const [error, setError] = useState("");

  const validate = (value: string, pattern?: string) => {
    if (pattern) {
      const expression = new RegExp(pattern);
      const result = expression.test(value);
      if (!result) {
        !error &&
          setError(
            "Full name must have first name and surname divided by space. Min length of names is 2 characters"
          );
      } else {
        error && setError("");
      }
    }
  };

  useEffect(() => {
    setValue(initialValue);
    validate(initialValue, pattern);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [initialValue]);

  const handleBlur = () => {
    if (value !== initialValue) {
      meta &&
        meta.updateDataFromInput &&
        meta.updateDataFromInput(row.index, column.id, value);
    }
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
    validate(e.target.value, pattern);
    meta?.addRowToEditedRows && meta.addRowToEditedRows(row.index);
  };

  return (
    <StyledInput
      onChange={(e) => handleChange(e)}
      onBlur={handleBlur}
      onFocus={(e) => validate(e.target.value, pattern)}
      value={value}
      title={error ? error : ""}
      $error={!!error}
    />
  );
};

export default InputCell;
