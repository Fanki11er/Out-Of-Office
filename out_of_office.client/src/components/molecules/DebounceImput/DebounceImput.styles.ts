import styled from "styled-components";
import { StyledDefaultInput } from "../../atoms/StyledDefaultInput/StyledDefaultInput.styles";
type Props = {
  type: string;
};
export const StyledDebounceInput = styled(StyledDefaultInput)<Props>`
  width: ${(props) => (props.type === "number" ? "60px" : "inherit")};
`;
