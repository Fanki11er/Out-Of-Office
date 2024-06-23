import { Field } from "formik";
import styled from "styled-components";

export const StyledInputLabel = styled.label`
  display: flex;
  flex-direction: column;
  width: fit-content;
  gap: 0.5rem;
  font-size: ${({ theme }) => theme.fontSizes.textSmall};
  font-weight: 700;
  color: ${({ theme }) => theme.colors.darkGray};
`;

export const StyledFormInput = styled(Field)`
  display: flex;
  width: 300px;
  padding: 0.5rem;
  border: 1px solid ${({ theme }) => theme.colors.darkGray};
  border-radius: 10px;
  outline: none;
  transition: all 0.5s;
  &:hover,
  &:focus {
    border: 1px solid ${({ theme }) => theme.colors.orange};
    background-color: ${({ theme }) => theme.colors.lightOrange};
  }
`;

export const StyledFormInputErrorIndicator = styled.span`
  font-size: ${({ theme }) => theme.fontSizes.textSmall};
  padding: 0.25rem;
  background-color: ${({ theme }) => theme.colors.lightRed};
  color: ${({ theme }) => theme.colors.black};
  border-radius: 5px;
  border: 1px solid ${({ theme }) => theme.colors.red};
`;
