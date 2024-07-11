import { Navigate } from "react-router-dom";
import {
  employeeProjectsListEndpoint,
  hrManagerProjectsListEndpoint,
  loginEndpoint,
} from "../../../api/apiEndpoints";
import {
  READ_ONLY_PROJECTS_LIST_EMPLOYEE,
  READ_ONLY_PROJECTS_LIST_HR,
} from "../../../api/QueryKeys";
import useAuth from "../../../hooks/useAuth";
import { StyledDefaultListWrapper } from "../../atoms/StyledDefaultListWrapper/StyledDefaultListWrapper.styles";
import ReadOnlyProjectsList from "../../molecules/ReadOnlyProjectsList/ReadOnlyProjectsList";

const ProjectsList = () => {
  const { user } = useAuth();

  const renderListsDependOnPosition = () => {
    switch (user?.position) {
      case "HR_Manager": {
        return (
          <ReadOnlyProjectsList
            getDataApiPath={hrManagerProjectsListEndpoint}
            queryKey={READ_ONLY_PROJECTS_LIST_HR}
          />
        );
      }
      case "Employee": {
        return (
          <ReadOnlyProjectsList
            getDataApiPath={employeeProjectsListEndpoint}
            queryKey={READ_ONLY_PROJECTS_LIST_EMPLOYEE}
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
      {renderListsDependOnPosition()}
    </StyledDefaultListWrapper>
  );
};

export default ProjectsList;
