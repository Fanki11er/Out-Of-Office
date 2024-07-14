import styled from "styled-components";

export const StyledTableLoader = styled.div`
  width: fit-content;
  display: flex;
  flex-direction: column;
  row-gap: 10px;
  align-items: center;
  margin: auto auto;
`;

export const StyledTableLoaderText = styled.span`
  font-size: ${({ theme }) => theme.fontSizes.h2};
  background-color: ${({ theme }) => theme.colors.purple};
  border-radius: 1rem;
  padding: 2rem;
  width: fit-content;
`;
