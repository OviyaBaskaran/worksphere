import {
  HiOutlineHome,
  HiOutlineUsers,
  HiOutlineUserAdd,
  HiOutlineUser,
  HiOutlineLogout,
} from "react-icons/hi";

import { NavLink } from "react-router-dom";

const menus = [
  {
    name: "Dashboard",
    path: "/dashboard",
    icon: HiOutlineHome,
  },
  {
    name: "Employees",
    path: "/employees",
    icon: HiOutlineUsers,
  },
  {
    name: "Add Employee",
    path: "/employees/add",
    icon: HiOutlineUserAdd,
  },
  {
    name: "Profile",
    path: "/profile",
    icon: HiOutlineUser,
  },
  {
    name: "Logout",
    path: "/",
    icon: HiOutlineLogout,
  },
];

function  Sidebar({ sidebarOpen, setSidebarOpen }) {
  return (
<>
  {/* Mobile Overlay */}
  {sidebarOpen && (
    <div
      onClick={() => setSidebarOpen(false)}
      className="fixed inset-0 z-40 bg-black/40 md:hidden"
    />
  )}

  <aside
    className={`
      fixed md:static
      top-16 left-0
      z-50
      w-64
      h-[calc(100vh-64px)]
      bg-white
      border-r
      border-gray-200
      py-3
      flex-shrink-0
      transition-transform
      duration-300
      ${
        sidebarOpen
          ? "translate-x-0"
          : "-translate-x-full md:translate-x-0"
      }
    `}
  >
      <nav className="px-3 space-y-2">

        {menus.map((menu) => {
          const Icon = menu.icon;

          return (
            <NavLink
              key={menu.name}
              to={menu.path}
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-3 text-sm font-medium transition-all duration-200
                ${
                  isActive
                    ? "bg-orange-50 text-orange-500 border-l-[5px] border-orange-500 rounded-lg font-semibold"
                    : "text-gray-600 hover:bg-orange-50 hover:text-orange-500 rounded-lg"
                }`
              }
            >
              <Icon className="text-xl flex-shrink-0" />

              <span className="truncate">
                {menu.name}
              </span>
            </NavLink>
          );
        })}

      </nav>
    </aside>
    </>
  );
}

export default Sidebar;