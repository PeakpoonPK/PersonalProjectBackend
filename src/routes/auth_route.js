const express = require('express');
const auth_Controller = require('../controllers/auth_controller')

const router = express.Router();

router.post('/register', auth_Controller.register)
router.post('/login', auth_Controller.login)

module.exports = router;