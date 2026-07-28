export const getUserProfileQuery = `
    SELECT
        AdminId,
        FullName,
        Email,
        Photo,
        Role,
        IsActive
    FROM Admins
    WHERE AdminId = ?;
`;

export const updateUserProfileQuery = `
    UPDATE Admins
    SET
        FullName = ?,
        Email = ?,
        UpdatedAt = CURRENT_TIMESTAMP
    WHERE AdminId = ?;
`;

export const getUserPasswordQuery = `
    SELECT
        PasswordHash
    FROM Admins
    WHERE AdminId = ?;
`;

export const updateUserPasswordQuery = `
    UPDATE Admins
    SET
        PasswordHash = ?,
        UpdatedAt = CURRENT_TIMESTAMP
    WHERE AdminId = ?;
`;