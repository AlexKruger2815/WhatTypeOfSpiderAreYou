const pool = require("../database_connection");
const queries = require("./queries");

const getQuestions = (req, res) => {
    pool.query(queries.getQuestionsQuery, (error, results) => {
        if (error) {
            console.error('Error executing query', error);
            return res.status(500).json({ error: 'Internal Server Error' });
        }
        if (results.rows.length === 0) {
            return res.status(404).json({ error: 'No questions found' });
        }
        res.status(200).json(results.rows);
    });
};

const getSpiders = (req, res) => {
    pool.query(queries.getSpidersQuery, (error, results) => {
        if (error) {
            console.error('Error executing query', error);
            return res.status(500).json({ error: 'Internal Server Error' });
        }
        if (results.rows.length === 0) {
            return res.status(404).json({ error: 'No spiders found' });
        }
        res.status(200).json(results.rows);
    });
};

const getOptions = (req, res) => {
    pool.query(queries.getOptionsQuery, (error, results) => {
        if (error) {
            console.error('Error executing query', error);
            return res.status(500).json({ error: 'Internal Server Error' });
        }
        if (results.rows.length === 0) {
            return res.status(404).json({ error: 'No options found' });
        }
        res.status(200).json(results.rows);
    });
};

const getSpiderById = (req, res) => {
    const id = parseInt(req.params.id);
    pool.query(queries.getSpiderByIdQuery, [id], (error, results) => {
        if (error) {
            console.error('Error executing query', error);
            return res.status(500).json({ error: 'Internal Server Error' });
        }
        if (results.rows.length === 0) {
            return res.status(404).json({ error: 'Spider not found' });
        }
        res.status(200).json(results.rows[0]);
    });
};

const getForm = async (req, res) => {
    try {
        const client = await pool.connect();
        const questionsQuery = await client.query(queries.getQuestionsQuery);
        const optionsQuery = await client.query(queries.getOptionsQuery);
        
        if (questionsQuery.rows.length === 0 || optionsQuery.rows.length === 0) {
            return res.status(404).json({ error: 'No data found' });
        }
        
        const questions = questionsQuery.rows.map(question => {
            const options = optionsQuery.rows
                .filter(option => parseInt(option.QuestionId) === question.QuestionId)
                .map(option => {
                    return {
                        spiderID: option.SpiderId,
                        option: option.Option
                    };
                });
            
            return {
                question: question.Question,
                options: options
            };
        });
        
        client.release();
        res.json({ questions });
    } catch (err) {
        console.error('Error executing query', err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

module.exports = {
    getQuestions,
    getSpiders,
    getOptions,
    getSpiderById,
    getForm,
};