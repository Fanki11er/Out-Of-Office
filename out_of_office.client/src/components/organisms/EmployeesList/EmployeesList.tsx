import { StyledDefaultListWrapper } from "../../atoms/StyledDefaultListWrapper/StyledDefaultListWrapper.styles";
import HRManagerEmployeesList from "../../molecules/HRManagerEmployeesList/HRManagerEmployeesList";

const EmployeesList = () => {
  return (
    <StyledDefaultListWrapper>
      <HRManagerEmployeesList />
    </StyledDefaultListWrapper>
  );
};

export default EmployeesList;
