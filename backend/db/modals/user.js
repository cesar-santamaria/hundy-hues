// grab our db client connection to use with our adapters
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
