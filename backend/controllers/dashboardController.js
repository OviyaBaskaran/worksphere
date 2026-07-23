import { getDashboardSummaryService } from "../services/dashboardService.js";

export async function getDashboardSummary(req, res) {

  try {

    const dashboard = await getDashboardSummaryService();

    return res.status(200).json({
      success: true,
      message: "Dashboard data fetched successfully.",
      data: dashboard,
    });

  } catch (error) {

    return res.status(500).json({
      success: false,
      message: error.message,
    });

  }

}