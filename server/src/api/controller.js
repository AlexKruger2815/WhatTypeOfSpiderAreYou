const pool = require("../database_connection");
const queries = require("./queries")

const getQuestions = (req, res) => {
    pool.query(queries.getQuestionsQuery, (error, results) => {
        if (error) throw error;
        res.status(200).json(results.rows);
    });
};

const getSpiders = (req, res) => {
    pool.query(queries.getSpidersQuery, (error, results) => {
        if (error) throw error;
        res.status(200).json(results.rows);
    });
};

module.exports = {
    getQuestions,
    getSpiders,
};