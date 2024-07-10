import { Formik, FormikHelpers } from "formik";
import {
  ApprovalRequestDTO,
  ApprovalRequestStatus,
  SelectOption,
} from "../../../types/outOffOffice";
import { StyledDefaultButton } from "../../atoms/StyledDefaultButton/StyledDefaultButton.styles";
import { StyledFormLoadingIndicator } from "../../atoms/StyledDefaultLoadingIndicator/StyledFormLoadingIndicator.styles";
import { StyledFormError } from "../../atoms/StyledFormError/StyledFormError.styles";
import { getErrorMessages } from "../../../Utilities/utilities";
import { StyledSuccessStatus } from "../RegisterEmployeeForm/RegisterEmployeeForm.styles";
import TextareaField from "../../molecules/TextAreaField/TextAreaField";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import useAxiosPrivate from "../../../hooks/useAxiosPrivate";
import { hrManagerApproveRequestsListEndpoint } from "../../../api/apiEndpoints";
import { APPROVAL_REQUESTS_HR_KEY } from "../../../api/QueryKeys";
import { StyledHRManagerApprovalForm } from "../../molecules/HRManagerApprovalRequestsList/HRManagerApprovalRequestsList.styles";
import RequestStatusSelectInput from "../../molecules/RequestStatusSelectInput/RequestStatusSelectInput";

type ChangeApprovalRequestStatusDTO = {
  RequestId: number;
  NewStatus: ApprovalRequestStatus;
  Comment?: string;
};

const options: SelectOption[] = [
  {
    value: "Accepted",
    displayValue: "Accept",
  },
  {
    value: "Rejected",
    displayValue: "Reject",
  },
];

const STATUS_FIELD_NAME = "status";
const COMMENT_FIELD_NAME = "comment";

interface ApprovalRequestFormValues {
  [STATUS_FIELD_NAME]: ApprovalRequestStatus;
  [COMMENT_FIELD_NAME]: string;
}

type Props = {
  approveRequest: ApprovalRequestDTO;
};
const ApproveRequestForm = ({ approveRequest }: Props) => {
  const initialValues: ApprovalRequestFormValues = {
    [STATUS_FIELD_NAME]: "New",
    [COMMENT_FIELD_NAME]: "",
  };

  const axiosPrivate = useAxiosPrivate();
  const queryClient = useQueryClient();

  const { mutate, isPending, isError, error, isSuccess } = useMutation({
    mutationFn: (values: ChangeApprovalRequestStatusDTO) => {
      return axiosPrivate.put(hrManagerApproveRequestsListEndpoint, values, {
        withCredentials: true,
      });
    },
  });

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={(
        values: ApprovalRequestFormValues,
        { setSubmitting, resetForm }: FormikHelpers<ApprovalRequestFormValues>
      ) => {
        const registerEmployeeDTO: ChangeApprovalRequestStatusDTO = {
          RequestId: approveRequest.id,
          NewStatus: values[STATUS_FIELD_NAME],
          Comment: values[COMMENT_FIELD_NAME],
        };

        mutate(registerEmployeeDTO, {
          onSuccess: () => {
            queryClient.invalidateQueries({
              refetchType: "all",
              predicate: (query) =>
                query.queryKey[0] === APPROVAL_REQUESTS_HR_KEY,
            });
            resetForm();
          },
        });
        setSubmitting(false);
      }}
    >
      {({ values }) => (
        <StyledHRManagerApprovalForm>
          {isError && !isPending && (
            <StyledFormError>{getErrorMessages(error)}</StyledFormError>
          )}
          {isSuccess && (
            <StyledSuccessStatus>Status changed</StyledSuccessStatus>
          )}
          <h2>Approve request</h2>
          <h3>{`Id: ${approveRequest.id}`}</h3>
          <span>
            <b>Leave request: </b>
            {approveRequest.leaveRequest}
          </span>
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

          {values[STATUS_FIELD_NAME] === "Rejected" && (
            <TextareaField
              label={"Comment"}
              name={COMMENT_FIELD_NAME}
              placeholder={"Rejection reason..."}
            />
          )}

          {isPending && !isError ? (
            <StyledFormLoadingIndicator>Submitting</StyledFormLoadingIndicator>
          ) : (
            values[STATUS_FIELD_NAME] !== "New" && (
              <StyledDefaultButton type="submit">Submit</StyledDefaultButton>
            )
          )}
        </StyledHRManagerApprovalForm>
      )}
    </Formik>
  );
};

export default ApproveRequestForm;
