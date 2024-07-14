import styled from "styled-components";
import { StyledDefaultForm } from "../../atoms/StyledDefaultForm/StyledDefaultForm.styles";
import FormInput from "../../molecules/FormInput/FormInput";

export const StyledRegisterEmployeeForm = styled(StyledDefaultForm)`
  flex-direction: column;
  gap: 1rem;
  width: 100%;
  height: fit-content;
  width: fit-content;
  max-width: 1400px;
  margin: 0 auto 50px auto;
`;

export const StyledInputsWrapper = styled.div`
  display: grid;
  grid-auto-flow: column;
  gap: 0.8rem;
`;

export const StyledRegisterEmployeeFormInput = styled(FormInput)`
  width: 200px;
`;

export const StyledSuccessStatus = styled.span`
  font-size: ${({ theme }) => theme.defaultFontSize};
  width: fit-content;
  max-width: 50%;
  padding: 0.8rem;
  margin: 0 auto;
  border-radius: 10px;
  color: ${({ theme }) => theme.colors.green};
  background-color: ${({ theme }) => theme.colors.lightGreen};
`;
