const createError = require('../utilis/create_error');
const { upload } = require('../utilis/cloudinary_service');
const prisma = require('../models/prisma');
const fs = require('fs/promises')
const { checkUserIdSchema } = require('../validators/user_validator')

exports.updateProfile = async (req, res, next) => {
    try {
        if (!req.files) { }
        const response = {};
        if (req.files.profileImage) {
            const url = await upload(req.files.profileImage[0].path);
            response.profileImage = url;
            await prisma.user.update({
                data: {
                    profileImage: url
                },
                where: {
                    id: req.user.id
                }
            })
        }
        const oldData = await prisma.user.findFirst({ where: { id: req.user.id } });
        const newData = JSON.parse(req.body.userData)
        const patchData = { ...oldData, ...newData }
        // console.log(req.body)
        const updateProfile = await prisma.user.update({
            data: patchData,
            where: { id: req.user.id }
        }
        );
        res.status(201).json({ updateProfile })

        // console.log(patchData)

    }
    catch (err) {
        next(err);
    } finally {
        if (req.files.profileImage) {
            fs.unlink(req.files.profileImage[0].path)
        }
    }
}

exports.getUserById = async (req, res, next) => {
    try {
        const { error } = checkUserIdSchema.validate(req.params);
        if (error) {
            return next(error);
        };

        const userId = +req.params.userId;
        const user = await prisma.user.findUnique({
            where: {
                id: userId
            }
        });
        if (user) { delete user.password };
        res.status(200).json({ user })
    } catch (err) {
        next(err)
    }
}