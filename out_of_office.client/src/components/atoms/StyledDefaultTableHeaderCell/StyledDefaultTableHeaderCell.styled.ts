import styled from "styled-components";

type Props = {
  width: number;
};

export const StyledDefaultTableHeaderCell = styled.th<Props>`
  display: flex;
  width: ${({ width }) => `${width}px`};
  flex-direction: column;
  padding: 10px;
  row-gap: 8px;
`;

export const StyledFlexWrapper = styled.div`
  display: flex;
  column-gap: 8px;
  justify-content: flex-start;
  align-content: center;
  flex-flow: row wrap;
`;
