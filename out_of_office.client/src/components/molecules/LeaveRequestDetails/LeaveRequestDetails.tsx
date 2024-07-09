import { LeaveRequestDTO } from "../../../types/outOffOffice";
import {
  StyledLeaveRequestDetails,
  StyledLeaveRequestDetailsComment,
} from "./LeaveRequestDetails.styles";

type Props = {
  leaveRequest: LeaveRequestDTO | null;
};
const LeaveRequestDetails = ({ leaveRequest }: Props) => {
  return leaveRequest ? (
    <StyledLeaveRequestDetails>
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
        <StyledLeaveRequestDetailsComment>
          {leaveRequest.comment}
        </StyledLeaveRequestDetailsComment>
      )}
    </StyledLeaveRequestDetails>
  ) : (
    <span>No data</span>
  );
};

export default LeaveRequestDetails;
