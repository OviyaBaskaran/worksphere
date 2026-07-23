import { useState } from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../components/layout/Navbar";
import Sidebar from "../components/layout/Sidebar";

function MainLayout() {
    const [sidebarOpen, setSidebarOpen] = useState(false);
  return (
    <div className="h-screen overflow-hidden bg-gray-100">

      {/* Fixed Navbar */}
  <Navbar
  sidebarOpen={sidebarOpen}
  setSidebarOpen={setSidebarOpen}
/>

      {/* Body */}
      <div className="flex mt-16 h-[calc(100vh-64px)]">

        {/* Fixed Sidebar */}
        <Sidebar
  sidebarOpen={sidebarOpen}
  setSidebarOpen={setSidebarOpen}
/>

        {/* Scrollable Content */}
        <main
          className="
            flex-1
            overflow-y-auto
            p-4
            sm:p-5
            md:p-6
            lg:p-6
          "
        >
          <Outlet />
        </main>

      </div>

    </div>
  );
}

export default MainLayout;