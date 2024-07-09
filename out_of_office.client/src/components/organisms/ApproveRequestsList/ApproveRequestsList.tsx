import { StyledDefaultListWrapper } from "../../atoms/StyledDefaultListWrapper/StyledDefaultListWrapper.styles";
import HRManagerApproveRequestsList from "../../molecules/HRManagerApproveRequestsList/HRManagerApproveRequestsList";

const ApproveRequestsList = () => {
  return (
    <StyledDefaultListWrapper>
      <HRManagerApproveRequestsList />
    </StyledDefaultListWrapper>
  );
};

export default ApproveRequestsList;
