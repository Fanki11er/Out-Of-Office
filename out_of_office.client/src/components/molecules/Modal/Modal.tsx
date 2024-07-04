import { PropsWithChildren } from "react";
import { StyledCloseButton, StyledModal } from "./Modal.styles";

type Props = {
  handleCloseModal: () => void;
};

const Modal = ({ children, handleCloseModal }: Props & PropsWithChildren) => {
  return (
    <StyledModal>
      {children}
      <StyledCloseButton onClick={handleCloseModal}>X</StyledCloseButton>
    </StyledModal>
  );
};

export default Modal;
