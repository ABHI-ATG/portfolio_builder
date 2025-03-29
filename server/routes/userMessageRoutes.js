const express = require('express');
const { insertMessage,getMessage } = require('../controllers/userMessageController');
const { default: verifyToken } = require('../middlewares/authMiddleware');


const router = express.Router();

// Routes
router.post('/',insertMessage);
router.get('/get',verifyToken,getMessage);

module.exports = router;
