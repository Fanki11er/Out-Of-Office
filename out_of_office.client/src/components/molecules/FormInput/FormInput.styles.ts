import { Field } from "formik";
import styled from "styled-components";

type Props = {
  $isError: boolean;
};
export const StyledFormInput = styled(Field)<Props>`
  display: flex;
  width: 300px;
  padding: 0.5rem;
  border: 1px solid
    ${({ theme, $isError }) =>
      $isError ? theme.colors.red : theme.colors.darkGray};
  border-radius: 10px;
  outline: none;
  transition: all 0.5s;
  &:hover,
  &:focus {
    border: 1px solid
      ${({ theme, $isError }) =>
        $isError ? theme.colors.red : theme.colors.orange};
    background-color: ${({ theme, $isError }) =>
      $isError ? theme.colors.lightRed : theme.colors.lightOrange};
  }
`;
