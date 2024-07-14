import styled from "styled-components";

export const StyledModal = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100vh;
  position: absolute;
  left: 0;
  top: 0;
  background-color: ${({ theme }) => theme.colors.darkShadow};
  opacity: 0;
  animation-name: show;
  animation-duration: 1s;
  animation-fill-mode: forwards;

  @keyframes show {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
`;

export const StyledCloseButton = styled.button`
  width: fit-content;
  font-size: ${({ theme }) => theme.fontSizes.h3};
  height: fit-content;
  padding: 10px;
  position: absolute;
  right: 25px;
  top: 25px;
  border-radius: 10px;
  background-color: ${({ theme }) => theme.colors.lightOrange};
  color: ${({ theme }) => theme.colors.orange};
  outline: none;
  transition: border 0.5s;
  border: 2px solid transparent;
  &:hover,
  &:focus {
    border: 2px solid ${({ theme }) => theme.colors.darkOrange};
  }
`;
