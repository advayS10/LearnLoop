const express = require('express');
const router = express.Router();
const pool = require('../config/db');

router.get('/', (req, res) => {
  res.send('Welcome to the Problems API!');
});

router.post('/addProblem', async (req, res) => {
    const { problem_name, problem_link, topic, difficulty } = req.body;

    try {
        const result = await pool.query(
            `INSERT INTO problems (problem_name, problem_link, topic, difficulty)
             VALUES ($1, $2, $3, $4)
             RETURNING *`,
            [problem_name, problem_link, topic, difficulty]
        );
        res.status(201).json(result.rows[0]);
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ error: "Failed to add problem" });
    }
});

router.get('/getProblems', async (req, res) => {
    try {
        const result = await pool.query(
            "SELECT * FROM problems ORDER BY date DESC"
        );

        console.log(result);

        res.json(result.rows);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Failed to fetch problems" });
    }
});



module.exports = router;