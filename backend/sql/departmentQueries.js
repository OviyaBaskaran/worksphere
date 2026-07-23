export const getAllDepartmentsQuery = `
    SELECT
        DepartmentId,
        DepartmentName
    FROM Departments
    ORDER BY DepartmentName ASC;
`;

export const getDepartmentByIdQuery = `
    SELECT
        DepartmentId,
        DepartmentName
    FROM Departments
    WHERE DepartmentId = ?;
`;

export const createDepartmentQuery = `
    INSERT INTO Departments
    (
        DepartmentName
    )
    VALUES (?);
`;

export const updateDepartmentQuery = `
    UPDATE Departments
    SET
        DepartmentName = ?
    WHERE DepartmentId = ?;
`;

export const deleteDepartmentQuery = `
    DELETE FROM Departments
    WHERE DepartmentId = ?;
`;