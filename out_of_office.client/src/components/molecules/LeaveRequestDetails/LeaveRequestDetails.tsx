import { LeaveRequestDTO } from "../../../types/outOffOffice";
import {
  StyledRequestDetails,
  StyledRequestDetailsComment,
} from "../../atoms/StyledRequestDetails/StyledRequestDetails.styles";

type Props = {
  leaveRequest: LeaveRequestDTO | null;
};
const LeaveRequestDetails = ({ leaveRequest }: Props) => {
  return leaveRequest ? (
    <StyledRequestDetails>
      <h2>Leave Request</h2>
      <h3>
        {`Id: 
        ${leaveRequest.id}`}
      </h3>
      <span>
        <b>Employee: </b>
        {leaveRequest.employee}
      </span>
      <span>
        <b>Start date: </b>
        {leaveRequest.startDate}
      </span>
      <span>
        <b>End date: </b>
        {leaveRequest.endDate}
      </span>
      <span>
        <b>Status: </b>
        {leaveRequest.status}
      </span>
      {leaveRequest.comment && (
        <StyledRequestDetailsComment>
          {leaveRequest.comment}
        </StyledRequestDetailsComment>
      )}
    </StyledRequestDetails>
  ) : (
    <span>No data</span>
  );
};

export default LeaveRequestDetails;
