import { Navigate } from "react-router-dom";
import useAuth from "../../../hooks/useAuth";
import { StyledDefaultListWrapper } from "../../atoms/StyledDefaultListWrapper/StyledDefaultListWrapper.styles";
import {
  employeeApproveRequestsListEndpoint,
  hrManagerLeaveRequestsListEndpoint,
  loginEndpoint,
} from "../../../api/apiEndpoints";
import LeaveRequestsList from "../../molecules/LeaveRequestsList/LeaveRequestsList";
import {
  LEAVE_REQUESTS_EMPLOYEE_KEY,
  LEAVE_REQUESTS_HR_KEY,
} from "../../../api/QueryKeys";

const LeaveRequestsLists = () => {
  const { user } = useAuth();

  const renderList = () => {
    switch (user?.position) {
      case "HR_Manager": {
        return (
          <LeaveRequestsList
            queryKey={LEAVE_REQUESTS_HR_KEY}
            getDataApiPath={hrManagerLeaveRequestsListEndpoint}
          />
        );
      }

      case "Employee": {
        return (
          <LeaveRequestsList
            queryKey={LEAVE_REQUESTS_EMPLOYEE_KEY}
            getDataApiPath={employeeApproveRequestsListEndpoint}
          />
        );
      }

      default: {
        <Navigate to={loginEndpoint} />;
      }
    }
  };
  return <StyledDefaultListWrapper>{renderList()}</StyledDefaultListWrapper>;
};

export default LeaveRequestsLists;
