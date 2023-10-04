require('dotenv').config();
const express = require('express');
const cors = require('cors');
const notfoundMiddleware = require('../src/middleware/not_found')

const app = express();

app.use(cors());
app.use(express.json());

app.use(notfoundMiddleware);

const PORT = process.env.PORT || '3000';
app.listen(PORT, () => console.log(`Server running on port: ${PORT}`))