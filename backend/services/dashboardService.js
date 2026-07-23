import pool from "../config/db.js";

import {
  getDashboardSummaryQuery,
} from "../sql/dashboardQueries.js";

export async function getDashboardSummaryService() {

  const [rows] = await pool.execute(
    getDashboardSummaryQuery
  );

  return rows[0];

}