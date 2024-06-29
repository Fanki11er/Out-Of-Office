import styled from "styled-components";
import { StyledDefaultTableRow } from "../../atoms/StyledDefaultTableRow/StyledDefaultTableRow.styles";

export const StyledHrManagerEmployeeList = styled.div``;

export const StyledHRManagerEmployeesListRow = styled(StyledDefaultTableRow)`
  display: grid;
  border-radius: 5px;
  border: 2px solid ${({ theme }) => theme.colors.darkGray};
  grid-template-columns:
    minmax(100px, 200px) minmax(100px, 150px) minmax(100px, 120px)
    minmax(80px, 100px) minmax(100px, 200px) minmax(60px, 100px) 40px;
`;
