const express = require('express')
const petController = require('../controllers/pet_controller')
const authenticatedMiddleware = require('../middleware/authenticated')
const uploadMiddleware = require('../middleware/upload')

const router = express.Router();

router.post('/add', authenticatedMiddleware,
    uploadMiddleware.single('petImage'), petController.Addpet)

router.patch('/:petId',
    authenticatedMiddleware,
    uploadMiddleware.fields([
        { name: 'petImage', maxCount: 1 },
        { name: 'petData', maxcount: 1 }
    ]),
    petController.updatePet);

router.get('/all', authenticatedMiddleware, petController.getAllPetByUserId)

router.get('/:petId', authenticatedMiddleware, petController.getPetById)


router.delete('/:petId', authenticatedMiddleware, petController.deletePetbyId);




module.exports = router;