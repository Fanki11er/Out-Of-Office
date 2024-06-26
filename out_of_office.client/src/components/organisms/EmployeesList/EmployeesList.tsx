import HRManagerEmployeesList from "../../molecules/HRManagerEmployeesList/HRManagerEmployeesList";
import { StyledEmployeesList } from "./EmployeesList.styles";

const EmployeesList = () => {
  return (
    <StyledEmployeesList>
      <HRManagerEmployeesList />
    </StyledEmployeesList>
  );
};

export default EmployeesList;
