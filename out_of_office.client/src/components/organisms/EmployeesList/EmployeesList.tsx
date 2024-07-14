import { Navigate } from "react-router-dom";
import useAuth from "../../../hooks/useAuth";
import { StyledDefaultListWrapper } from "../../atoms/StyledDefaultListWrapper/StyledDefaultListWrapper.styles";
import HRManagerEmployeesList from "../../molecules/HRManagerEmployeesList/HRManagerEmployeesList";
import { loginEndpoint } from "../../../api/apiEndpoints";
import { HR_MANAGER_ROLE } from "../../../Constants/constants";

const EmployeesList = () => {
  const { user } = useAuth();

  const renderListDependOnUserPosition = () => {
    switch (user?.position) {
      case HR_MANAGER_ROLE: {
        return <HRManagerEmployeesList />;
      }
      default: {
        return <Navigate to={loginEndpoint} />;
      }
    }
  };
  return (
    <StyledDefaultListWrapper>
      {renderListDependOnUserPosition()}
    </StyledDefaultListWrapper>
  );
};

export default EmployeesList;
