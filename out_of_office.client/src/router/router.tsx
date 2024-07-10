import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { routerPaths } from "./routerPaths";
import LoginView from "../views/LoginView/LoginView";
import RequireAuth from "../components/molecules/RequireAuth/RequireAuth";
import ListsView from "../views/ListsView/ListsView";
import EmployeesList from "../components/organisms/EmployeesList/EmployeesList";
import LeaveRequestsList from "../components/organisms/LeaveRequestsList/LeaveRequestsList";
import ApprovalRequestsList from "../components/organisms/ApprovalRequestsList/ApprovalRequestsList";
const { root, lists, employeeList, leaveRequestsList, approvalRequestsList } =
  routerPaths;

const AppRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={root} element={<LoginView />} />
        <Route element={<RequireAuth />}>
          <Route path={lists} element={<ListsView />}>
            <Route path={employeeList} element={<EmployeesList />} />
            <Route path={leaveRequestsList} element={<LeaveRequestsList />} />
            <Route
              path={approvalRequestsList}
              element={<ApprovalRequestsList />}
            />
          </Route>
        </Route>
        <Route path="*" element={<Navigate to={root} />} />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRouter;
