import { ErrorMessage } from "formik";
import {
  StyledDateField,
  StyledDateFormFieldWrapper,
  StyledIndicatorImage,
} from "./DateFormField.styles";
import { StyledDefaultFormInputErrorIndicator } from "../../atoms/StyledDefaultFormInputErrorIndicator/StyledDefaultFormInputErrorIndicator.styles";
import calendarImage from "../../../assets/calendar.svg";

type Props = {
  label: string;
  name: string;
  isError: string | undefined | boolean;
};
const DateFormField = (props: Props) => {
  const { label, name, isError } = props;
  return (
    <StyledDateFormFieldWrapper>
      <label>{label}</label>
      <StyledDateField type={"date"} name={name} $iserror={!!isError} />
      <ErrorMessage
        name={name}
        render={(msg) => (
          <StyledDefaultFormInputErrorIndicator>
            {msg}
          </StyledDefaultFormInputErrorIndicator>
        )}
      />
      <StyledIndicatorImage src={calendarImage} alt={"Calendar Icon"} />
    </StyledDateFormFieldWrapper>
  );
};

export default DateFormField;
