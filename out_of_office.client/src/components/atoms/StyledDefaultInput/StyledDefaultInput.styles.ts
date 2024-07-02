import styled from "styled-components";

export const StyledDefaultInput = styled.input`
  display: flex;
  width: 100%;
  padding: 0.5rem;
  border: 1px solid "transparent";
  border-radius: 10px;
  outline: none;
  transition: all 0.5s;
  &:hover,
  &:focus {
    border: 1px solid ${(props) => props.theme.colors.orange};
    background-color: ${(props) => props.theme.colors.lightOrange};
  }
`;
