import { StyledNavigationLink } from "../../atoms/StyledNavigationLink/StyledNavigationLink.styles";
import { StyledNavigationBar } from "./NavigationBar.styles";

const NavigationBar = () => {
  return (
    <StyledNavigationBar>
      <StyledNavigationLink to={"/Employees"}>Employees</StyledNavigationLink>
      <StyledNavigationLink to={"/LeaveRequests"}>
        Leave Requests
      </StyledNavigationLink>
      <StyledNavigationLink to={"/ApprovalRequests"}>
        Approval Requests
      </StyledNavigationLink>
      <StyledNavigationLink to={"/Projects"}>Projects</StyledNavigationLink>
    </StyledNavigationBar>
  );
};

export default NavigationBar;
