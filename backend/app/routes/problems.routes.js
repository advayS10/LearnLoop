const express = require('express');
const router = express.Router();
const pool = require('../config/db');
const { 
    addProblem, 
    getAllProblems,
    updateProblem,
    deleteProblem,
    getTodaysProblems,
    revisionDone
} = require('../controllers/problemController');

router.get('/', (req, res) => {
  res.send('Welcome to the Problems API!');
});

router.post('/addProblem', addProblem);

router.get('/getAllProblems', getAllProblems);

router.put('/updateProblem/:id', updateProblem);

router.delete('/deleteProblem/:id', deleteProblem);

router.get('/getTodaysProblems', getTodaysProblems);

router.patch('/revisionDone/:id', revisionDone);

module.exports = router;