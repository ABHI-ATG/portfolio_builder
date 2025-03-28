const express = require('express');
const { insertData,getData,getData_,update } = require('../controllers/userDataController');
const { default: verifyToken } = require('../middlewares/authMiddleware');

const router = express.Router();

// Routes
router.post('/insert', verifyToken ,insertData);
router.get('/getData', verifyToken ,getData);
router.post('/get',getData_);
router.post('/update',update);

module.exports = router;
