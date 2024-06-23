import { createBrowserRouter } from "react-router-dom";
import { routerPaths } from "./routerPaths";
import LoginView from "../views/LoginView/LoginView";

export const router = createBrowserRouter([
  {
    path: routerPaths.root,
    element: <LoginView />,
  },
]);
