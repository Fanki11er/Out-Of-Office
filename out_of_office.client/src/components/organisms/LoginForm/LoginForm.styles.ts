import { Form } from "formik";
import styled from "styled-components";

export const StyledLoginForm = styled(Form)`
  background-color: ${({ theme }) => theme.colors.white};
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  box-shadow: 0px 8px 15px ${({ theme }) => theme.colors.lightShadow},
    2px 0px 15px ${({ theme }) => theme.colors.lightShadow};
  padding: 2rem;
  width: fit-content;
  height: fit-content;
  border-radius: 10px;
`;
