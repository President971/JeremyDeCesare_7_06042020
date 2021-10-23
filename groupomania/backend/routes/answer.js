//Imports
const express = require('express');
const router = express.Router();
const answerCtrl = require('../controllers/answer');
const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config');

//Routage
router.post("/create", auth, multer, answerCtrl.create);
router.delete("/delete", answerCtrl.delete)
router.get("/", auth, answerCtrl.listMsg);

module.exports = router; 