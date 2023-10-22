require('dotenv').config();
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const notfoundMiddleware = require('../src/middleware/not_found')
const errorMiddleware = require('./middleware/error')
const rateLimitMiddleware = require('./middleware/rate_limit')
const authRoute = require('./routes/auth_route')
const userRoute = require('./routes/user_route')
const petRoute = require('./routes/pets_route');
const doctorRoute = require('./routes/doctor_route');


const app = express();

app.use(cors());
app.use(morgan('dev'));
app.use(rateLimitMiddleware);
app.use(express.json());

app.use('/auth', authRoute);
app.use('/user', userRoute);
app.use('/pets', petRoute);
app.use('/admin', doctorRoute)

app.use(notfoundMiddleware);
app.use(errorMiddleware);

const PORT = process.env.PORT || '3000';
app.listen(PORT, () => console.log(`Server running on port: ${PORT}`))