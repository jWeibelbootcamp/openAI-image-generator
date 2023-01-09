const express = require('express');
const { generateImage } = require('../controllers/openaiController');
const router = express.Router();

// .../openai/generateimage
router.post('/generateimage', generateImage);

module.exports = router;