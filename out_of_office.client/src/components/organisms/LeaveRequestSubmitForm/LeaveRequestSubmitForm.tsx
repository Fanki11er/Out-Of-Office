import { Formik, FormikHelpers } from "formik";
import {
  LeaveRequestDTO,
  LeaveRequestSubmissionStatus,
  SelectOption,
} from "../../../types/outOffOffice";
import useAxiosPrivate from "../../../hooks/useAxiosPrivate";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { StyledFormError } from "../../atoms/StyledFormError/StyledFormError.styles";
import { StyledSuccessStatus } from "../RegisterEmployeeForm/RegisterEmployeeForm.styles";
import RequestStatusSelectInput from "../../molecules/RequestStatusSelectInput/RequestStatusSelectInput";
import { StyledFormLoadingIndicator } from "../../atoms/StyledDefaultLoadingIndicator/StyledFormLoadingIndicator.styles";
import { StyledDefaultButton } from "../../atoms/StyledDefaultButton/StyledDefaultButton.styles";
import { getErrorMessages } from "../../../Utilities/utilities";
import { StyledLeaveRequestSubmitForm } from "./LeaveRequestSubmitForm.styles";
import { LEAVE_REQUESTS_EMPLOYEE_KEY } from "../../../api/QueryKeys";
import { employeeChangeLeaveRequestStatusEndpoint } from "../../../api/apiEndpoints";

type ChangeLeaveRequestStatusDTO = {
  RequestId: number;
  NewStatus: LeaveRequestSubmissionStatus;
};

const options: SelectOption<LeaveRequestSubmissionStatus>[] = [
  {
    value: "Submitted",
    displayValue: "Submit",
  },
  {
    value: "Cancelled",
    displayValue: "Cancel",
  },
];

const STATUS_FIELD_NAME = "status";

interface LeaveRequestSubmitFormValues {
  [STATUS_FIELD_NAME]: LeaveRequestSubmissionStatus;
}

type Props = {
  leaveRequest: LeaveRequestDTO;
};

const LeaveRequestSubmitForm = ({ leaveRequest }: Props) => {
  const initialValues: LeaveRequestSubmitFormValues = {
    [STATUS_FIELD_NAME]: leaveRequest.status as LeaveRequestSubmissionStatus,
  };

  const axiosPrivate = useAxiosPrivate();
  const queryClient = useQueryClient();

  const { mutate, isPending, isError, error, isSuccess } = useMutation({
    mutationFn: (values: ChangeLeaveRequestStatusDTO) => {
      return axiosPrivate.put(
        employeeChangeLeaveRequestStatusEndpoint,
        values,
        {
          withCredentials: true,
        }
      );
    },
  });

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={(
        values: LeaveRequestSubmitFormValues,
        {
          setSubmitting,
          resetForm,
        }: FormikHelpers<LeaveRequestSubmitFormValues>
      ) => {
        const changeLeaveRequestStatusDTO: ChangeLeaveRequestStatusDTO = {
          RequestId: leaveRequest.id,
          NewStatus: values[STATUS_FIELD_NAME],
        };

        mutate(changeLeaveRequestStatusDTO, {
          onSuccess: () => {
            queryClient.invalidateQueries({
              refetchType: "all",
              predicate: (query) =>
                query.queryKey[0] === LEAVE_REQUESTS_EMPLOYEE_KEY,
            });
            resetForm();
          },
        });
        setSubmitting(false);
      }}
    >
      {({ values }) => (
        <StyledLeaveRequestSubmitForm>
          {isError && !isPending && (
            <StyledFormError>{getErrorMessages(error)}</StyledFormError>
          )}
          {isSuccess && (
            <StyledSuccessStatus>Status changed</StyledSuccessStatus>
          )}
          <h2>Leave request submission</h2>
          <h3>{`Id: ${leaveRequest.id}`}</h3>

          <RequestStatusSelectInput
            name={STATUS_FIELD_NAME}
            label={"Select new status"}
          >
            <option hidden defaultChecked value={"New"}>
              {"New"}
            </option>
            {options.map((option) => {
              return (
                <option key={option.value} value={option.value}>
                  {option.displayValue}
                </option>
              );
            })}
          </RequestStatusSelectInput>

          {isPending && !isError ? (
            <StyledFormLoadingIndicator>Submitting</StyledFormLoadingIndicator>
          ) : (
            values[STATUS_FIELD_NAME] !== "New" && (
              <StyledDefaultButton type="submit">Submit</StyledDefaultButton>
            )
          )}
        </StyledLeaveRequestSubmitForm>
      )}
    </Formik>
  );
};

export default LeaveRequestSubmitForm;
