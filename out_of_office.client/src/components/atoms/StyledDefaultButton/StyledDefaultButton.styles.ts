import styled from "styled-components";

export const StyledDefaultButton = styled.button`
  width: fit-content;
  padding: 0.5rem 2rem;
  color: ${({ theme }) => theme.colors.white};
  font-weight: 700;
  background-color: ${({ theme }) => theme.colors.orange};
  transition: background 0.5s;
  border-radius: 8px;
  outline: none;
  border: none;
  &:hover {
    background-color: ${({ theme }) => theme.colors.darkOrange};
  }
`;
