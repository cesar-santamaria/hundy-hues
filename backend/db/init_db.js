// const { client } = require("./index.js");
import { query, end } from "../db/client";
import { createUser, createProduct } from "../db";

import { products } from "./productList.json";

async function buildTables() {
  try {
    console.log("Starting to build tables...");

    await query(`
            DROP TABLE IF EXISTS order_items;
            DROP TABLE IF EXISTS orders;
            DROP TABLE IF EXISTS reviews;
            DROP TABLE IF EXISTS favorite;
            DROP TABLE IF EXISTS products CASCADE;
            DROP TABLE IF EXISTS users CASCADE;
        `);

    await query(`
        CREATE TABLE IF NOT EXISTS products (
            id SERIAL PRIMARY KEY,
            title varchar(255) NOT NULL,
            description text NOT NULL,
            price decimal(10,2) NOT NULL,
            quantity integer NOT NULL,
            category varchar(255) NOT NULL,
            type varchar(255) NOT NULL,
            images TEXT[] NOT NULL,
            dimensions JSONB,
            features JSONB,
            "stripePrice" varchar(255) NOT NULL
          );
    
          CREATE TABLE IF NOT EXISTS users (
            id SERIAL PRIMARY KEY,
            "firstName" VARCHAR(255) NOT NULL,
            "lastName" VARCHAR(255) NOT NULL,
            email VARCHAR(255) UNIQUE NOT NULL,
            password VARCHAR(255) NOT NULL,
            "isAdmin" BOOLEAN DEFAULT false
          );
    
          CREATE TABLE IF NOT EXISTS orders (
            id SERIAL PRIMARY KEY,
            "userId" INTEGER REFERENCES users(id),
            "orderDate" DATE DEFAULT CURRENT_DATE,
            "isCheckedOut" BOOLEAN DEFAULT false,
            "checkoutDate" VARCHAR(255),
            "checkoutSum" DECIMAL (10,2)
          );

          CREATE TABLE IF NOT EXISTS order_items (
            id SERIAL PRIMARY KEY,
            "orderId" INTEGER REFERENCES orders(id),
            "productId" INTEGER REFERENCES products(id),
            quantity INTEGER NOT NULL
          );
    
          CREATE TABLE IF NOT EXISTS reviews (
            id SERIAL PRIMARY KEY,
            "productId" INTEGER REFERENCES products(id),
            "userId" INTEGER REFERENCES users(id),
            title text NOT NULL,
            description text NOT NULL,
            rating INTEGER NOT NULL
          );
    
        
          CREATE TABLE IF NOT EXISTS favorite (
            id SERIAL PRIMARY KEY,
            "productId" INTEGER REFERENCES products(id),
            "userId" INTEGER REFERENCES users(id)
          );
        `);

    console.log("Finished building tables!");
  } catch (error) {
    console.error("Error building tables!");
    throw error;
  }
}

async function populateInitialData() {
  console.log("Starting to create users...");
  try {
    await createUser({
      firstName: "Cesar",
      lastName: "Santamaria",
      email: "cesarsanta@gmail.com",
      password: "123456789",
      isAdmin: true,
    });
    console.log("User created successfully!");

    console.log("Starting to create Products...");

    await Promise.all(
      products.map(async (product) => {
        await createProduct(product);
      })
    );

    console.log("Products created successfully!");
  } catch (error) {
    console.error("Error creating user!");
    throw error;
  }
}
buildTables()
  .then(populateInitialData)
  .catch(console.error)
  .finally(() => end());
