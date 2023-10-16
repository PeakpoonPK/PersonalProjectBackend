const createError = require('../utilis/create_error');
const { upload } = require('../utilis/cloudinary_service');
const prisma = require('../models/prisma');
const fs = require('fs/promises')
const { checkUserIdSchema } = require('../validators/user_validator')

exports.updateProfile = async (req, res, next) => {
    try {
        // if (!req.files) {
        //     return next(createError('profile image is required'));
        // }
        // const response = {};
        // if (req.files.profileImage) {
        //     const url = await upload(req.files.profileImage[0].path);
        //     response.profileImage = url;
        //     await prisma.user.update({
        //         data: {
        //             profileImage: url
        //         },
        //         where: {
        //             id: req.user.id
        //         }
        //     })
        // }

        const oldData = await prisma.user.findFirst({ where: { id: req.user.id } });
        const newData = req.body
        const patchData = { ...oldData, ...newData }
        const updateProfile = await prisma.user.update({
            data: patchData,
            where: { id: req.user.id }
        }
        );
        res.status(201).json({ updateProfile })

        console.log(patchData)

    }


    catch (err) {
        next(err);
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