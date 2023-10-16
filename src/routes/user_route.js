const express = require('express')
const userController = require('../controllers/user_controller')
const authenticatedMiddleware = require('../middleware/authenticated')
const uploadMiddleware = require('../middleware/upload')

const router = express.Router();

router.patch(
    '/',
    authenticatedMiddleware,
    uploadMiddleware.fields([
        { name: 'profileImage', maxCount: 1 },
    ]),
    userController.updateProfile);

router.get('/:userId', authenticatedMiddleware, userController.getUserById)


module.exports = router;