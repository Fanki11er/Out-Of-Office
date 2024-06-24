import { Outlet } from "react-router-dom";
import { StyledListsView } from "./ListsView.styles";
import NavigationBar from "../../components/molecules/NavigationBar/NavigationBar";

const ListsView = () => {
  return (
    <StyledListsView>
      <NavigationBar />
      <Outlet />
    </StyledListsView>
  );
};

export default ListsView;
