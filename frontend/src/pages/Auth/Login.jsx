import { useState } from "react";
import { login } from "../../services/authService";
import { useNavigate } from "react-router-dom";
import { HiOutlineEye, HiOutlineEyeOff } from "react-icons/hi";
import Logo from "../../components/common/Logo";

function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
  email: "",
  password: "",
  });
  const [error, setError] = useState("");
  const handleChange = (e) => {
  setFormData({
    ...formData,
    [e.target.name]: e.target.value,
  });
};
const handleLogin = async (e) => {
  e.preventDefault();

  setError("");

  try {

    await login(formData);

    navigate("/dashboard");

  } catch (err) {

    setError(
      err.response?.data?.message || "Login Failed"
    );

  }
};
  return (
    <div className="min-h-screen bg-[#f7f8fc] flex items-center justify-center px-4 sm:px-6 lg:px-8">

      <div
        className="
          w-full
          max-w-md
          rounded-3xl
          bg-white
          p-6
          sm:p-8
          border
          border-gray-100
          shadow-[0_10px_35px_rgba(0,0,0,0.08)]
        "
      >

        {/* Logo */}
        <div className="flex justify-center mb-6">
          <Logo />
        </div>



        {/* Login Form */}
        <form onSubmit={handleLogin} className="space-y-5">

          {/* Email */}
          <div>

            <label className="block text-sm font-medium text-gray-700 mb-2">
              Email Address
            </label>

            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email"
              className="
                w-full
                rounded-xl
                border
                border-gray-200
                bg-gray-50
                px-4
                py-2.5
                outline-none
                transition-all
                duration-200
                focus:border-orange-500
                focus:bg-white
                focus:ring-4
                focus:ring-orange-100
              "
            />

          </div>

          {/* Password */}
          <div>

            <label className="block text-sm font-medium text-gray-700 mb-2">
              Password
            </label>

            <div className="relative">

              <input
                type={showPassword ? "text" : "password"}
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Enter your password"
                className="
                  w-full
                  rounded-xl
                  border
                  border-gray-200
                  bg-gray-50
                  px-4
                  py-2.5
                  pr-12
                  outline-none
                  transition-all
                  duration-200
                  focus:border-orange-500
                  focus:bg-white
                  focus:ring-4
                  focus:ring-orange-100
                "
              />
{
  error && (
    <p className="text-sm text-red-500 text-center">
      {error}
    </p>
  )
}
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="
                  absolute
                  right-4
                  top-1/2
                  -translate-y-1/2
                  text-xl
                  text-gray-500
                  hover:text-orange-500
                  transition
                "
              >
                {showPassword ? (
                  <HiOutlineEyeOff />
                ) : (
                  <HiOutlineEye />
                )}
              </button>

            </div>

          </div>

          {/* Remember Me & Forgot Password */}
          <div className="flex items-center justify-between">

            <label className="flex items-center gap-2 text-sm text-gray-600 cursor-pointer">

              <input
                type="checkbox"
                className="h-4 w-4 accent-orange-500"
              />

              Remember me

            </label>

            <button
              type="button"
              className="
                text-sm
                font-medium
                text-orange-500
                hover:text-orange-600
                hover:underline
                transition
              "
            >
              Forgot Password?
            </button>

          </div>

          {/* Login Button */}
          <button
            type="submit"
            className="
    w-full
    md:w-52
    md:mx-auto
    md:block
    rounded-xl
    bg-orange-500
    py-2.5
    text-sm
    font-semibold
    text-white
    transition-all
    duration-300
    hover:bg-orange-600
    hover:shadow-md
    active:scale-95
            "
          >
            Login
          </button>

        </form>

        {/* Footer */}
        <p className="mt-8 text-center text-xs text-gray-400">
          © 2026 WorkSphere. All Rights Reserved.
        </p>

      </div>

    </div>
  );
}

export default Login;