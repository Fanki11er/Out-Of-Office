import { Formik } from "formik";
import { StyledDefaultForm } from "../../atoms/StyledDefaultForm/StyledDefaultForm.styles";
import {
  ApproveRequestDTO,
  ApproveRequestStatus,
} from "../../../types/outOffOffice";
import { StyledDefaultSelect } from "../../atoms/StyledDefaultSelect/StyledDefaultSelect.styles";
import { StyledDefaultInputLabel } from "../../atoms/StyledDefaultInputLabel/StyledDefaultInputLabel.styles";
import { StyledDefaultButton } from "../../atoms/StyledDefaultButton/StyledDefaultButton.styles";
import { StyledFormLoadingIndicator } from "../../atoms/StyledDefaultLoadingIndicator/StyledFormLoadingIndicator.styles";
import { StyledFormError } from "../../atoms/StyledFormError/StyledFormError.styles";
import { getErrorMessages } from "../../../Utilities/utilities";
import { StyledSuccessStatus } from "../RegisterEmployeeForm/RegisterEmployeeForm.styles";

type ChangeApproveRequestStatusDTO = {
  requestId: number;
  newStatus: ApproveRequestStatus;
  comment?: string;
};

const STATUS_FIELD_NAME = "status";
const COMMENT_FIELD_NAME = "comment";

interface ApproveRequestFormValues {
  [STATUS_FIELD_NAME]: ApproveRequestStatus;
  [COMMENT_FIELD_NAME]: string;
}

type Props = {
  approveRequest: ApproveRequestDTO;
};
const ApproveRequestForm = ({ approveRequest }: Props) => {
  const initialValues: ApproveRequestFormValues = {
    [STATUS_FIELD_NAME]: "New",
    [COMMENT_FIELD_NAME]: "",
  };

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={() => console.log("Submit")}
    >
      {({ values }) => (
        <StyledDefaultForm>
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
          <StyledDefaultInputLabel>
            Select status
            <StyledDefaultSelect name={STATUS_FIELD_NAME}>
              <option hidden defaultChecked value={"New"}>
                {"New"}
              </option>
              <option value={"Accept"}>Accept</option>
              <option value={"Reject"}>Reject</option>
            </StyledDefaultSelect>
          </StyledDefaultInputLabel>
          {values[STATUS_FIELD_NAME] === "Reject" && <div>Comment Field</div>}

          {isPending && !isError ? (
            <StyledFormLoadingIndicator>Submitting</StyledFormLoadingIndicator>
          ) : (
            values[STATUS_FIELD_NAME] !== "New" && (
              <StyledDefaultButton type="submit">Submit</StyledDefaultButton>
            )
          )}
        </StyledDefaultForm>
      )}
    </Formik>
  );
};

export default ApproveRequestForm;
