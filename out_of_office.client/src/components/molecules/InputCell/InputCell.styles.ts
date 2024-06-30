import styled from "styled-components";

type Props = {
  $error: boolean;
};

export const StyledInput = styled.input<Props>`
  display: flex;
  width: 100%;
  padding: 0.5rem;
  border: 1px solid
    ${(props) => (props.$error ? props.theme.colors.red : "transparent")};
  border-radius: 10px;
  outline: none;
  transition: all 0.5s;
  &:hover,
  &:focus {
    border: 1px solid
      ${(props) =>
        props.$error ? props.theme.colors.red : props.theme.colors.orange};
    background-color: ${(props) =>
      props.$error
        ? props.theme.colors.lightRed
        : props.theme.colors.lightOrange};
  }
`;
