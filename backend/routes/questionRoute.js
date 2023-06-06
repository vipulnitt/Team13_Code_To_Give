const express = require("express");
const router = express.Router();
const questionController = require("../controllers/questionController");

router.get("/addQuestion", questionController.createQuestion);
router.get("/questions", questionController.questions);
module.exports = router;
