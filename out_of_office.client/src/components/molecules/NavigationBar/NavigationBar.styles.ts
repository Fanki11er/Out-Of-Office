import styled from "styled-components";
import { StyledDefaultButton } from "../../atoms/StyledDefaultButton/StyledDefaultButton.styles";

export const StyledNavigationBar = styled.nav`
  display: flex;
  //width: 100vw;
  align-items: center;
  justify-content: center;
  position: sticky;
  height: 70px;
  padding: 0 3rem;
  background-color: ${({ theme }) => theme.colors.white};
  box-shadow: 0px 10px 15px ${({ theme }) => theme.colors.lightShadow};
`;

export const StyledLogoutButton = styled(StyledDefaultButton)`
  margin: auto 0 auto auto;
`;
