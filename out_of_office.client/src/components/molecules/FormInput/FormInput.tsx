import { ErrorMessage, useField } from "formik";
import { StyledDefaultFormInputErrorIndicator } from "../../atoms/StyledDefaultFormInputErrorIndicator/StyledDefaultFormInputErrorIndicator.styles";
import { StyledDefaultInputLabel } from "../../atoms/StyledDefaultInputLabel/StyledDefaultInputLabel.styles";
import { StyledFormInput } from "./FormInput.styles";

type InputProps = {
  name: string;
  label: string;
  type?: string;
  className?: string;
};

const FormInput = ({ name, label, type, className }: InputProps) => {
  const [field, meta] = useField(name);
  return (
    <StyledDefaultInputLabel>
      {label}
      <StyledFormInput
        {...field}
        type={type ? type : "text"}
        className={className}
        $isError={meta.error && meta.touched ? true : false}
      />
      <ErrorMessage
        name={name}
        render={(msg) => (
          <StyledDefaultFormInputErrorIndicator>
            {msg}
          </StyledDefaultFormInputErrorIndicator>
        )}
      />
    </StyledDefaultInputLabel>
  );
};

export default FormInput;
