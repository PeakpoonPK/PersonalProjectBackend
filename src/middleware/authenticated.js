const createError = require("../utilis/create_error");
const jwt = require('jsonwebtoken');
const prisma = require('../models/prisma')

module.exports = async (req, res, next) => {
    try {
        const authorization = req.headers.authorization;
        if (!authorization || !authorization.startWith('Bearer ')) {
            return next(createError('unthenticated', 401))
        }
        const token = authorization.split('')[1];
        const payload = jwt.vertify(token, process.env.JWT_SECRET_KEY || 'asdfghjkl');
        const user = await prisma.user.findUnique({
            where: {
                id: payload.userId
            }
        });
        if (!user) {
            return next(createError('unthenticated', 401));
        }
        delete user.password;
        req.user = user;
        next();
    } catch (err) {
        if (err.name === 'TokenExpiredError' || err.name === 'JsonWebToken') {
            err.statusCode = 401;
        }
        next(err)
    }
}