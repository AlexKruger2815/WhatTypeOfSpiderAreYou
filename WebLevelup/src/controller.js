const request = require('request');

const apiHost = process.env.BACKEND_SERVER_HOST
const apiPort = process.env.BACKEND_SERVER_PORT

function apiGet(req, res, endpoint) {
  var options = {
    'method': 'GET',
    'url': `http://${apiHost}:${apiPort}/api/${endpoint}`,
    'headers': {
    }
  };
  request(options, function (error, response) {
    if (error) {
      console.log(`Error: ${error}`);
      res.status(500).send("Internal Server Error")
    } else {
      res.status(200).send(response.body);
    }
  });
}

const getQuestions = (req, res) => {
  apiGet(req, res, "questions")
};

const getSpiders = (req, res) => {
  apiGet(req, res, "spiders");
};

const getOptions = (req, res) => {
  apiGet(req, res, "options")
};

const getSpiderById = (req, res) => {
  apiGet(req, res, `spiders/${req.params.id}`)
};

const getForm = async (req, res) => {
  apiGet(req, res, "form")
};

module.exports = {
    getQuestions,
    getSpiders,
    getOptions,
    getSpiderById,
    getForm,
};


