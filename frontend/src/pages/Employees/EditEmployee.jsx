import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";

import Breadcrumbs from "../../components/ui/Breadcrumbs";
import Input from "../../components/ui/Input";
import Select from "../../components/ui/Select";
import Button from "../../components/ui/Button";
import Loader from "../../components/ui/Loader";

import {
  fetchDepartments,
} from "../../services/departmentService";

import {
  fetchEmployeeById,
  editEmployee,
} from "../../services/employeeService";
import {
  showSuccess,
  showError,
} from "../../utils/toast";

function EditEmployee() {

  const navigate = useNavigate();

  const { id } = useParams();

  const [departments, setDepartments] = useState([]);

  const [loading, setLoading] = useState(true);

  const [photo, setPhoto] = useState(null);

  const [photoPreview, setPhotoPreview] = useState("");

  const [error, setError] = useState("");

  const {
    register,
    handleSubmit,
    reset,
    formState: {
      errors,
    },
  } = useForm({

    defaultValues: {
      Status: "Active",
    },

  });

  useEffect(() => {

    loadPage();

  }, [id]);

  const loadPage = async () => {

    try {

      setLoading(true);

      const [
        departmentResponse,
        employeeResponse,
      ] = await Promise.all([
        fetchDepartments(),
        fetchEmployeeById(id),
      ]);

      setDepartments(
        departmentResponse.data.data
      );

      const employee =
        employeeResponse.data.data;

      reset({

        EmployeeCode:
          employee.EmployeeCode,

        FullName:
          employee.FullName,

        Email:
          employee.Email,

        Phone:
          employee.Phone,

        DepartmentId:
          employee.DepartmentId,

        Designation:
          employee.Designation,

        Salary:
          employee.Salary,

        JoiningDate:
          employee.JoiningDate
            ? employee.JoiningDate.split("T")[0]
            : "",

        Status:
          employee.Status,

      });

      if (employee.Photo) {

  setPhotoPreview(
    `${import.meta.env.VITE_API_URL.replace("/api", "")}/${employee.Photo}`
  );

}

    }
    catch (error) {

  const message =
    error.response?.data?.message ||
    "Failed to load employee.";

  setError(message);

  showError(message);

}
    finally {

      setLoading(false);

    }

  };

const handlePhotoChange = (e) => {

  const file = e.target.files[0];


  if (!file) {
    return;
  }


  // Check image type

  if (
    file.type !== "image/png" &&
    file.type !== "image/jpeg" &&
    file.type !== "image/jpg"
  ) {

    showError(
      "Only JPG and PNG images are allowed."
    );

    e.target.value = null;

    return;

  }



  // Check image size (2MB)

  if (file.size > 2 * 1024 * 1024) {

    showError(
      "Image size should be less than 2MB."
    );

    e.target.value = null;

    return;

  }



  setPhoto(file);


  // For EditEmployee preview

  if (setPhotoPreview) {

    setPhotoPreview(
      URL.createObjectURL(file)
    );

  }

};

const onSubmit = async (data) => {

  try {

    const formData = new FormData();


    formData.append(
      "employeeCode",
      data.EmployeeCode
    );

    formData.append(
      "fullName",
      data.FullName
    );

    formData.append(
      "email",
      data.Email
    );

    formData.append(
      "phone",
      data.Phone || ""
    );

    formData.append(
      "departmentId",
      data.DepartmentId
    );

    formData.append(
      "designation",
      data.Designation
    );

    formData.append(
      "salary",
      data.Salary
    );

    formData.append(
      "joiningDate",
      data.JoiningDate
    );

    formData.append(
      "status",
      data.Status
    );


    if(photo){

      formData.append(
        "photo",
        photo
      );

    }



    await editEmployee(
      id,
      formData
    );


    showSuccess(
      "Employee updated successfully."
    );


    navigate("/employees");


  }
  catch(error){


    const message =

      error.response?.data?.message ||

      "Failed to update employee.";


    showError(message);


  }

};

  if (loading) {

    return <Loader />;

  }

  return (

    <div>

      <div className="mb-5">

        <h1
          className="
          text-xl
          font-semibold
          text-gray-800
          "
        >
          Edit Employee
        </h1>

        <Breadcrumbs
          items={[
            "Home",
            "Employees",
            "Edit Employee",
          ]}
        />

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

      <div
        className="
        bg-white
        border
        border-gray-200
        rounded-lg
        p-5
        "
      >

        <form

          onSubmit={handleSubmit(onSubmit)}

          className="
          grid
          grid-cols-12
          gap-5
          "

        >

          {/* PHOTO */}

          <div
            className="
            col-span-12
            md:col-span-3
            "
          >

            <label
              className="
              text-xs
              font-semibold
              text-gray-600
              "
            >
              Profile Photo
            </label>

            <label
              className="
              mt-3
              h-40
              border
              border-dashed
              border-gray-300
              rounded-lg
              flex
              flex-col
              items-center
              justify-center
              cursor-pointer
              hover:border-orange-500
              overflow-hidden
              "
            >

              {
                photoPreview ? (

                  <img
                    src={photoPreview}
                    alt="Employee"
                    className="
                    w-full
                    h-full
                    object-cover
                    "
                  />

                ) : (

                  <>

                    <div
                      className="
                      w-10
                      h-10
                      rounded-full
                      bg-gray-100
                      flex
                      items-center
                      justify-center
                      mb-2
                      "
                    >
                      📷
                    </div>

                    <p
                      className="
                      text-xs
                      font-medium
                      text-gray-600
                      "
                    >
                      Upload Photo
                    </p>

                    <p
                      className="
                      text-[11px]
                      text-gray-400
                      "
                    >
                      PNG, JPG up to 2MB
                    </p>

                  </>

                )
              }

              <input
                type="file"
                hidden
                onChange={handlePhotoChange}
              />

            </label>

          </div>

          {/* FORM */}

          <div
            className="
            col-span-12
            md:col-span-9
            grid
            grid-cols-2
            gap-4
            "
          >            <Input

              label="Employee Code"

              placeholder="Enter employee code"

              error={
                errors.EmployeeCode?.message
              }

              {...register(
                "EmployeeCode",
                {
                  required: "Employee code is required",
                }
              )}

            />

            <Input

              label="Full Name"

              placeholder="Enter full name"

              error={
                errors.FullName?.message
              }

              {...register(
                "FullName",
                {
                  required: "Full name is required",
                }
              )}

            />

            <Input

              label="Email"

              placeholder="Enter email"

              error={
                errors.Email?.message
              }

              {...register(
                "Email",
                {
                  required: "Email is required",

                  pattern: {
                    value: /^\S+@\S+$/i,
                    message: "Enter valid email",
                  },

                }
              )}

            />

            <Input

              label="Phone"

              placeholder="Enter phone number"

              {...register("Phone")}

            />

            <Select

              label="Department"

              placeholder="Select Department"

              options={
                departments.map((department) => ({
                  label: department.DepartmentName,
                  value: department.DepartmentId,
                }))
              }

              error={
                errors.DepartmentId?.message
              }

              {...register(
                "DepartmentId",
                {
                  required: "Department is required",
                }
              )}

            />

            <Input

              label="Designation"

              placeholder="Enter designation"

              error={
                errors.Designation?.message
              }

              {...register(
                "Designation",
                {
                  required: "Designation is required",
                }
              )}

            />

            <Input

              label="Salary"

              type="number"

              placeholder="Enter salary"

              error={
                errors.Salary?.message
              }

              {...register(
                "Salary",
                {
                  required: "Salary is required",

                  min: {
                    value: 1,
                    message: "Salary must be greater than 0",
                  },

                }
              )}

            />

            <Input

              label="Joining Date"

              type="date"

              error={
                errors.JoiningDate?.message
              }

              {...register(
                "JoiningDate",
                {
                  required: "Joining date is required",
                }
              )}

            />

            <div>

              <label
                className="
                text-xs
                font-semibold
                text-gray-600
                "
              >
                Status
              </label>

              <div
                className="
                flex
                gap-6
                mt-3
                "
              >

                <label className="text-sm">

                  <input

                    type="radio"

                    value="Active"

                    {...register("Status")}

                  />

                  <span className="ml-2">

                    Active

                  </span>

                </label>

                <label className="text-sm">

                  <input

                    type="radio"

                    value="Inactive"

                    {...register("Status")}

                  />

                  <span className="ml-2">

                    Inactive

                  </span>

                </label>

              </div>

            </div>
                        <div
              className="
              col-span-2
              flex
              justify-end
              gap-3
              mt-3
              "
            >

              <Button type="submit">

                Update Employee

              </Button>

              <Button

                type="button"

                onClick={() =>
                  navigate("/employees")
                }

              >

                Cancel

              </Button>

            </div>

          </div>

        </form>

      </div>

    </div>

  );

}

export default EditEmployee;