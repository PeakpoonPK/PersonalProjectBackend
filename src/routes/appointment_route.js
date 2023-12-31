const express = require('express')

const appointmentController = require('../controllers/appointment_controller')
const authenticatedMiddleware = require('../middleware/authenticated')


const router = express.Router();

router.post('/add', authenticatedMiddleware, appointmentController.AddAppointment)



router.get('/all', authenticatedMiddleware, appointmentController.getAllAppointmentBypetIdOfUserId)

router.get('/allbooking', authenticatedMiddleware, appointmentController.getAllAppointment)


router.delete('/:appointmentId', authenticatedMiddleware, appointmentController.deleteAppointmentbyId);


module.exports = router;