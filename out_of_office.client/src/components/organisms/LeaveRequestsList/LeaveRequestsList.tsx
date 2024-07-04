import { StyledDefaultListWrapper } from "../../atoms/StyledDefaultListWrapper/StyledDefaultListWrapper.styles";
import HRManagerLeaveRequestsList from "../../molecules/HRManagerLeaveRequestsList/HRManagerLeaveRequestsList";

const LeaveRequestsList = () => {
  return (
    <StyledDefaultListWrapper>
      <HRManagerLeaveRequestsList />
    </StyledDefaultListWrapper>
  );
};

export default LeaveRequestsList;
