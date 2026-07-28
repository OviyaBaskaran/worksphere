import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

import {
  HiOutlineEye,
  HiOutlineEyeOff,
} from "react-icons/hi";

import { login } from "../../services/authService";
import { loginSuccess } from "../../store/authSlice";

import Logo from "../../components/common/Logo";
import Button from "../../components/ui/Button";
import Input from "../../components/ui/Input";
import Card from "../../components/ui/Card";

import {
  showSuccess,
  showError,
} from "../../utils/toast";


function Login() {


  const dispatch = useDispatch();

  const navigate = useNavigate();


  const [showPassword,setShowPassword] =
    useState(false);


  const [loading,setLoading] =
    useState(false);



  const {
    register,
    handleSubmit,
    formState:{
      errors
    }
  } = useForm();

const handleValidationError = (errors) => {

  if(errors.email){

    showError(
      "Please enter email."
    );

    return;

  }


  if(errors.password){

    showError(
      "Please enter password."
    );

    return;

  }

};

  const handleLogin = async(data)=>{


    try{

      setLoading(true);


      const response =
  await login(data);



dispatch(

  loginSuccess({

    user:
      response.data.admin,

    token:
      response.data.accessToken,

  })

);



      showSuccess(
        "Login successful."
      );


      navigate("/dashboard");


    }
    catch(error){


      showError(

        error.response?.data?.message ||

        "Invalid email or password."

      );


    }
    finally{

      setLoading(false);

    }


  };



  return (

    <div
      className="
        min-h-screen
        bg-[#f7f8fc]
        flex
        items-center
        justify-center
        px-4
      "
    >


      <Card
        className="
          w-full
          max-w-md
          p-6
          sm:p-8
        "
      >


        <div
          className="
            flex
            justify-center
            mb-6
          "
        >

          <Logo />

        </div>



        <form
          onSubmit={
            handleSubmit(handleLogin,handleValidationError)
          }
          className="space-y-5"
        >



          <Input

            label="Email Address"

            type="email"

            placeholder="Enter your email"

            error={
              errors.email?.message
            }

            {...register(
              "email",
              {
                required:
                "Email is required"
              }
            )}

          />





          <div>


            <label
              className="
                block
                text-sm
                font-medium
                text-gray-700
                mb-2
              "
            >

              Password

            </label>



            <div
              className="relative"
            >

              <input

                type={
                  showPassword
                  ? "text"
                  : "password"
                }

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
                  focus:border-orange-500
                "


                {...register(
                  "password",
                  {
                    required:
                    "Password is required"
                  }
                )}

              />



              <button

                type="button"

                onClick={()=>setShowPassword(
                  !showPassword
                )}

                className="
                  absolute
                  right-4
                  top-1/2
                  -translate-y-1/2
                  text-xl
                "

              >

                {
                  showPassword

                  ?

                  <HiOutlineEyeOff/>

                  :

                  <HiOutlineEye/>

                }


              </button>


            </div>




            {
              errors.password &&

              <p
                className="
                  text-sm
                  text-red-500
                  mt-2
                "
              >

                {
                  errors.password.message
                }

              </p>

            }


          </div>





          <div className="flex justify-center">
  <Button
    type="submit"
    disabled={loading}
    className="px-10"
  >
    {loading ? "Signing in..." : "Login"}
  </Button>
</div>



        </form>





        <p
          className="
            mt-8
            text-center
            text-xs
            text-gray-400
          "
        >

          © 2026 WorkSphere. All Rights Reserved.

        </p>



      </Card>


    </div>

  );


}


export default Login;