import styled from "styled-components";

export const StyledDefaultSelect = styled.select`
  width: 100%;
  border-radius: 10px;
  padding: 0.5rem;
  border: 1px solid ${({ theme }) => theme.colors.darkGray};
  outline: none;

  &:hover,
  &:focus {
    border: 1px solid ${(props) => props.theme.colors.orange};
    background-color: ${(props) => props.theme.colors.lightOrange};
    cursor: pointer;
  }
`;
