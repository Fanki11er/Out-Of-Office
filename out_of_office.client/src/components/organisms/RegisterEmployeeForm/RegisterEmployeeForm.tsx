import { Formik, FormikHelpers } from "formik";
import * as Yup from "yup";
import {
  StyledInputsWrapper,
  StyledRegisterEmployeeForm,
  StyledRegisterEmployeeFormInput,
  StyledSuccessStatus,
} from "./RegisterEmployeeForm.styles";
import { StyledFormLoadingIndicator } from "../../atoms/StyledDefaultLoadingIndicator/StyledFormLoadingIndicator.styles";
import { StyledDefaultButton } from "../../atoms/StyledDefaultButton/StyledDefaultButton.styles";
import { getErrorMessages } from "../../../Utilities/utilities";
import { StyledFormError } from "../../atoms/StyledFormError/StyledFormError.styles";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import useAxiosPrivate from "../../../hooks/useAxiosPrivate";
import FormInputSelect from "../../molecules/FormSelectInput/FormSelectInput";
import { registerNewEmployeeApiEndpoint } from "../../../api/apiEndpoints";
import { EMPLOYEES_HR_KEY } from "../../../api/QueryKeys";
import { FULL_NAME_PATTERN } from "../../Constants/Constants";

const LOGIN_FIELD_NAME = "login";
const PASSWORD_FIELD_NAME = "password";
const CONFIRM_PASSWORD_FIELD_NAME = "confirmPassword";
const FULL_NAME_FIELD_NAME = "fullName";
const POSITION_FIELD_NAME = "position";
const SUBDIVISION_FIELD_NAME = "subdivision";

interface RegisterEmployeeFormValues {
  [LOGIN_FIELD_NAME]: string;
  [PASSWORD_FIELD_NAME]: string;
  [CONFIRM_PASSWORD_FIELD_NAME]: string;
  [FULL_NAME_FIELD_NAME]: string;
  [POSITION_FIELD_NAME]: number;
  [SUBDIVISION_FIELD_NAME]: number;
}

type RegisterEmployeeDTO = {
  Login: string;
  Password: string;
  ConfirmPassword: string;
  FullName: string;
  Position: number;
  Subdivision: number;
};

export const RegisterEmployeeSchema = Yup.object().shape({
  [LOGIN_FIELD_NAME]: Yup.string()
    .min(2, "Minimum login length is 2")
    .max(30, "Maximum login length is 30")
    .required("Field is required"),
  [PASSWORD_FIELD_NAME]: Yup.string()
    .min(8, "Minimum password length is 8")
    .required("Field is required"),
  [CONFIRM_PASSWORD_FIELD_NAME]: Yup.string()
    .oneOf([Yup.ref(PASSWORD_FIELD_NAME)], "Password does not match")
    .required("Field is required"),
  [FULL_NAME_FIELD_NAME]: Yup.string()
    .matches(FULL_NAME_PATTERN, "Format: Name Surname is required")
    .required("Field is required"),
  [POSITION_FIELD_NAME]: Yup.number().min(0, "Field is required"),
  [SUBDIVISION_FIELD_NAME]: Yup.number().min(1, "Field is required"),
});

const RegisterEmployeeForm = () => {
  const axiosPrivate = useAxiosPrivate();
  const queryClient = useQueryClient();

  const initialValues: RegisterEmployeeFormValues = {
    [LOGIN_FIELD_NAME]: "",
    [PASSWORD_FIELD_NAME]: "",
    [CONFIRM_PASSWORD_FIELD_NAME]: "",
    [FULL_NAME_FIELD_NAME]: "",
    [POSITION_FIELD_NAME]: -1,
    [SUBDIVISION_FIELD_NAME]: 0,
  };

  const { mutate, isPending, isError, error, isSuccess } = useMutation({
    mutationFn: (values: RegisterEmployeeDTO) => {
      return axiosPrivate.post(registerNewEmployeeApiEndpoint, values, {
        withCredentials: true,
      });
    },
  });

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={(
        values: RegisterEmployeeFormValues,
        { setSubmitting, resetForm }: FormikHelpers<RegisterEmployeeFormValues>
      ) => {
        const registerEmployeeDTO: RegisterEmployeeDTO = {
          Login: values[LOGIN_FIELD_NAME],
          Password: values[PASSWORD_FIELD_NAME],
          ConfirmPassword: values[CONFIRM_PASSWORD_FIELD_NAME],
          FullName: values[FULL_NAME_FIELD_NAME],
          Position: Number(values[POSITION_FIELD_NAME]),
          Subdivision: Number(values[SUBDIVISION_FIELD_NAME]),
        };

        mutate(registerEmployeeDTO, {
          onSuccess: () => {
            queryClient.invalidateQueries({
              refetchType: "all",
              predicate: (query) => query.queryKey[0] === EMPLOYEES_HR_KEY,
            });
            resetForm();
          },
        });
        setSubmitting(false);
      }}
      validationSchema={RegisterEmployeeSchema}
    >
      <StyledRegisterEmployeeForm>
        {isError && !isPending && (
          <StyledFormError>{getErrorMessages(error)}</StyledFormError>
        )}
        {isSuccess && (
          <StyledSuccessStatus>Employee successfully added</StyledSuccessStatus>
        )}
        <StyledInputsWrapper>
          <StyledRegisterEmployeeFormInput
            name={LOGIN_FIELD_NAME}
            label="Login"
          />
          <StyledRegisterEmployeeFormInput
            name={FULL_NAME_FIELD_NAME}
            label="Full name"
          />
          <StyledRegisterEmployeeFormInput
            name={PASSWORD_FIELD_NAME}
            label="Password"
            type="password"
          />
          <StyledRegisterEmployeeFormInput
            name={CONFIRM_PASSWORD_FIELD_NAME}
            label="Confirm password"
            type="password"
          />
          <FormInputSelect
            optionsType={"subdivisions"}
            name={SUBDIVISION_FIELD_NAME}
            labelText={"Subdivision"}
          />
          <FormInputSelect
            optionsType={"positions"}
            name={POSITION_FIELD_NAME}
            labelText={"Position"}
          />
        </StyledInputsWrapper>
        {isPending && !isError ? (
          <StyledFormLoadingIndicator>Loading...</StyledFormLoadingIndicator>
        ) : (
          <StyledDefaultButton type="submit">
            Register new employee
          </StyledDefaultButton>
        )}
      </StyledRegisterEmployeeForm>
    </Formik>
  );
};

export default RegisterEmployeeForm;
