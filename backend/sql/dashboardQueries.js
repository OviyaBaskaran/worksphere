export const getDashboardSummaryQuery = `
    SELECT
        (SELECT COUNT(*) FROM Employees) AS TotalEmployees,
        (SELECT COUNT(*) FROM Departments) AS TotalDepartments,
        (SELECT COUNT(*) FROM Employees WHERE Status = 'Active') AS ActiveEmployees,
        (SELECT COUNT(*) FROM Employees WHERE Status = 'Inactive') AS InactiveEmployees;
`;