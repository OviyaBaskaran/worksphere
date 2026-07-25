import { useEffect, useState } from "react";

import PageHeader from "../../components/ui/PageHeader";
import StatCard from "../../components/ui/StatCard";
import Loader from "../../components/ui/Loader";
import EmployeeTable from "../../components/employee/EmployeeTable";

import { fetchDashboardSummary } from "../../services/dashboardService";


// React Icons
import {
  FaUsers,
  FaBuilding,
  FaUserCheck,
  FaUserTimes
} from "react-icons/fa";


function Dashboard() {

  const [dashboardData, setDashboardData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");


  useEffect(() => {
    loadDashboard();
  }, []);


  const loadDashboard = async () => {

    try {

      const response = await fetchDashboardSummary();

      setDashboardData(response.data);

    } catch (error) {

  setError(
    error.response?.data?.message ||
    "Failed to load dashboard data"
  );

} finally {

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
        text-center
      "
    >

      <p
        className="
          text-red-500
          font-medium
          mb-3
        "
      >

        {error}

      </p>


      <button

        onClick={loadDashboard}

        className="
          px-4
          py-2
          rounded-lg
          bg-orange-500
          text-white
          text-sm
          hover:bg-orange-600
        "

      >

        Retry

      </button>


    </div>

  );

}
  const recentEmployees =
  dashboardData?.RecentEmployees || [];
  
  const stats = [

    {
      title: "Employees",
      value: dashboardData?.TotalEmployees || 0,
      subtitle: "Total Employees",
      icon: <FaUsers />,
      color: "orange",
    },


    {
      title: "Departments",
      value: dashboardData?.TotalDepartments || 0,
      subtitle: "Total Departments",
      icon: <FaBuilding />,
      color: "blue",
    },


    {
      title: "Active Employees",
      value: dashboardData?.ActiveEmployees || 0,
      subtitle: "Currently Active",
      icon: <FaUserCheck />,
      color: "green",
    },


    {
      title: "Inactive Employees",
      value: dashboardData?.InactiveEmployees || 0,
      subtitle: "Currently Inactive",
      icon: <FaUserTimes />,
      color: "red",
    },

  ];



  return (

    <div>


      <PageHeader
        title="Dashboard"
        description="Overview of your employee management system"
      />



      {/* Statistics Cards */}

      <div
        className="
          grid
          grid-cols-1
          sm:grid-cols-2
          lg:grid-cols-4
          gap-4
          mt-5
        "
      >

        {
          stats.map((item) => (

            <StatCard

              key={item.title}

              title={item.title}

              value={item.value}

              subtitle={item.subtitle}

              icon={item.icon}

              color={item.color}

            />

          ))
        }

      </div>





      {/* Recent Employees */}

      <div
        className="
          mt-6
          bg-white
          rounded-xl
          border
          border-gray-100
          shadow-sm
          p-5
        "
      >


        <div
          className="
            flex
            items-center
            justify-between
            mb-4
          "
        >

          <h2
            className="
              text-sm
              font-semibold
              text-gray-800
            "
          >
            Recent Employees
          </h2>


          <button
            className="
              text-sm
              text-orange-500
              hover:text-orange-600
              font-medium
            "
          >
            View All
          </button>


        </div>



       <EmployeeTable 
 employees={recentEmployees}
/>


      </div>


    </div>

  );

}


export default Dashboard;