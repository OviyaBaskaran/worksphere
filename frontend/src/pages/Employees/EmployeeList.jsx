import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import Breadcrumbs from "../../components/ui/Breadcrumbs";
import Select from "../../components/ui/Select";
import Button from "../../components/ui/Button";
import Pagination from "../../components/ui/Pagination";
import Loader from "../../components/ui/Loader";

import EmployeeTable from "../../components/employee/EmployeeTable";

import { fetchEmployees } from "../../services/employeeService";
import { fetchDepartments } from "../../services/departmentService";


function Employees() {

  const navigate = useNavigate();

  const { employeeSearch } = useSelector(
    (state) => state.search
  );

  const [employees, setEmployees] = useState([]);

  const [departments, setDepartments] = useState([]);

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState("");

  const [department, setDepartment] = useState("");

  const [status, setStatus] = useState("");

  const [currentPage, setCurrentPage] = useState(1);

  const [debouncedSearch, setDebouncedSearch] = useState("");

  const [pagination, setPagination] = useState({

    currentPage: 1,

    totalPages: 1,

    totalRecords: 0,

    limit: 10,

  });



  // Debounce global navbar search

  useEffect(() => {

    const timer = setTimeout(() => {

      setDebouncedSearch(employeeSearch);

    }, 500);

    return () => clearTimeout(timer);

  }, [employeeSearch]);



  // Reset page when filters change

  useEffect(() => {

    setCurrentPage(1);

  }, [

    debouncedSearch,

    department,

    status,

  ]);



  // Load data

  useEffect(() => {

    loadData();

  }, [

    debouncedSearch,

    department,

    status,

    currentPage,

  ]);



  const loadData = async () => {

    try {

      setLoading(true);

      setError("");

      const [

        employeeResponse,

        departmentResponse,

      ] = await Promise.all([

        fetchEmployees({

          search: debouncedSearch,

          department,

          status,

          page: currentPage,

          limit: 10,

        }),

        fetchDepartments(),

      ]);

      setEmployees(

        employeeResponse.data.data

      );

      setPagination(

        employeeResponse.data.pagination

      );

      setDepartments(

        departmentResponse.data.data

      );

    }

    catch (error) {

      setError(

        error.response?.data?.message ||

        "Failed to load data."

      );

    }

    finally {

      setLoading(false);

    }

  };



  if (loading) {

    return <Loader />;

  }



  if (error) {

    return (

      <div
        className="
          flex
          flex-col
          items-center
          justify-center
          min-h-[300px]
        "
      >

        <p className="text-red-500 mb-4">

          {error}

        </p>

        <Button onClick={loadData}>

          Retry

        </Button>

      </div>

    );

  }



  return (

    <div>

      {/* Header */}

      <div className="mb-6">

        <h1
          className="
            text-2xl
            font-bold
            text-gray-800
          "
        >

          Employees

        </h1>

        <div className="mt-2">

          <Breadcrumbs

            items={[
              "Home",
              "Employees",
            ]}

          />

        </div>

      </div>



      {/* Filters */}

      <div
        className="
          bg-white
          rounded-xl
          border
          p-4
          mb-6
        "
      >

        <div
          className="
            flex
            justify-end
            flex-wrap
            gap-3
          "
        >

          <Select

            placeholder="All Departments"

            value={department}

            onChange={(e) =>

              setDepartment(e.target.value)

            }

            options={departments.map(

              (department) => ({

                label:

                  department.DepartmentName,

                value:

                  department.DepartmentId,

              })

            )}

          />



          <Select

            placeholder="All Status"

            value={status}

            onChange={(e) =>

              setStatus(e.target.value)

            }

            options={[

              {

                label: "Active",

                value: "Active",

              },

              {

                label: "Inactive",

                value: "Inactive",

              },

            ]}

          />



          <Button

            onClick={() =>

              navigate("/employees/add")

            }

          >

            + Add Employee

          </Button>

        </div>

      </div>



      {/* Employee Table */}

      <EmployeeTable

        employees={employees}

        showActions={true}

        onDelete={loadData}

      />



      {/* Pagination */}

      <Pagination

        currentPage={pagination.currentPage}

        totalPages={pagination.totalPages}

        onPageChange={setCurrentPage}

      />

    </div>

  );

}

export default Employees;