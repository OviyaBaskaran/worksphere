import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";

import Breadcrumbs from "../../components/ui/Breadcrumbs";
import Input from "../../components/ui/Input";
import Select from "../../components/ui/Select";
import Button from "../../components/ui/Button";
import Loader from "../../components/ui/Loader";
import {
  showSuccess,
  showError,
} from "../../utils/toast";
import {
  fetchDepartments
} from "../../services/departmentService";

import {
  addEmployee
} from "../../services/employeeService";


function AddEmployee() {

  const navigate = useNavigate();

  const [departments, setDepartments] = useState([]);

  const [loading, setLoading] = useState(true);

  const [photo, setPhoto] = useState(null);

  



  const {
    register,
    handleSubmit,
    formState:{
      errors
    }
  } = useForm({

    defaultValues:{
      Status:"Active"
    }

  });




  useEffect(()=>{

    loadDepartments();

  },[]);




  const loadDepartments = async()=>{

    try{

      const response = await fetchDepartments();

      setDepartments(
        response.data.data
      );


    }
    catch(error){

  showError(
    "Failed to load departments"
  );

}
    finally{

      setLoading(false);

    }

  };





  const handlePhotoChange = (e) => {

  const file = e.target.files[0];


  if (!file) return;



  // Allowed image types

  const allowedTypes = [
    "image/jpeg",
    "image/png",
    "image/jpg"
  ];



  if (!allowedTypes.includes(file.type)) {

    showError(
      "Only JPG and PNG images are allowed."
    );

    e.target.value = "";

    return;

  }




  // Maximum size 2MB

  const maxSize = 2 * 1024 * 1024;



  if (file.size > maxSize) {

    showError(
      "Image size should be less than 2MB."
    );

    e.target.value = "";

    return;

  }




  setPhoto(file);


  showSuccess(
    "Image uploaded successfully."
  );


};





  const onSubmit=async(data)=>{

    try{


      const formData=new FormData();



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




      await addEmployee(formData);
      showSuccess(
  "Employee added successfully."
);


      navigate("/employees");


    }
    catch(error){

  const message =
    error.response?.data?.message ||
    "Failed to create employee.";

  showError(message);

}

  };





  if(loading){

    return <Loader/>;

  }





return (

<div>


<div className="mb-5">


<h1 className="
text-xl
font-semibold
text-gray-800
">

Add New Employee

</h1>



<Breadcrumbs

items={[
"Home",
"Employees",
"Add Employee"
]}

/>


</div>





<div className="
bg-white
border
border-gray-200
rounded-lg
p-5
">



<form

onSubmit={
handleSubmit(onSubmit)
}

className="
grid
grid-cols-12
gap-5
"

>



{/* PHOTO */}

<div className="
col-span-12
md:col-span-3
">


<label className="
text-xs
font-semibold
text-gray-600
">

Profile Photo

</label>



<label className="
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
">


<div className="
w-10
h-10
rounded-full
bg-gray-100
flex
items-center
justify-center
mb-2
">

📷

</div>


<p className="
text-xs
font-medium
text-gray-600
">

Upload Photo

</p>


<p className="
text-[11px]
text-gray-400
">

PNG, JPG up to 2MB

</p>



<input

type="file"

hidden

onChange={handlePhotoChange}

/>


</label>


</div>






{/* FORM */}

<div className="
col-span-12
md:col-span-9
grid
grid-cols-2
gap-4
">





<Input

label="Employee Code"

placeholder="Enter employee code"

error={
errors.EmployeeCode?.message
}

{...register(
"EmployeeCode",
{
required:"Employee code is required"
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
required:"Full name is required"
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
required:"Email is required",

pattern:{
value:/^\S+@\S+$/i,
message:"Enter valid email"
}

}
)}

/>






<Input

label="Phone"

placeholder="Enter phone number"

type="tel"

inputMode="numeric"

maxLength={15}

error={errors.Phone?.message}

{...register("Phone", {
  pattern: {
    value: /^\d{10,15}$/,
    message: "Phone number must contain 10 to 15 digits only",
  },
})}

/>







<Select

label="Department"

placeholder="Select Department"

options={
departments.map(
(department)=>({

label:department.DepartmentName,

value:department.DepartmentId

})
)
}

error={
errors.DepartmentId?.message
}

{...register(
"DepartmentId",
{
required:"Department is required"
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
required:"Designation is required"
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
required:"Salary is required",

min:{
value:1,
message:"Salary must be greater than 0"
}

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
required:"Joining date is required"
}
)}

/>






{/* STATUS */}

<div>

<label className="
text-xs
font-semibold
text-gray-600
">

Status

</label>


<div className="
flex
gap-6
mt-3
">


<label className="text-sm">

<input

type="radio"

value="Active"

defaultChecked

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






<div className="
col-span-2
flex
justify-end
gap-3
mt-3
">


<Button type="submit">

Save Employee

</Button>



<Button

type="button"

onClick={()=>
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


export default AddEmployee;
