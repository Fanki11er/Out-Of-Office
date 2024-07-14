import styled from "styled-components";

export const StyledDefaultTable = styled.table`
  padding: 10px;
  height: fit-content;
  width: fit-content;
  margin: 0 auto;
  max-width: 1920px;
  background-color: ${({ theme }) => theme.colors.darkGray};
  border-spacing: 5px;
  border-radius: 10px;
`;
