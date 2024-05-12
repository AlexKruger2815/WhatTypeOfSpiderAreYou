const { Router } = require('express');
const controller = require("./controller");
const router = Router();

router.get("/questions",  controller.getQuestions);
router.get("/spiders",  controller.getSpiders);
router.get("/options",  controller.getOptions);
router.get("/spiders/:id",  controller.getSpiderById);
router.get('/form', controller.getForm);

module.exports = router;