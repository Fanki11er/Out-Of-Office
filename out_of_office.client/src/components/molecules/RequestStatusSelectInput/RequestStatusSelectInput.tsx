import { PropsWithChildren } from "react";
import { StyledDefaultInputLabel } from "../../atoms/StyledDefaultInputLabel/StyledDefaultInputLabel.styles";
import { StyledDefaultSelect } from "../../atoms/StyledDefaultSelect/StyledDefaultSelect.styles";
import { useField } from "formik";

type Props = {
  label: string;
  name: string;
};
const RequestStatusSelectInput = ({
  children,
  label,
  name,
}: Props & PropsWithChildren) => {
  const [field] = useField(name);
  return (
    <StyledDefaultInputLabel>
      {label}
      <StyledDefaultSelect {...field}>{children}</StyledDefaultSelect>
    </StyledDefaultInputLabel>
  );
};

export default RequestStatusSelectInput;
