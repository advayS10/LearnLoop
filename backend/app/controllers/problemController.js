const pool = require('../config/db');

exports.addProblem = async (req, res) => {
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
};

exports.getAllProblems = async (req, res) => {
    try {
        const result = await pool.query(
            "SELECT * FROM problems ORDER BY date DESC"
        );
        res.json(result.rows);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Failed to fetch problems" });
    }
};

exports.updateProblem = async (req, res) => {
    const { id } = req.params;
    const { problem_name, problem_link, topic, difficulty } = req.body;

    try {
        const result = await pool.query(
            `UPDATE problems
             SET problem_name = $1, problem_link = $2, topic = $3, difficulty = $4
             WHERE id = $5
             RETURNING *`,
            [problem_name, problem_link, topic, difficulty, id]
        );
        res.json(result.rows[0]);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Failed to update problem" });
    }
};

exports.deleteProblem = async (req, res) => {
    const { id } = req.params;

    try {
        await pool.query(
            "DELETE FROM problems WHERE id = $1",
            [id]
        );
        res.json({ message: "Problem deleted successfully" });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Failed to delete problem" });
    }
};

exports.getTodaysProblems = async (req, res) => {
    try {
        const result = await pool.query(
            `SELECT id, problem_name, problem_link, topic, difficulty, revision_id, created_date::TEXT, revision_date::TEXT 
            FROM problems 
            WHERE revision_date = CURRENT_DATE 
            ORDER BY created_date DESC`
        );
        res.json(result.rows);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Failed to fetch today's problems" });
    }
};