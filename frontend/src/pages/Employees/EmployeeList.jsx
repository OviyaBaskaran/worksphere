import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Breadcrumbs from "../../components/ui/Breadcrumbs";
import Input from "../../components/ui/Input";
import Select from "../../components/ui/Select";
import Button from "../../components/ui/Button";
import Pagination from "../../components/ui/Pagination";
import Loader from "../../components/ui/Loader";

import EmployeeTable from "../../components/employee/EmployeeTable";

import { fetchEmployees } from "../../services/employeeService";
import { fetchDepartments } from "../../services/departmentService";

function Employees() {
  const navigate = useNavigate();
  
  const [employees, setEmployees] = useState([]);

  const [departments, setDepartments] = useState([]);

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState("");

  const [search, setSearch] = useState("");

  const [debouncedSearch, setDebouncedSearch] = useState("");

  const [department, setDepartment] = useState("");

  const [currentPage, setCurrentPage] = useState(1);
const [status, setStatus] = useState("");

const [pagination, setPagination] = useState({
  currentPage: 1,
  totalPages: 1,
  totalRecords: 0,
  limit: 10,
});


useEffect(() => {

  loadData();

}, [debouncedSearch, department, status, currentPage]);



  const loadData = async () => {

    try {

      setLoading(true);

      const [employeeResponse, departmentResponse] =
  await Promise.all([
    fetchEmployees({
      search: debouncedSearch,
      department,
      status,
      page: currentPage,
      limit: 10,
    }),
    fetchDepartments(),
  ]);

      setEmployees(employeeResponse.data.data);
      setPagination(employeeResponse.data.pagination);

      setDepartments(departmentResponse.data.data);

    } catch (error) {

      setError(
        error.response?.data?.message ||
        "Failed to load data."
      );

    } finally {

      setLoading(false);

    }

  };

  useEffect(() => {

  const timer = setTimeout(() => {

    setDebouncedSearch(search);

  }, 500);

  return () => clearTimeout(timer);

}, [search]);

    useEffect(() => {

  setCurrentPage(1);

}, [debouncedSearch, department, status]);

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
            flex-col
            md:flex-row
            gap-4
            md:items-center
            md:justify-between
          "
        >

          {/* Search */}

          <div
            className="
              w-full
              md:w-72
              lg:w-96
            "
          >

            <Input
              placeholder="Search employee..."
              value={search}
              onChange={(e) =>
                setSearch(e.target.value)
              }
            />

          </div>



          {/* Right */}

          <div
            className="
              flex
              flex-col
              sm:flex-row
              gap-3
              w-full
              md:w-auto
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
                  label: department.DepartmentName,
                  value: department.DepartmentId,
                })
              )}
            />
<Select
  placeholder="All Status"
  value={status}
  onChange={(e) => setStatus(e.target.value)}
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
            <Button onClick={() => navigate("/employees/add")}>

              + Add Employee

            </Button>

          </div>

        </div>

      </div>



      {/* Table */}

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