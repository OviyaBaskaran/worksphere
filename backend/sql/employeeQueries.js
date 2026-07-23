export const getAllEmployeesQuery = `
SELECT
    e.EmployeeId,
    e.EmployeeCode,
    e.FullName,
    e.Email,
    e.Phone,
    d.DepartmentName,
    e.Designation,
    e.Salary,
    e.JoiningDate,
    e.Status,
    e.Photo
FROM Employees e
INNER JOIN Departments d
ON e.DepartmentId = d.DepartmentId
ORDER BY e.EmployeeId DESC;
`;

export const getAllEmployeebyIdQuery = `
    SELECT 
        e.EmployeeId,
        e.EmployeeCode,
        e.FullName,
        e.Email,
        e.Phone,
        d.DepartmentName,
        e.Designation,
        e.Salary,
        e.JoiningDate,
        e.Status,
        e.Photo
    FROM Employees e
    LEFT JOIN Departments d
    ON e.DepartmentId = d.DepartmentId
    WHERE e.EmployeeId = ?;
`;
export const createEmployeeQuery = `
    INSERT INTO Employees
    (
        EmployeeCode,
        FullName,
        Email,
        Phone,
        DepartmentId,
        Designation,
        Salary,
        JoiningDate,
        Status,
        Photo
    )
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?);
`;

export const updateEmployeeQuery = `
    UPDATE Employees
    SET
        FullName = ?,
        Email = ?,
        Phone = ?,
        DepartmentId = ?,
        Designation = ?,
        Salary = ?,
        JoiningDate = ?,
        Status = ?,
        Photo = ?
    WHERE EmployeeId = ?;
`;

export const deleteEmployeeQuery = `
    DELETE FROM Employees
    WHERE EmployeeId = ?;
`;

