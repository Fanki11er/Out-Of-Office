import styled from "styled-components";

const DefaultTableMutationStatus = styled.span`
  font-size: ${({ theme }) => theme.defaultFontSize};
  width: fit-content;
  max-width: 50%;
  padding: 0.8rem;
  margin: 0 auto;
  border-radius: 10px;
`;

export const StyledTableMutationStatusSuccess = styled(
  DefaultTableMutationStatus
)`
  color: ${({ theme }) => theme.colors.green};
  background-color: ${({ theme }) => theme.colors.lightGreen};
`;

export const StyledTableMutationStatusError = styled(
  DefaultTableMutationStatus
)`
  color: ${({ theme }) => theme.colors.red};
  background-color: ${({ theme }) => theme.colors.lightRed};
`;

export const StyledTableMutationStatusPending = styled(
  DefaultTableMutationStatus
)`
  color: ${({ theme }) => theme.colors.orange};
  background-color: ${({ theme }) => theme.colors.lightOrange};
`;
