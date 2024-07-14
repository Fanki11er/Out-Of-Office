import useAuth from "../../../hooks/useAuth";
import { routerPaths } from "../../../router/routerPaths";
import { StyledNavigationLink } from "../../atoms/StyledNavigationLink/StyledNavigationLink.styles";
import {
  StyledLogoutButton,
  StyledNavigationBar,
} from "./NavigationBar.styles";

const NavigationBar = () => {
  const { user, logout } = useAuth();
  return (
    <StyledNavigationBar>
      {user?.position !== "Employee" && (
        <StyledNavigationLink to={routerPaths.employeeList}>
          Employees
        </StyledNavigationLink>
      )}
      <StyledNavigationLink end to={routerPaths.lists}>
        Leave Requests
      </StyledNavigationLink>
      <StyledNavigationLink to={routerPaths.approvalRequestsList}>
        Approval Requests
      </StyledNavigationLink>
      <StyledNavigationLink to={routerPaths.projectsList}>
        Projects
      </StyledNavigationLink>
      <StyledLogoutButton onClick={logout}>Logout</StyledLogoutButton>
    </StyledNavigationBar>
  );
};

export default NavigationBar;
