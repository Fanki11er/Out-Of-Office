import styled from "styled-components";

export const StyledInput = styled.input`
  display: flex;
  width: 100%;
  padding: 0.5rem;
  border: 1px solid transparent;
  border-radius: 10px;
  outline: none;
  transition: all 0.5s;
  &:hover,
  &:focus {
    border: 1px solid ${({ theme }) => theme.colors.orange};
    background-color: ${({ theme }) => theme.colors.lightOrange};
  }
`;
