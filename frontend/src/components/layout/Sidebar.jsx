import {
  HiOutlineHome,
  HiOutlineUsers,
  HiOutlineUser,
  HiOutlineLogout,
} from "react-icons/hi";

import { NavLink, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

import { logout } from "../../store/authSlice";


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
    name: "Profile",
    path: "/profile",
    icon: HiOutlineUser,
  },
];


function Sidebar({ sidebarOpen, setSidebarOpen }) {


  const dispatch = useDispatch();

  const navigate = useNavigate();



  const handleLogout = () => {

    dispatch(logout());

    navigate("/");

  };



  return (
    <>
      {/* Mobile Overlay */}

      {sidebarOpen && (
        <div
          onClick={() => setSidebarOpen(false)}
          className="
            fixed
            inset-0
            z-40
            bg-black/40
            md:hidden
          "
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



          {/* Logout */}

          <button

            onClick={handleLogout}

            className="
              w-full
              flex
              items-center
              gap-3
              px-4
              py-3
              text-sm
              font-medium
              text-gray-600
              hover:bg-orange-50
              hover:text-orange-500
              rounded-lg
              transition-all
            "

          >

            <HiOutlineLogout className="text-xl flex-shrink-0" />


            <span>
              Logout
            </span>


          </button>



        </nav>


      </aside>

    </>
  );
}


export default Sidebar;