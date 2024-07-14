import { Navigate } from "react-router-dom";
import useAuth from "../../../hooks/useAuth";
import { StyledDefaultListWrapper } from "../../atoms/StyledDefaultListWrapper/StyledDefaultListWrapper.styles";
import {
  hrManagerLeaveRequestsListEndpoint,
  loginEndpoint,
} from "../../../api/apiEndpoints";
import ReadOnlyLeaveRequestsList from "../../molecules/ReadOnlyLeaveRequestsList/ReadOnlyLeaveRequestsList";
import { LEAVE_REQUESTS_HR_KEY } from "../../../api/QueryKeys";
import EditableLeaveRequestsList from "../../molecules/EditableLeaveRequestsList/EditableLeaveRequestsList";
import { EMPLOYEE_ROLE, HR_MANAGER_ROLE } from "../../../Constants/constants";

const LeaveRequestsLists = () => {
  const { user } = useAuth();

  const renderList = () => {
    switch (user?.position) {
      case HR_MANAGER_ROLE: {
        return (
          <ReadOnlyLeaveRequestsList
            queryKey={LEAVE_REQUESTS_HR_KEY}
            getDataApiPath={hrManagerLeaveRequestsListEndpoint}
          />
        );
      }

      case EMPLOYEE_ROLE: {
        return <EditableLeaveRequestsList />;
      }

      default: {
        <Navigate to={loginEndpoint} />;
      }
    }
  };
  return <StyledDefaultListWrapper>{renderList()}</StyledDefaultListWrapper>;
};

export default LeaveRequestsLists;
