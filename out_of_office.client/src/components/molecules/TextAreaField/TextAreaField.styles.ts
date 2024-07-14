import { Field } from "formik";
import styled from "styled-components";

export const StyledTextareaFieldLabel = styled.label`
  display: flex;
  flex-direction: column;
  width: 100%;
  color: ${({ theme }) => theme.colors.black};
  row-gap: 10px;
`;

export const StyledTextareaFieldInput = styled(Field)`
  background-color: ${({ theme }) => theme.colors.lightOrange};
  border-radius: 10px;
  padding: 1rem;
  resize: none;
  border: 2px solid ${({ theme }) => theme.colors.lightOrange};
  outline: none;
  transition: all 0.5s;
  &:hover,
  &:focus {
    border: 2px solid ${({ theme }) => theme.colors.orange};
  }
  &::placeholder {
    color: ${({ theme }) => theme.colors.darkGray};
  }
`;
