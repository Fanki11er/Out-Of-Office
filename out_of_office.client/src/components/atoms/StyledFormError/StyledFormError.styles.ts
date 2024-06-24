import styled from "styled-components";

export const StyledFormError = styled.span`
  display: flex;
  min-width: 100%;
  padding: 0.5rem;
  font-size: ${({ theme }) => theme.fontSizes.textSmall};
  justify-content: center;
  color: ${({ theme }) => theme.colors.black};
  background-color: ${({ theme }) => theme.colors.lightRed};
  border-radius: 10px;
  font-weight: 700;
`;
