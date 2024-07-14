import styled from "styled-components";

export const StyledDefaultInputLabel = styled.label`
  display: flex;
  flex-direction: column;
  width: fit-content;
  gap: 0.5rem;
  font-size: ${({ theme }) => theme.fontSizes.textSmall};
  font-weight: 700;
  color: ${({ theme }) => theme.colors.darkGray};
`;
