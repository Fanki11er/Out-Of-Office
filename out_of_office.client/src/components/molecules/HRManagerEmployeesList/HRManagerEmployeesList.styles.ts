import styled from "styled-components";
import { StyledDefaultTableRow } from "../../atoms/StyledDefaultTableRow/StyledDefaultTableRow.styles";

export const StyledHrManagerEmployeeList = styled.div``;

export const StyledHRManagerEmployeesListRow = styled(StyledDefaultTableRow)`
  display: grid;
  border-radius: 5px;
  border: 2px solid ${({ theme }) => theme.colors.darkGray};
  grid-template-columns:
    minmax(120px, 200px) minmax(120px, 150px) minmax(100px, 120px)
    minmax(120px, 100px) minmax(120px, 200px) minmax(150px, 140px) 60px;
`;
