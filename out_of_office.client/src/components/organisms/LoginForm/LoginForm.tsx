import { Formik, FormikHelpers } from "formik";
import { StyledLoginForm } from "./LoginForm.styles";
import FormInput from "../../molecules/FormInput/FormInput";
import { StyledDefaultButton } from "../../atoms/StyledDefaultButton/StyledDefaultButton.styles";
import { useMutation } from "@tanstack/react-query";
import { useEffect } from "react";
import axios from "../../../api/axios";
import useAuth from "../../../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import { StyledFormError } from "../../atoms/StyledFormError/StyledFormError.styles";
import { StyledFormLoadingIndicator } from "../../atoms/StyledDefaultLoadingIndicator/StyledFormLoadingIndicator.styles";
import { loginEndpoint } from "../../../api/apiEndpoints";
import { AuthenticatedUser } from "../../../providers/AuthProvider";
import { routerPaths } from "../../../router/routerPaths";

interface LoginFormValues {
  login: string;
  password: string;
}

type LoginUserDTO = {
  Login: string;
  Password: string;
};

const LOGIN_FIELD_NAME = "login";
const PASSWORD_FIELD_NAME = "password";

const { lists } = routerPaths;

const controller = new AbortController();

const LoginForm = () => {
  const initialValues: LoginFormValues = {
    [LOGIN_FIELD_NAME]: "",
    [PASSWORD_FIELD_NAME]: "",
  };

  const navigate = useNavigate();

  const { login } = useAuth();

  const { mutate, isPending, isError, error } = useMutation({
    mutationFn: (values: LoginUserDTO) => {
      return axios.post(loginEndpoint, values, {
        withCredentials: true,
      });
    },
  });

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={(
        values: LoginFormValues,
        { setSubmitting, resetForm }: FormikHelpers<LoginFormValues>
      ) => {
        const loginDto: LoginUserDTO = {
          Login: values.login,
          Password: values.password,
        };

        mutate(loginDto, {
          onSuccess: (response) => {
            const token: AuthenticatedUser = response.data;
            login(token);
            resetForm();
            navigate(lists);
          },
        });
        setSubmitting(false);
      }}
    >
      <StyledLoginForm>
        {isError && !isPending && (
          <StyledFormError>{error.message}</StyledFormError>
        )}
        <FormInput name={LOGIN_FIELD_NAME} label="Login" />
        <FormInput
          name={PASSWORD_FIELD_NAME}
          label="Password"
          type="password"
        />
        {isPending && !isError ? (
          <StyledFormLoadingIndicator>Loading...</StyledFormLoadingIndicator>
        ) : (
          <StyledDefaultButton type="submit">Login</StyledDefaultButton>
        )}
      </StyledLoginForm>
    </Formik>
  );
};

export default LoginForm;
