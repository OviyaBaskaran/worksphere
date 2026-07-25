import { useState } from "react";
import { login } from "../../services/authService";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

import { HiOutlineEye, HiOutlineEyeOff } from "react-icons/hi";

import { loginSuccess } from "../../store/authSlice";

import Logo from "../../components/common/Logo";
import Button from "../../components/ui/Button";
import Input from "../../components/ui/Input";
import Card from "../../components/ui/Card";


function Login() {


  const dispatch = useDispatch();

  const navigate = useNavigate();


  const [showPassword, setShowPassword] = useState(false);


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


      const response = await login(formData);


      console.log(
        "LOGIN RESPONSE:",
        response
      );



     dispatch(
  loginSuccess({
    user: response.data.admin,
    token: response.data.token,
  })
);



      navigate("/dashboard");



    } 
    catch (err) {


      setError(

        err.response?.data?.message ||
        "Login Failed"

      );


    }


  };





  return (

    <div className="
      min-h-screen
      bg-[#f7f8fc]
      flex
      items-center
      justify-center
      px-4
      sm:px-6
      lg:px-8
    ">


      <Card className="
        w-full
        max-w-md
        p-6
        sm:p-8
      ">



        {/* Logo */}

        <div className="
          flex
          justify-center
          mb-6
        ">

          <Logo />

        </div>





        {/* Login Form */}

        <form
          onSubmit={handleLogin}
          className="space-y-5"
        >




          {/* Email */}

          <div>

            <Input

              label="Email Address"

              type="email"

              name="email"

              value={formData.email}

              onChange={handleChange}

              placeholder="Enter your email"

            />

          </div>






          {/* Password */}

          <div>


            <label className="
              block
              text-sm
              font-medium
              text-gray-700
              mb-2
            ">

              Password

            </label>




            <div className="relative">


              <input

                type={
                  showPassword
                  ? "text"
                  : "password"
                }

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





              <button

                type="button"

                onClick={() =>
                  setShowPassword(!showPassword)
                }

                className="
                  absolute
                  right-4
                  top-1/2
                  -translate-y-1/2
                  text-xl
                  text-gray-500
                  hover:text-orange-500
                "

              >


                {
                  showPassword
                  ?
                  <HiOutlineEyeOff />
                  :
                  <HiOutlineEye />
                }


              </button>



            </div>





            {
              error && (

                <p className="
                  text-sm
                  text-red-500
                  text-center
                  mt-2
                ">

                  {error}

                </p>

              )
            }



          </div>







          {/* Remember Me & Forgot Password */}

          <div className="
            flex
            items-center
            justify-between
          ">


            <label className="
              flex
              items-center
              gap-2
              text-sm
              text-gray-600
              cursor-pointer
            ">


              <input

                type="checkbox"

                className="
                  h-4
                  w-4
                  accent-orange-500
                "

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
              "

            >

              Forgot Password?

            </button>



          </div>







          {/* Login Button */}

          <Button

            type="submit"

            fullWidth

          >

            Login


          </Button>





        </form>






        {/* Footer */}

        <p className="
          mt-8
          text-center
          text-xs
          text-gray-400
        ">

          © 2026 WorkSphere. All Rights Reserved.

        </p>




      </Card>


    </div>

  );

}


export default Login;