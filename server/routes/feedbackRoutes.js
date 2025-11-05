const express = require("express");
const { sendFeedback } = require("../controllers/feedbackController");
const router = express.Router();

router.post('/send', sendFeedback);

module.exports = router;


