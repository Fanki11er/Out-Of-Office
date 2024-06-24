import styled from "styled-components";

export const StyledLoginView = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${({ theme }) => theme.colors.lightGray};
  min-height: 100vh;
`;
