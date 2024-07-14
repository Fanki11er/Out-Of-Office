import styled from "styled-components";

export const StyledRequestDetails = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 10px;
  width: 60%;
  max-width: 500px;
  box-shadow: 0px 8px 15px ${({ theme }) => theme.colors.lightShadow},
    2px 0px 15px ${({ theme }) => theme.colors.lightShadow};
  padding: 3rem;
  border-radius: 10px;
  background-color: ${({ theme }) => theme.colors.white};
`;

export const StyledRequestDetailsComment = styled.p`
  width: 90%;
  max-width: 400px;
`;
