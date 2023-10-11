const jwt = require('jsonwebtoken')
const { registerPrismaSchema, loginPrismaSchema } = require("../validators/auth_validator")
const bcrypt = require('bcryptjs');
const prisma = require('../models/prisma');
const createError = require('../utilis/create_error');

exports.register = async (req, res, next) => {
    try {
        const { value, error } = registerPrismaSchema.validate(req.body);
        if (error) {
            return next(error)
        }
        value.password = await bcrypt.hash(value.password, 12)

        const user = await prisma.user.create({
            data: value
        });
        const payload = { userId: user.id };
        const accessToken = jwt.sign(payload, process.env.JWT_SECRET_KEY || 'lkjhgfdsa', {
            expiresIn: process.env.JWT_EXPIRE
        })
        delete user.password
        // console.log(user)
        res.status(201).json({ accessToken, user })
        // console.log(value)
        // res.status(200).json({ message: "Registration Successful!" })
    } catch (err) {
        next(err)
    }
}

exports.login = async (req, res, next) => {
    try {
        const { value, error } = loginPrismaSchema.validate(req.body);
        if (error) {
            return next(error)
        }
        const user = await prisma.user.findFirst({
            where: {
                email: value.email
            }
        });
        console.log(user)
        if (!user) {
            return next(createError('Sorry, we could not find your account.', 400))
        }
        const isMatch = await bcrypt.compare(value.password, user.password);
        if (!isMatch) {
            return next(createError('Wrong Password!', 400))
        }
        const payload = { userId: user.id };
        const accessToken = jwt.sign(payload, process.env.JWT_SECRET_KEY || 'lkjhgfdsa', {
            expiresIn: process.env.JWT_EXPIRE
        })
        delete user.password;
        res.status(201).json({ accessToken, user })
    } catch (err) {
        next(err)
    }
}
exports.getMe = (req, res, next) => {
    res.status(200).json({ user: req.user })
}

