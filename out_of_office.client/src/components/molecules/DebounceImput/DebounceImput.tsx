import { useEffect, useState } from "react";
import { StyledDebounceInput } from "./DebounceImput.styles";

type Props = {
  initialValue: string | number;
  placeholder: string;
  onChange: (value: string | number) => void;
  debounce?: number;
  type?: string;
};

const DebouncedInput = ({
  initialValue,
  onChange,
  debounce = 500,
  type,
  placeholder,
}: Props) => {
  const [value, setValue] = useState(initialValue);

  useEffect(() => {
    setValue(initialValue);
  }, [initialValue]);

  useEffect(() => {
    const timeout = setTimeout(() => {
      onChange(value);
    }, debounce);

    return () => clearTimeout(timeout);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value]);

  return (
    <StyledDebounceInput
      placeholder={placeholder}
      type={type ? type : "text"}
      value={value}
      onChange={(e) => setValue(e.target.value)}
    />
  );
};

export default DebouncedInput;
