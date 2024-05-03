const { Router } = require('express');
const controller = require("./controller");
const router = Router();

router.get("/questions",  controller.getQuestions);
router.get("/spiders",  controller.getSpiders);

module.exports = router;