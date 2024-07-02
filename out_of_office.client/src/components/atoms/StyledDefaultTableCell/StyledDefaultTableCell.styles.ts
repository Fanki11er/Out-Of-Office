import styled from "styled-components";
type Props = {
  width: number;
};

export const StyledDefaultTableCell = styled.td<Props>`
  display: flex;
  width: ${({ width }) => `${width}px`};
  align-items: center;
  justify-content: flex-start;
  padding: 10px;
`;
