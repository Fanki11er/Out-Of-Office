import styled from "styled-components";

export const StyledDetailsCell = styled.div`
  display: flex;
  width: 100%;
  align-items: center;
  justify-content: center;
`;

export const StyledDetailsButton = styled.button`
  width: fit-content;
  border-radius: 5px;
  border: 2px solid transparent;
  padding: 5px 10px;
  outline: none;
  transition: border 0.5s;
  color: ${({ theme }) => theme.colors.black};
  background-color: ${({ theme }) => theme.colors.purple};
  &:hover,
  &:focus {
    border: 2px solid ${({ theme }) => theme.colors.orange};
  }
`;
