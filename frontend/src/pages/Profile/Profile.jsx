import { useDispatch } from "react-redux";
import { updateUser } from "../../store/authSlice";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

import Card from "../../components/ui/Card";
import Input from "../../components/ui/Input";
import Button from "../../components/ui/Button";
import Avatar from "../../components/ui/Avatar";
import Breadcrumbs from "../../components/ui/Breadcrumbs";
import Loader from "../../components/ui/Loader";
import {
  fetchProfile,
  updateProfile,
  updatePassword,
} from "../../services/profileService";
import {
  showSuccess,
  showError,
} from "../../utils/toast";

function Profile() {

  const dispatch = useDispatch();
  const [profile, setProfile] = useState(null);

  const [photo, setPhoto] = useState(null);

  const [preview, setPreview] = useState(null);

  const [loading, setLoading] = useState(true);

  const [saving, setSaving] = useState(false);

  const [passwordSaving, setPasswordSaving] = useState(false);

  const [error, setError] = useState("");
  
  


  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState:{
      errors
    }

  } = useForm({

    mode:"onBlur"

  });



  const newPassword = watch(
    "newPassword"
  );



  useEffect(()=>{

    loadProfile();

  },[]);




  const loadProfile = async()=>{


    try{

      setLoading(true);


      const data =
        await fetchProfile();



      setProfile(data);



      setValue(
        "fullName",
        data.FullName
      );


      setValue(
        "email",
        data.Email
      );



      if(data.Photo){

        setPreview(
          `http://localhost:5000/${data.Photo}`
        );

      }


    }
    catch(error){

      setError(
        "Failed to load profile"
      );

    }
    finally{

      setLoading(false);

    }


  };






  const handlePhoto = (event) => {

  const file = event.target.files[0];

  if (!file) return;

  const allowedTypes = [
    "image/jpeg",
    "image/jpg",
    "image/png",
  ];

  if (!allowedTypes.includes(file.type)) {

    showError(
      "Only JPG and PNG images are allowed."
    );

    event.target.value = "";

    return;
  }

  if (file.size > 2 * 1024 * 1024) {

    showError(
      "Image size should not exceed 2MB."
    );

    event.target.value = "";

    return;
  }

  setPhoto(file);

  setPreview(
    URL.createObjectURL(file)
  );

};








// UPDATE PROFILE

