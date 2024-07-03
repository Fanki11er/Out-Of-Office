import styled from "styled-components";

export const StyledTableError = styled.div`
  width: fit-content;
  max-width: 600px;
  display: flex;
  flex-direction: column;
  row-gap: 10px;
  align-items: center;
  margin: auto auto;
`;

export const StyledTableErrorText = styled.span`
  font-size: ${({ theme }) => theme.defaultFontSize};
  background-color: ${({ theme }) => theme.colors.lightRed};
  border-radius: 1rem;
  padding: 2rem;
  width: fit-content;
`;
