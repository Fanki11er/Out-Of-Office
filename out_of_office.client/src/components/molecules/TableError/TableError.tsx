import { StyledStatusImage } from "../../atoms/StyledStatusImage/StyledStatusImage.styles";
import { StyledTableError, StyledTableErrorText } from "./TableError.styles";
import errorImage from "../../../assets/errorImage.svg";

type Props = {
  errorMessage: string;
};

const TableError = ({ errorMessage }: Props) => {
  return (
    <StyledTableError>
      <StyledStatusImage src={errorImage} />
      <StyledTableErrorText>{errorMessage}</StyledTableErrorText>
    </StyledTableError>
  );
};

export default TableError;
