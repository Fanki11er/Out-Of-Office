import styled from "styled-components";

export const StyledNavigationBar = styled.nav`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 70px;
  background-color: ${({ theme }) => theme.colors.white};
  box-shadow: 0px 10px 15px ${({ theme }) => theme.colors.lightShadow};
`;
