import { BrowserRouter,Routes,Route } from "react-router-dom";

import Login from "../pages/Auth/Login";
import Dashboard from "../pages/Dashboard/Dashboard";
import EmployeeList from "../pages/Employees/EmployeeList";
import AddEmployee from "../pages/Employees/AddEmployee";
import Profile from "../pages/Profile/Profile";

import MainLayout from "../components/layout/MainLayout";

function AppRoutes(){
    return(
        <BrowserRouter>
        <Routes>
        {/* Public Route */}
        <Route path="/" element={<Login />} />
         {/* Protected Layout */}
        <Route path="/dashboard" element={<MainLayout><Dashboard /></MainLayout>} />

        <Route path="/employees" element={<MainLayout><EmployeeList /></MainLayout>} />

        <Route path="/employees/add" element={<MainLayout><AddEmployee /></MainLayout>} />

        <Route path="/profile" element={<MainLayout><Profile /></MainLayout>} />
        </Routes>
        </BrowserRouter>

    );
}

export default AppRoutes