import styled from "styled-components";

export const StyledFormLoadingIndicator = styled.span`
  display: flex;
  min-width: 100%;
  padding: 0.5rem;
  font-size: ${({ theme }) => theme.fontSizes.textSmall};
  justify-content: center;
  color: ${({ theme }) => theme.colors.green};
  background-color: ${({ theme }) => theme.colors.lightGreen};
  border-radius: 10px;
  font-weight: 700;
`;
