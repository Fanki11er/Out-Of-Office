import { Field } from "formik";
import styled from "styled-components";

interface ErrorProps {
  $iserror: boolean;
}

export const StyledDateFormFieldWrapper = styled.div`
  display: grid;
  grid-template-rows: auto auto;
  row-gap: 5px;
  position: relative;
  width: 150px;
`;

export const StyledIndicatorImage = styled.img`
  position: absolute;
  grid-row: 2/3;
  right: 15px;
  top: 8px;
  width: 25px;
  height: 25px;
  pointer-events: none;
`;

export const StyledDateField = styled(Field)<ErrorProps>`
  width: fit-content;
  height: 40px;
  border-radius: 10px;
  background-color: ${({ theme }) => theme.colors.lightOrange};
  padding: 5px 10px;
  border: 2px solid
    ${(props) => (props.$iserror ? props.theme.colors.red : "transparent")};
  color: ${({ theme }) => theme.colors.blue};
  outline: none;
  &::-webkit-calendar-picker-indicator {
    justify-self: flex-end;
    background-image: none;
    width: 25px;
    height: 25px;
    &:hover {
      cursor: pointer;
    }
  }

  &:hover,
  &:focus {
    border: 2px solid ${({ theme }) => theme.colors.orange};
    cursor: pointer;
  }
  transition: all 0.5s;
`;
