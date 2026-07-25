import pool from "../config/db.js";

import {
  getDashboardSummaryQuery,getRecentEmployeesQuery
} from "../sql/dashboardQueries.js";

export async function getDashboardSummaryService() {

  const [summaryRows] = await pool.execute(
    getDashboardSummaryQuery
  );


  const [recentEmployees] = await pool.execute(
    getRecentEmployeesQuery
  );


  return {
    ...summaryRows[0],
    RecentEmployees: recentEmployees,
  };

}