import { ApproveRequestDTO } from "../../../types/outOffOffice";
import {
  StyledRequestDetails,
  StyledRequestDetailsComment,
} from "../../atoms/StyledRequestDetails/StyledRequestDetails.styles";

type Props = {
  approveRequest: ApproveRequestDTO | null;
};
const ApproveRequestDetails = ({ approveRequest }: Props) => {
  return approveRequest ? (
    <StyledRequestDetails>
      <h2>Approve Request</h2>
      <h3>
        {`Id: 
        ${approveRequest.id}`}
      </h3>
      <span>
        <b>Approver: </b>
        {approveRequest.approver}
      </span>
      <span>
        <b>Leave request: </b>
        {approveRequest.leaveRequest}
      </span>
      <span>
        <b>Status: </b>
        {approveRequest.status}
      </span>
      {approveRequest.comment && (
        <StyledRequestDetailsComment>
          {approveRequest.comment}
        </StyledRequestDetailsComment>
      )}
    </StyledRequestDetails>
  ) : (
    <span>No data</span>
  );
};

export default ApproveRequestDetails;
