import { NavLink } from "react-router-dom";
import styled from "styled-components";

export const StyledNavigationLink = styled(NavLink)`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 26px 20px;
  transition: all 0.5s;
  position: relative;
  overflow: hidden;

  &:hover,
  .active {
    color: ${({ theme }) => theme.colors.orange};
    &::after {
      transform: translateY(0);
      opacity: 1;
    }
  }

  &::after {
    content: "";
    height: 4px;
    background-color: red;
    width: 75%;
    position: absolute;
    bottom: 0px;
    left: auto;
    right: auto;
    border-radius: 2px;
    opacity: 0;
    transition: all 0.5s;
    transform: translateY(4px);
  }
`;
