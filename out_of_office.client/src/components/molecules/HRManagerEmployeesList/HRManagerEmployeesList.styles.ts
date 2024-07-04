import styled from "styled-components";

export const StyledHRManagerEmployeesListWrapper = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
  row-gap: 10px;
  padding-top: 100px;
  max-width: 1920px;
  overflow: auto;
  padding-bottom: 150px;
`;

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
