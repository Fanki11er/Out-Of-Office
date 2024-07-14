import styled from "styled-components";

export const StyledDefaultFormInputErrorIndicator = styled.span`
  font-size: ${({ theme }) => theme.fontSizes.textSmall};
  padding: 0.25rem;
  background-color: ${({ theme }) => theme.colors.lightRed};
  color: ${({ theme }) => theme.colors.black};
  border-radius: 5px;
  border: 1px solid ${({ theme }) => theme.colors.red};
`;
