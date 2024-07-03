import styled from "styled-components";

export const StyledEditCell = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-around;
  align-items: center;
`;

const DefaultEditButton = styled.button`
  width: 30px;
  height: 30px;
  border-radius: 5px;
  border: 2px solid transparent;
  outline: none;
  transition: border 0.5s;
`;

export const StyledCellEditButton = styled(DefaultEditButton)`
  color: ${({ theme }) => theme.colors.green};
  background-color: ${({ theme }) => theme.colors.lightGreen};
  &:hover,
  &:focus {
    border: 2px solid ${({ theme }) => theme.colors.green};
  }
`;

export const StyledCellCancelButton = styled(DefaultEditButton)`
  color: ${({ theme }) => theme.colors.red};
  background-color: ${({ theme }) => theme.colors.lightRed};
  &:hover,
  &:focus {
    border: 2px solid ${({ theme }) => theme.colors.red};
  }
`;
