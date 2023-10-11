const express = require('express');
const auth_Controller = require('../controllers/auth_controller')
const authorizationMiddleware = require('../middleware/authenticated')

const router = express.Router();

router.post('/register', auth_Controller.register)
router.post('/login', auth_Controller.login)

router.get('/me', authorizationMiddleware, auth_Controller.getMe)

module.exports = router;