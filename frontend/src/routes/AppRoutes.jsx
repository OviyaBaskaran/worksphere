import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "../pages/Auth/Login";
import Dashboard from "../pages/Dashboard/Dashboard";
import EmployeeList from "../pages/Employees/EmployeeList";
import AddEmployee from "../pages/Employees/AddEmployee";
import EditEmployee from "../pages/Employees/EditEmployee";
import Profile from "../pages/Profile/Profile";
import NotFound from "../pages/Error/NotFound";

import MainLayout from "../layouts/MainLayout";
import ProtectedRoute from "./ProtectedRoute";

function AppRoutes() {

  return (

    <BrowserRouter>

      <Routes>

        {/* Public Route */}

        <Route
          path="/"
          element={<Login />}
        />

        {/* Protected Routes */}

        <Route element={<ProtectedRoute />}>

          <Route element={<MainLayout />}>

            <Route
              path="/dashboard"
              element={<Dashboard />}
            />

            <Route
              path="/employees"
              element={<EmployeeList />}
            />

            <Route
              path="/employees/add"
              element={<AddEmployee />}
            />

            <Route
              path="/employees/edit/:id"
              element={<EditEmployee />}
            />

            <Route
              path="/profile"
              element={<Profile />}
            />

          </Route>

        </Route>

        {/* 404 Page (Full Screen) */}

        <Route
          path="*"
          element={<NotFound />}
        />

      </Routes>

    </BrowserRouter>

  );

}

export default AppRoutes;