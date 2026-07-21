import {
  HiOutlineBell,
  HiOutlineSearch,
  HiChevronDown,
  HiOutlineMenu,
} from "react-icons/hi";

import Logo from "../common/Logo";

function Navbar({ sidebarOpen, setSidebarOpen }) {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 h-16 bg-white border-b border-gray-200 flex">

      {/* Logo Area */}
      <div className="w-64 flex items-center px-4 md:px-6">

        {/* Mobile Hamburger (for future use) */}
<button
  onClick={() => setSidebarOpen(!sidebarOpen)}
  className="mr-3 text-2xl md:hidden"
>
  <HiOutlineMenu />
</button>

        <Logo />

      </div>

      {/* Right Area */}
      <div className="flex flex-1 items-center justify-end md:justify-between px-4 md:px-8">

        {/* Search */}
        <div className="relative hidden md:block w-72 lg:w-96">

          <HiOutlineSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-lg" />

          <input
            type="text"
            placeholder="Search..."
            className="w-full rounded-lg border border-gray-200 bg-gray-50 py-2 pl-11 pr-4 outline-none focus:border-orange-500"
          />

        </div>

        {/* Right */}
        <div className="flex items-center gap-4 md:gap-6">

          <button className="relative text-2xl text-gray-600 hover:text-orange-500 transition">

            <HiOutlineBell />

            <span className="absolute top-1 right-0 h-2 w-2 rounded-full bg-orange-500"></span>

          </button>

          <div className="flex items-center gap-3 cursor-pointer">

            <img
              src="https://i.pravatar.cc/150"
              alt="Profile"
              className="h-9 w-9 md:h-10 md:w-10 rounded-full"
            />

            {/* Hide user details on mobile */}
            <div className="hidden sm:block">

              <p className="text-sm font-semibold">
                Name
              </p>

              <p className="text-xs text-gray-500">
                Administrator
              </p>

            </div>

            <HiChevronDown className="hidden sm:block" />

          </div>

        </div>

      </div>

    </header>
  );
}

export default Navbar;