const handleProfileUpdate = async (data) => {

  try {

    setSaving(true);

    setError("");


    const formData = new FormData();


    formData.append(
      "FullName",
      data.fullName
    );


    formData.append(
      "Email",
      data.email
    );


    if (photo) {

      formData.append(
        "photo",
        photo
      );

    }



    // Update backend

    await updateProfile(
      formData
    );



    // Get latest profile data from backend

    const updatedProfile =
      await fetchProfile();



    // Update Navbar data immediately

    dispatch(
      updateUser({

        FullName:
          updatedProfile.FullName,

        Email:
          updatedProfile.Email,

        Photo:
          updatedProfile.Photo,

        Role:
          updatedProfile.Role,

      })
    );



    showSuccess(
      "Profile updated successfully"
    );



    // Refresh profile page data

    loadProfile();


  }
  catch(error) {


    setError(

      error.message ||
      "Profile update failed"

    );


  }
  finally {


    setSaving(false);


  }


};






  // CHANGE PASSWORD

  const handlePasswordUpdate = async(data)=>{


    if(!data.currentPassword){


      showError(
        "Current password is required"
      );


      return;

    }



    if(!data.newPassword){


      showError(
        "New password is required"
      );


      return;

    }



    if(
      data.newPassword.length < 6
    ){


      showError(
        "Minimum 6 characters required"
      );


      return;

    }



    if(
      data.newPassword !==
      data.confirmPassword
    ){


      showError(
        "Passwords do not match"
      );


      return;

    }




    try{


      setPasswordSaving(true);



      await updatePassword({

        currentPassword:
        data.currentPassword,


        newPassword:
        data.newPassword

      });




      showSuccess(
        "Password updated successfully"
      );


    }
    catch(error){


      showError(
  error.response?.data?.message ||
  "Password update failed."
);


    }
    finally{


      setPasswordSaving(false);


    }


  };






  if(loading){

    return <Loader/>;

  }
    return (

    <div>


      <div className="mb-6">


        <h1
          className="
          text-2xl
          font-bold
          text-gray-800
          "
        >

          My Profile

        </h1>


        <div className="mt-2">

          <Breadcrumbs

            items={[
              "Home",
              "Profile"
            ]}

          />

        </div>


      </div>





      {
        error && (

          <div

            className="
            mb-4
            rounded
            border
            border-red-200
            bg-red-50
            p-3
            text-sm
            text-red-600
            "

          >

            {error}

          </div>

        )
      }






      {/* PROFILE SECTION */}


      <div

        className="
        grid
        grid-cols-1
        xl:grid-cols-4
        gap-5
        "

      >






        {/* PHOTO CARD */}


        <Card

          className="
          p-5
          xl:col-span-1
          "

        >


          <h2

            className="
            text-sm
            font-semibold
            text-gray-700
            mb-5
            "

          >

            Profile Photo

          </h2>





          <div

            className="
            flex
            flex-col
            items-center
            "

          >



            <Avatar

              image={preview}

              name={
                profile?.FullName
              }

              className="
              w-24
              h-24
              text-3xl
              "

            />





            <label

              className="
              mt-4
              text-orange-500
              text-sm
              font-medium
              cursor-pointer
              "

            >

              Change Photo


              <input

                type="file"

                accept="image/*"

                hidden

                onChange={handlePhoto}

              />


            </label>




            <p

              className="
              mt-2
              text-xs
              text-gray-400
              "

            >

              PNG, JPG up to 2MB

            </p>



          </div>



        </Card>








        {/* PROFILE DETAILS CARD */}


        <Card

          className="
          p-6
          xl:col-span-3
          "

        >



          <form

            onSubmit={
              handleSubmit(
                handleProfileUpdate
              )
            }


            className="
            space-y-5
            "

          >



            <div

              className="
              grid
              grid-cols-1
              md:grid-cols-2
              gap-5
              "

            >




              <Input

                label="Full Name"

                placeholder="Enter full name"


                error={
                  errors.fullName?.message
                }


                {...register(
                  "fullName",
                  {

                    required:
                    "Full name is required",


                    minLength:{

                      value:3,

                      message:
                      "Minimum 3 characters required"

                    }

                  }
                )}

              />






              <Input

                label="Email"

                placeholder="Enter email"


                error={
                  errors.email?.message
                }


                {...register(
                  "email",
                  {


                    required:
                    "Email is required",


                    pattern:{

                      value:
                      /^\S+@\S+$/i,


                      message:
                      "Enter valid email"

                    }


                  }
                )}

              />



            </div>






            <div

              className="
              flex
              justify-end
              pt-3
              "

            >



              <Button

                type="submit"

                disabled={saving}

              >


                {
                  saving
                  ?
                  "Updating..."
                  :
                  "Update Profile"
                }


              </Button>


            </div>



          </form>



        </Card>



      </div>









      {/* PASSWORD SECTION */}



      <Card

        className="
        p-6
        mt-5
        "

      >



        <form

          onSubmit={
            handleSubmit(
              handlePasswordUpdate
            )
          }


          className="
          space-y-5
          "

        >



          <h2

            className="
            text-sm
            font-semibold
            text-gray-700
            "

          >

            Change Password

          </h2>





          <div

            className="
            grid
            grid-cols-1
            md:grid-cols-3
            gap-5
            "

          >





            <Input

              label="Current Password"

              type="password"

              placeholder="Enter current password"


              {...register(
                "currentPassword"
              )}

            />







            <Input

              label="New Password"

              type="password"

              placeholder="Enter new password"


              error={
                errors.newPassword?.message
              }


              {...register(
                "newPassword",
                {

                  minLength:{

                    value:6,

                    message:
                    "Minimum 6 characters required"

                  }

                }
              )}

            />







            <Input

              label="Confirm Password"

              type="password"

              placeholder="Confirm password"


              error={
                errors.confirmPassword?.message
              }



              {...register(
                "confirmPassword",
                {

                  validate:

                  value =>

                  !newPassword ||

                  value === newPassword ||

                  "Passwords do not match"


                }
              )}


            />



          </div>







          <div

            className="
            flex
            justify-end
            pt-3
            "

          >



            <Button

              type="submit"

              disabled={passwordSaving}

            >


              {
                passwordSaving
                ?
                "Updating..."
                :
                "Change Password"
              }



            </Button>



          </div>





        </form>




      </Card>






    </div>

  );

}


export default Profile;