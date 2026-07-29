import { useState } from "react";
import { useNavigate } from "react-router-dom";

import Table from "../ui/Table";
import Badge from "../ui/Badge";
import Avatar from "../ui/Avatar";
import ConfirmDialog from "../ui/ConfirmDialog";

import { removeEmployee } from "../../services/employeeService";
import {
  showSuccess,
  showError,
} from "../../utils/toast";
import {
  HiOutlinePencil,
  HiOutlineTrash,
} from "react-icons/hi";

function EmployeeTable({

  employees = [],
  showActions = false,
  onDelete,

}) {

  const navigate = useNavigate();

  const [showDeleteDialog, setShowDeleteDialog] = useState(false);

  const [selectedEmployeeId, setSelectedEmployeeId] = useState(null);

  const handleDelete = async () => {

    if (!selectedEmployeeId) return;

    try {

      await removeEmployee(selectedEmployeeId);

      showSuccess("Employee deleted successfully.");

      setShowDeleteDialog(false);

      setSelectedEmployeeId(null);

      if (onDelete) {

        onDelete();

      }

    } catch (error) {

      setShowDeleteDialog(false);

      setSelectedEmployeeId(null);

      showError(
  error.response?.data?.message ||
  "Failed to delete employee."
);

    }

  };

  return (

    <>

      <Table>

        <thead>

          <tr
            className="
              text-left
              text-xs
              text-gray-500
              uppercase
            "
          >

            <th className="px-5 py-3">
              Employee
            </th>

            <th className="px-5 py-3">
              Department
            </th>

            <th className="px-5 py-3">
              Designation
            </th>

            {

              showActions && (

                <th className="px-5 py-3">
                  Salary
                </th>

              )

            }

            <th className="px-5 py-3">
              Status
            </th>

            {

              showActions && (

                <th className="px-5 py-3">
                  Actions
                </th>

              )

            }

          </tr>

        </thead>

        <tbody className="divide-y divide-gray-100">

          {

            employees.length > 0 ? (

              employees.map((employee) => (

                <tr
                  key={employee.EmployeeId}
                  className="
                    hover:bg-gray-50
                    transition
                  "
                >

                  <td className="px-5 py-4">

                    <div className="flex items-center gap-3">

                      <Avatar
                        name={employee.FullName}
                        image={
  employee.Photo
    ? `${import.meta.env.VITE_API_URL.replace("/api", "")}/${employee.Photo}`
    : null
}
                      />

                      <span
                        className="
                          text-sm
                          font-medium
                          text-gray-800
                        "
                      >

                        {employee.FullName}

                      </span>

                    </div>

                  </td>

                  <td className="px-5 py-4 text-sm text-gray-600">

                    {employee.DepartmentName}

                  </td>

                  <td className="px-5 py-4 text-sm text-gray-600">

                    {employee.Designation}

                  </td>

                  {

                    showActions && (

                      <td className="px-5 py-4 text-sm text-gray-600">

                        ₹{employee.Salary}

                      </td>

                    )

                  }

                  <td className="px-5 py-4">

                    <Badge status={employee.Status} />

                  </td>

                  {

                    showActions && (

                      <td className="px-5 py-4">

                        <div className="flex gap-3">

                          <button
                            onClick={() =>
                              navigate(`/employees/edit/${employee.EmployeeId}`)
                            }
                          >

                            <HiOutlinePencil
                              size={18}
                              className="
                                text-blue-600
                                hover:text-blue-800
                              "
                            />

                          </button>

                          <button
                            onClick={() => {

                              setSelectedEmployeeId(employee.EmployeeId);

                              setShowDeleteDialog(true);

                            }}
                          >

                            <HiOutlineTrash
                              size={18}
                              className="
                                text-red-600
                                hover:text-red-800
                              "
                            />

                          </button>

                        </div>

                      </td>

                    )

                  }

                </tr>

              ))

            ) : (

              <tr>

                <td
                  colSpan={showActions ? 6 : 4}
                  className="
                    py-10
                    text-center
                    text-sm
                    text-gray-400
                  "
                >

                  No employees found

                </td>

              </tr>

            )

          }

        </tbody>

      </Table>

      <ConfirmDialog
        isOpen={showDeleteDialog}
        title="Delete Employee?"
        message="Are you sure you want to delete this employee? This action cannot be undone."
        confirmText="Delete"
        cancelText="Cancel"
        onConfirm={handleDelete}
        onCancel={() => {

          setShowDeleteDialog(false);

          setSelectedEmployeeId(null);

        }}
      />

    </>

  );

}

export default EmployeeTable;