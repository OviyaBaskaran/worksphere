export const getDashboardSummaryQuery = `
    SELECT
        (SELECT COUNT(*) FROM Employees) AS TotalEmployees,
        (SELECT COUNT(*) FROM Departments) AS TotalDepartments,
        (SELECT COUNT(*) FROM Employees WHERE Status = 'Active') AS ActiveEmployees,
        (SELECT COUNT(*) FROM Employees WHERE Status = 'Inactive') AS InactiveEmployees;
`;

export const getRecentEmployeesQuery = `
SELECT
    e.EmployeeId,
    e.FullName,
    e.Photo,
    d.DepartmentName,
    e.Designation,
    e.Status
FROM Employees e
INNER JOIN Departments d
    ON e.DepartmentId = d.DepartmentId
ORDER BY e.EmployeeId DESC
LIMIT 5;
`;