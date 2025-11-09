import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import pool from "./config/db.js";
import userRoutes from "./routes/userRoutes.js";
import errorHandling from "./middleware/errorHandler.js";
import createUserTable from "./data/createUserTable.js";
dotenv.config();

const app = express();
const port = process.env.PORT || 5001;



//Middleware
app.use(cors());
app.use(express.json());

//Routes


// app.get("/", (req, res) => {
//   res.send("Hello World");
// });

app.use("/api", userRoutes);

// 5 JSON Examples for Creating User:
// API URL: http://localhost:5001/api/user (POST)
//
// Example 1:
// URL: http://localhost:5001/api/user
// {
//   "name": "John Doe",
//   "email": "john.doe@example.com"
// }
//
// Example 2:
// URL: http://localhost:5001/api/user
// {
//   "name": "Jane Smith",
//   "email": "jane.smith@example.com"
// }
//
// Example 3:
// URL: http://localhost:5001/api/user
// {
//   "name": "Bob Johnson",
//   "email": "bob.johnson@example.com"
// }
//
// Example 4:
// URL: http://localhost:5001/api/user
// {
//   "name": "Alice Williams",
//   "email": "alice.williams@example.com"
// }
//
// Example 5:
// URL: http://localhost:5001/api/user
// {
//   "name": "Charlie Brown",
//   "email": "charlie.brown@example.com"
// }

// ============================================
// ALL API ENDPOINTS
// ============================================
// Base URL: http://localhost:${port}/api
//
// 1. CREATE USER (POST)
//    URL: http://localhost:${port}/api/user
//    Body: { "name": "John Doe", "email": "john.doe@example.com" }
//
// 2. GET ALL USERS (GET)
//    URL: http://localhost:${port}/api/user
//
// 3. GET USER BY ID (GET)
//    URL: http://localhost:${port}/api/user/:id
//    Example: http://localhost:${port}/api/user/1
//
// 4. UPDATE USER (PUT)
//    URL: http://localhost:${port}/api/user/:id
//    Example: http://localhost:${port}/api/user/1
//    Body: { "name": "Jane Doe", "email": "jane.doe@example.com" }
//
// 5. DELETE USER (DELETE)
//    URL: http://localhost:${port}/api/user/:id
//    Example: http://localhost:${port}/api/user/1
//
// 6. TEST DATABASE CONNECTION (GET)
//    URL: http://localhost:${port}/test-db
// ============================================




//Test the database connection
app.get("/test-db", async (req, res) => {
  try {
    const result = await pool.query("SELECT current_database()");
    res.send(`The database name is : ${result.rows[0].current_database}`);
  } catch (error) {
    console.error("Database query error:", error);
    res.status(500).send(`Database error: ${error.message}`);
  }
});

//Error handling
app.use(errorHandling);

//Create table before starting the server
createUserTable();

//Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});