const express = require('express');
const authController = require('./../controllers/authController');
const bodyParser = require('body-parser');

const router = express.Router();
const jsonParser = bodyParser.json();

router.post('/signup', jsonParser, authController.signup);
router.post('/login', jsonParser, authController.login);

router.use(authController.protect); //this will protect all routes coming after this point

module.exports = router;