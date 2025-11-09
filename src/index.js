import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import pool from "./config/db.js";



dotenv.config();

const app = express();
const port = process.env.PORT || 5001;



//Middleware
app.use(cors());
app.use(express.json());

//Routes
app.get("/", (req, res) => {
  res.send("Hello World");
});

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
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something broke!");
});

//Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});