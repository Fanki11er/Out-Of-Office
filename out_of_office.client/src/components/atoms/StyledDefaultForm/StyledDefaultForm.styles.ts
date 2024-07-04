import { Form } from "formik";
import styled from "styled-components";

export const StyledDefaultForm = styled(Form)`
  background-color: ${({ theme }) => theme.colors.white};
  display: flex;
  align-items: center;
  box-shadow: 0px 8px 15px ${({ theme }) => theme.colors.lightShadow},
    2px 0px 15px ${({ theme }) => theme.colors.lightShadow};
  padding: 2rem;
  border-radius: 10px;
`;
