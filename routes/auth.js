const express = require('express');
const router = express.Router();
const authController = require('../controllers/auth');

router.post('/signUp', (req, res) => {
    authController.signUp
});
router.post('/login', (req, res) => {
    authController.login
});

exports.router = router;