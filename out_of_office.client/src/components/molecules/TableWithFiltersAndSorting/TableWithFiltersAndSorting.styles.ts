import styled from "styled-components";
import { StyledDefaultTableRow } from "../../atoms/StyledDefaultTableRow/StyledDefaultTableRow.styles";

export const StyledTableWrapper = styled.div`
  display: flex;
  width: 100%;
  align-items: center;
  justify-items: center;
  max-width: 1920px;
  overflow: auto;
  max-height: 100vh;
`;

export const StyledTableRow = styled(StyledDefaultTableRow)`
  display: grid;
  border-radius: 5px;
  border: 2px solid ${({ theme }) => theme.colors.darkGray};
  grid-auto-flow: column;
`;
