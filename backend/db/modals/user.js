// grab db client connection to use with adapters
const client = require("../client");
const bcrypt = require("bcrypt");
const SALT_COUNT = 10;

async function createUser({ firstName, lastName, email, password, isAdmin }) {
  const hashedPassword = await bcrypt.hash(password, SALT_COUNT);
  try {
    const {
      rows: [user],
    } = await client.query(
      `
        INSERT INTO users("firstName", "lastName", email, password, "isAdmin") 
        VALUES($1, $2, $3, $4, $5) 
        ON CONFLICT (email) DO NOTHING 
        RETURNING *;
      `,
      [firstName, lastName, email, hashedPassword, isAdmin]
    );

    if (user) {
      delete user.password;
    }

    return user;
  } catch (error) {
    throw error;
  }
}

async function getAllUsers() {
  /* this adapter should fetch a list of users from db */
  try {
    const { rows } = await client.query(`
      SELECT *
      FROM users;
    `);

    return rows;
  } catch (error) {
    throw error;
  }
}

async function getUserById(id) {
  /* this adapter should fetch a specific user from db */
  try {
    const {
      rows: [user],
    } = await client.query(`
      SELECT *
      FROM users
      WHERE id=${id};
    `);
    delete user.password;
    return user;
  } catch (error) {
    throw error;
  }
}

async function getUserByEmail(email) {
  try {
    console.log("Email from function: ", email);
    const {
      rows: [user],
    } = await client.query(
      `
      SELECT *
      FROM users
      WHERE email=$1;
    `,
      [email]
    );
    // Do not send the password
    return user;
  } catch (error) {
    throw error;
  }
}

async function updateUser({ id, ...fields }) {
  const setString = Object.keys(fields)
    .map((key, index) => `"${key}"=$${index + 1}`)
    .join(", ");

  const {
    rows: [user],
  } = await client.query(
    `
  UPDATE users
  SET ${setString}
  WHERE id=${id}
  RETURNING *;
  `,
    Object.values(fields)
  );
  return user;
}

async function deleteUser(id) {
  await client.query(`
  DELETE FROM users WHERE id=${id};
  `);
  const {
    rows: [user],
  } = await client.query(`
  DELETE FROM users WHERE id=${id}
  RETURNING *;
  `);
  return user;
}

module.exports = {
  getAllUsers,
  createUser,
  updateUser,
  deleteUser,
  getUserById,
  getUserByEmail,
};
