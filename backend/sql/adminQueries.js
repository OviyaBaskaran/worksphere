export const FIND_ADMIN_BY_EMAIL = `
SELECT *
FROM Admins
WHERE Email = ?;
`;

export const CREATE_ADMIN = `
INSERT INTO Admins
(
    FullName,
    Email,
    PasswordHash
)
VALUES
(
    ?, ?, ?
);
`;

