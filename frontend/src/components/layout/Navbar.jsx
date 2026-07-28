import {
  useRef,
  useState,
  useEffect,
} from "react";

import {
  useSelector,
  useDispatch,
} from "react-redux";

import {
  useNavigate,
} from "react-router-dom";

import {
  HiOutlineBell,
  HiOutlineSearch,
  HiChevronDown,
  HiOutlineMenu,
} from "react-icons/hi";

import Logo from "../common/Logo";
import Avatar from "../ui/Avatar";

import {
  logout,
  updateUser,
} from "../../store/authSlice";

import {
  setEmployeeSearch,
} from "../../store/searchSlice";

import {
  fetchProfile,
} from "../../services/profileService";

function Navbar({

  sidebarOpen,

  setSidebarOpen,

}) {

  const dispatch = useDispatch();

  const navigate = useNavigate();

  const { user } = useSelector(
    (state) => state.auth
  );

  const { employeeSearch } = useSelector(
    (state) => state.search
  );

  const [profileOpen, setProfileOpen] =
    useState(false);

  const profileRef = useRef(null);

  /*
    Load latest profile
  */

  useEffect(() => {

    const loadProfile = async () => {

      try {

        const profile =
          await fetchProfile();

        dispatch(

          updateUser({

            FullName:
              profile.FullName,

            Email:
              profile.Email,

            Photo:
              profile.Photo,

            Role:
              profile.Role,

          })

        );

      }
      catch (error) {

        console.log(
          "Profile loading failed",
          error
        );

      }

    };

    loadProfile();

  }, [dispatch]);

  /*
    Close dropdown
  */

  useEffect(() => {

    const handleClickOutside = (event) => {

      if (

        profileRef.current &&

        !profileRef.current.contains(
          event.target
        )

      ) {

        setProfileOpen(false);

      }

    };

    document.addEventListener(

      "mousedown",

      handleClickOutside

    );

    return () => {

      document.removeEventListener(

        "mousedown",

        handleClickOutside

      );

    };

  }, []);

  /*
    Global Employee Search
  */

  const handleSearch = (e) => {

    const value = e.target.value;

    dispatch(
      setEmployeeSearch(value)
    );

    if (

      value &&

      window.location.pathname !== "/employees"

    ) {

      navigate("/employees");

    }

  };

  /*
    Logout
  */

  const handleLogout = () => {

    dispatch(logout());

    setProfileOpen(false);

    navigate("/", {

      replace: true,

    });

  };

  const userName =

    user?.FullName ||

    user?.fullName ||

    "Admin";

  const userRole =

    user?.Role ||

    user?.role ||

    "Administrator";

  const userPhoto =

    user?.Photo

      ?

      user.Photo.startsWith("http")

        ?

        user.Photo

        :

        `http://localhost:5000/${user.Photo}`

      :

      null;

  return (

    <header

      className="
        fixed
        top-0
        left-0
        right-0
        z-50
        h-16
        bg-white
        border-b
        border-gray-200
        flex
      "

    >
          {/* Logo */}

      <div

        className="
          w-64
          flex
          items-center
          px-4
          md:px-6
        "

      >

        <button

          onClick={() =>
            setSidebarOpen(!sidebarOpen)
          }

          className="
            mr-3
            text-2xl
            md:hidden
          "

        >

          <HiOutlineMenu />

        </button>

        <Logo />

      </div>





      {/* Right */}

      <div

        className="
          flex
          flex-1
          items-center
          justify-end
          md:justify-between
          px-4
          md:px-8
        "

      >





        {/* Global Employee Search */}

        <div

          className="
            relative
            hidden
            md:block
            w-72
            lg:w-96
          "

        >

          <HiOutlineSearch

            className="
              absolute
              left-4
              top-1/2
              -translate-y-1/2
              text-gray-400
              text-lg
            "

          />

          <input

            type="text"

            value={employeeSearch}

            onChange={handleSearch}

            placeholder="Search employees..."

            className="
              w-full
              h-10
              rounded-lg
              border
              border-gray-200
              bg-gray-50
              py-2
              pl-11
              pr-4
              outline-none
              transition
              focus:border-orange-500
              focus:bg-white
            "

          />

        </div>





        {/* Right Actions */}

        <div

          className="
            flex
            items-center
            gap-4
            md:gap-6
          "

        >





          {/* Notification */}

          <button

            className="hidden
              relative
              text-2xl
              text-gray-600
              hover:text-orange-500
              transition
            "

          >

            <HiOutlineBell />

            <span

              className="
                absolute
                top-1
                right-0
                h-2
                w-2
                rounded-full
                bg-orange-500
              "

            />

          </button>





          {/* Profile */}

          <div

            ref={profileRef}

            className="relative"

          >

            <button

              onClick={() =>
                setProfileOpen(!profileOpen)
              }

              className="
                flex
                items-center
                gap-3
                cursor-pointer
              "

            >

              <Avatar

                image={userPhoto}

                name={userName}

                className="
                  h-9
                  w-9
                  md:h-10
                  md:w-10
                "

              />

              <div

                className="
                  hidden
                  sm:block
                  text-left
                "

              >

                <p

                  className="
                    text-sm
                    font-semibold
                  "

                >

                  {userName}

                </p>

                <p

                  className="
                    text-xs
                    text-gray-500
                  "

                >

                  {userRole}

                </p>

              </div>

              <HiChevronDown

                className="
                  hidden
                  sm:block
                "

              />

            </button>
                        {/* Profile Dropdown */}

            {profileOpen && (

              <div

                className="
                  absolute
                  right-0
                  mt-3
                  w-48
                  bg-white
                  border
                  border-gray-100
                  rounded-xl
                  shadow-lg
                  overflow-hidden
                  z-50
                "

              >

                <button

                  onClick={() => {

                    navigate("/profile");

                    setProfileOpen(false);

                  }}

                  className="
                    w-full
                    px-4
                    py-3
                    text-left
                    text-sm
                    text-gray-700
                    hover:bg-orange-50
                    hover:text-orange-500
                    transition
                  "

                >

                  My Profile

                </button>

                <div className="border-t border-gray-100" />

                <button

                  onClick={handleLogout}

                  className="
                    w-full
                    px-4
                    py-3
                    text-left
                    text-sm
                    text-red-500
                    hover:bg-red-50
                    transition
                  "

                >

                  Logout

                </button>

              </div>

            )}

          </div>

        </div>

      </div>

    </header>

  );

}

export default Navbar;