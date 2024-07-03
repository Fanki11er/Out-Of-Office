import styled from "styled-components";

export const StyledIcon = styled.img`
  width: 25px;
  height: 25px;
  padding: 2px;
  border-radius: 4px;
  transition: background 0.5s;
  &:hover {
    cursor: pointer;
    background-color: ${({ theme }) => theme.colors.lightOrange};
  }
`;
