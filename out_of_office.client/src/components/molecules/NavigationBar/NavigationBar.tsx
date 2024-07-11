import { routerPaths } from "../../../router/routerPaths";
import { StyledNavigationLink } from "../../atoms/StyledNavigationLink/StyledNavigationLink.styles";
import { StyledNavigationBar } from "./NavigationBar.styles";

const NavigationBar = () => {
  return (
    <StyledNavigationBar>
      <StyledNavigationLink to={routerPaths.employeeList}>
        Employees
      </StyledNavigationLink>
      <StyledNavigationLink to={routerPaths.leaveRequestsList}>
        Leave Requests
      </StyledNavigationLink>
      <StyledNavigationLink to={routerPaths.approvalRequestsList}>
        Approval Requests
      </StyledNavigationLink>
      <StyledNavigationLink to={routerPaths.projectsList}>
        Projects
      </StyledNavigationLink>
    </StyledNavigationBar>
  );
};

export default NavigationBar;
