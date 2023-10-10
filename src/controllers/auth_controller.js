const jwt = require('jsonwebtoken')
const { registerPrismaSchema } = require("../validators/auth_validator")
const bcrypt = require('bcryptjs');
const prisma = require('../models/prisma')


exports.register = async (req, res, next) => {
    try {
        const { value, error } = registerPrismaSchema.validate(req.body);

        if (error) {
            console.log(error)
        }
        value.password = await bcrypt.hash(value.password, 12)
        // const user = await prisma.User.create({
        //     data: value
        // })
        // const payload = { userId: user.id };
        // const accessToken = jwt.sign(payload, process.env.JWT_SECRET_KEY || 'lkjhgfdsa', {
        //     expireIn: process.env.JWT_EXPIRE
        // })
        // res.status(201).json({ accessToken })
        console.log(value)
        res.status(200).json({ message: "Registration Successful!" })
    } catch (err) {
        next(err)
    }
}

// exports.login = async (req, res, next) => {
//     try {

//     } catch (err) {
//         next(err)
//     }
// }


