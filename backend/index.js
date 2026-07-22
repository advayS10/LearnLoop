const express = require("express");
const dotenv = require("dotenv");

const port = 3000;

dotenv.config();

const app = express();

app.use(express.json());

const pool = require("./app/config/db");

const problemsRoutes = require("./app/routes/problems.routes");

app.use("/problems", problemsRoutes);

app.post("/posts", async (req, res) => {
  
  const { title, content } = req.body;

  try {
    const result = await pool.query(
      `INSERT INTO posts (title, content)
       VALUES ($1, $2)
       RETURNING *`,
      [title, content]
    );

    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to create post" });
  }
});

app.get("/posts", async (req, res) => {
  try {
    const result = await pool.query(
      "SELECT * FROM posts ORDER BY created_at DESC"
    );

    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch posts" });
  }
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
