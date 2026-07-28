import bcrypt from "bcrypt";

import pool from "../config/db.js";

import {
  getUserProfileQuery,
  updateUserProfileQuery,
  getUserPasswordQuery,
  updateUserPasswordQuery,
} from "../sql/profileQueries.js";

export async function getUserProfileService(adminId) {

  const [rows] = await pool.execute(
    getUserProfileQuery,
    [adminId]
  );

  return rows[0];

}

export async function updateUserProfileService(
  adminId,
  fullName,
  email,
  photo
) {


  let query;
  let values;



  if(photo){


    query = `

    UPDATE Admins

    SET
      FullName = ?,
      Email = ?,
      Photo = ?,
      UpdatedAt = CURRENT_TIMESTAMP

    WHERE AdminId = ?

    `;


    values = [
      fullName,
      email,
      photo,
      adminId
    ];


  }
  else{


    query = `

    UPDATE Admins

    SET
      FullName = ?,
      Email = ?,
      UpdatedAt = CURRENT_TIMESTAMP

    WHERE AdminId = ?

    `;


    values = [
      fullName,
      email,
      adminId
    ];


  }




  const [result] =
    await pool.execute(
      query,
      values
    );


  return result.affectedRows;

}

export async function changePasswordService(
  adminId,
  currentPassword,
  newPassword
) {

  const [rows] = await pool.execute(
    getUserPasswordQuery,
    [adminId]
  );

  if (rows.length === 0) {

    throw new Error("Admin not found.");

  }

  const isMatch = await bcrypt.compare(
    currentPassword,
    rows[0].PasswordHash
  );

  if (!isMatch) {

    throw new Error("Current password is incorrect.");

  }

  const hashedPassword =
    await bcrypt.hash(newPassword, 10);

  const [result] = await pool.execute(
    updateUserPasswordQuery,
    [
      hashedPassword,
      adminId,
    ]
  );

  return result.affectedRows;

}