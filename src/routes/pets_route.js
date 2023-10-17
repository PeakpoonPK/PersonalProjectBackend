const express = require('express')
const petController = require('../controllers/pet_controller')
const authenticatedMiddleware = require('../middleware/authenticated')
const uploadMiddleware = require('../middleware/upload')

const router = express.Router();

router.patch('/', authenticatedMiddleware,
    uploadMiddleware.fields([
        { name: 'petImage', maxCount: 1 },
        { name: 'petData', maxcount: 1 }
    ]),
    petController.updatePet);

router.get('/:petId', authenticatedMiddleware, petController.getPetById)


module.exports = router;