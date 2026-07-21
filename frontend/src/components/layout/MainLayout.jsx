import { useState } from "react";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";

function MainLayout({ children }) {
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
          {children}
        </main>

      </div>

    </div>
  );
}

export default MainLayout;