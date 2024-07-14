import { useField } from "formik";
import {
  StyledTextareaFieldInput,
  StyledTextareaFieldLabel,
} from "./TextAreaField.styles";

interface Props {
  label: string;
  name: string;
  placeholder: string;
}

const TextareaField = ({ label, name, placeholder }: Props) => {
  const [field] = useField(name);

  return (
    <StyledTextareaFieldLabel>
      {label}
      <StyledTextareaFieldInput
        rows={5}
        placeholder={placeholder}
        as={"textarea"}
        {...field}
      />
    </StyledTextareaFieldLabel>
  );
};

export default TextareaField;
