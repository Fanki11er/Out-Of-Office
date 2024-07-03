import styled from "styled-components";
import { StyledDefaultTableRow } from "../../atoms/StyledDefaultTableRow/StyledDefaultTableRow.styles";

export const StyledTableWrapper = styled.div`
  display: flex;
  width: 100%;
  max-width: 1920px;
  overflow: auto;
  //max-height: 60vh;
  //flex: 1;
  //padding: 100px 0;
  //background-color: red;
`;

export const StyledTableRow = styled(StyledDefaultTableRow)`
  display: grid;
  border-radius: 5px;
  border: 2px solid ${({ theme }) => theme.colors.darkGray};
  grid-auto-flow: column;
`;
