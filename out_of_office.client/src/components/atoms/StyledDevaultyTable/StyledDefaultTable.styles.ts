import styled from "styled-components";

export const StyledDefaultTable = styled.table`
  padding: 10px;
  width: fit-content;
  margin: 50px auto;
  max-width: 1920px;
  background-color: ${({ theme }) => theme.colors.darkGray};
  border-spacing: 5px;
  border-radius: 10px;
`;
