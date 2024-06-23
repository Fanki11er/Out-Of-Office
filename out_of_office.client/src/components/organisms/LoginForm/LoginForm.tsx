import { Formik } from "formik";
import { StyledLoginForm } from "./LoginForm.styles";
import FormInput from "../../molecules/FormInput/FormInput";
import { StyledDefaultButton } from "../../atoms/StyledDefaultButton/StyledDefaultButton.styles";
//import { StyledFormError } from "../../atoms/StyledFormError/StyledFormError.styles";
//import { StyledFormLoadingIndicator } from "../../atoms/StyledDefaultLoadingIndicator/StyledFormLoadingIndicator.styles";

interface LoginFormValues {
  login: string;
  password: string;
}

const LOGIN_FIELD_NAME = "login";
const PASSWORD_FIELD_NAME = "password";

const LoginForm = () => {
  const initialValues: LoginFormValues = {
    [LOGIN_FIELD_NAME]: "",
    [PASSWORD_FIELD_NAME]: "",
  };

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={() => {
        console.log("Submit");
      }}
    >
      <StyledLoginForm>
        {/* <StyledFormError>Some Error</StyledFormError> */}
        <FormInput name={LOGIN_FIELD_NAME} label="Login" />
        <FormInput
          name={PASSWORD_FIELD_NAME}
          label="Password"
          type="password"
        />
        <StyledDefaultButton type="submit">Login</StyledDefaultButton>
        {/* <StyledFormLoadingIndicator>Loading...</StyledFormLoadingIndicator> */}
      </StyledLoginForm>
    </Formik>
  );
};

export default LoginForm;
