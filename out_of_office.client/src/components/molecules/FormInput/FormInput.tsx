import {
  StyledFormInput,
  StyledFormInputErrorIndicator,
  StyledInputLabel,
} from "./FormInput.styles";

type InputProps = {
  name: string;
  label: string;
  error?: string;
  type?: string;
};

const FormInput = ({ name, label, error, type }: InputProps) => {
  return (
    <StyledInputLabel>
      {label}
      <StyledFormInput name={name} type={type ? type : "text"} />
      {error && (
        <StyledFormInputErrorIndicator>{error}</StyledFormInputErrorIndicator>
      )}
    </StyledInputLabel>
  );
};

export default FormInput;
