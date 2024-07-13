import { Navigate } from "react-router-dom";
import useAuth from "../../../hooks/useAuth";
import { StyledDefaultListWrapper } from "../../atoms/StyledDefaultListWrapper/StyledDefaultListWrapper.styles";
import ApprovalRequestsList from "../../molecules/ApprovalRequestsList/ApprovalRequestsList";
import {
  employeeApproveRequestsListEndpoint,
  loginEndpoint,
  managersApproveRequestsListEndpoint,
} from "../../../api/apiEndpoints";
import {
  APPROVAL_REQUESTS_EMPLOYEE_KEY,
  APPROVAL_REQUESTS_HR_KEY,
} from "../../../api/QueryKeys";

const ApprovALRequestsList = () => {
  const { user } = useAuth();

  const renderListDependingOnPosition = () => {
    switch (user?.position) {
      case "HR_Manager": {
        return (
          <ApprovalRequestsList
            getDataApiPath={managersApproveRequestsListEndpoint}
            queryKey={APPROVAL_REQUESTS_HR_KEY}
          />
        );
      }
      case "Employee": {
        return (
          <ApprovalRequestsList
            getDataApiPath={employeeApproveRequestsListEndpoint}
            queryKey={APPROVAL_REQUESTS_EMPLOYEE_KEY}
          />
        );
      }
      default: {
        <Navigate to={loginEndpoint} />;
      }
    }
  };

  return (
    <StyledDefaultListWrapper>
      {renderListDependingOnPosition()}
    </StyledDefaultListWrapper>
  );
};

export default ApprovALRequestsList;
