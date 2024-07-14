import styled from "styled-components";
import { StyledDefaultInput } from "../../atoms/StyledDefaultInput/StyledDefaultInput.styles";

type Props = {
  $error: boolean;
};

export const StyledInput = styled(StyledDefaultInput)<Props>`
  border: 1px solid
    ${(props) => (props.$error ? props.theme.colors.red : "transparent")};
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
