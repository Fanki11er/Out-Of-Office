import { StyledStatusImage } from "../../atoms/StyledStatusImage/StyledStatusImage.styles";
import { StyledTableLoader, StyledTableLoaderText } from "./TableLoader.styles";
import loaderImage from "../../../assets/loaderImage.svg";

const TableLoader = () => {
  return (
    <StyledTableLoader>
      <StyledStatusImage src={loaderImage} />
      <StyledTableLoaderText>Loading table data...</StyledTableLoaderText>
    </StyledTableLoader>
  );
};

export default TableLoader;
