const { upload } = require('../utilis/cloudinary_service');
const prisma = require('../models/prisma');
const fs = require('fs/promises')
const { checkPetIdSchema, checkEditPetSchema } = require('../validators/pets_validator');



exports.Addpet = async (req, res, next) => {
    try {
        const newData = JSON.parse(req.body.petData)
        const { value, error } = checkEditPetSchema.validate(newData);
        if (error) {
            return next(error)
        }
        value.userId = req.user.id
        if (!req.file) {
            const pets = await prisma.pets.create({
                data: value
            })
            return res.status(201).json({ pets, message: "Add pet Successful!" })
        }
        else {
            const response = {};
            const url = await upload(req.file.path);
            response.petImage = url;
            const pets = await prisma.pets.create({
                data: {
                    ...value,
                    petImage: url,
                },
            })
            return res.status(201).json({ pets, message: "Add pet Successful!" })
        }
        // res.status(201).json({ message: "Add pet Successful!", URL })
    } catch (err) {
        console.log(err)
    } finally {
        if (req.file) {
            fs.unlink(req.file.path)
        }
    }
}


exports.updatePet = async (req, res, next) => {
    try {
        const petId = +req.params.petId
        if (!req.files) { }
        const response = {};
        if (req.files.petImage) {
            const url = await upload(req.files.petImage[0].path);
            response.petImage = url;

            await prisma.pets.update({
                data: {
                    petImage: url
                },
                where: {
                    id: petId
                }
            })
        }

        const oldData = await prisma.pets.findFirst({ where: { id: +req.params.petId } });
        const a = JSON.parse(req.body.petData)

        const patchData = { ...oldData, ...a }


        console.log('here', patchData)
        const updatePet = await prisma.pets.update({
            data: patchData,
            where: {
                id: petId
            }
        }
        );
        res.status(201).json({ updatePet })

    }
    catch (err) {
        next(err);
    } finally {
        if (req.files.petImage) {
            fs.unlink(req.files.petImage[0].path)
        }
    }
}

exports.getPetById = async (req, res, next) => {
    try {
        const { error } = checkPetIdSchema.validate(req.params);
        if (error) {
            return next(error);
        };
        const petId = +req.params.petId;
        console.log(petId)
        const pet = await prisma.pets.findUnique({
            where: {
                id: petId
            }
        });
        res.status(200).json({ pet })
    } catch (err) {
        next(err)
    }
}

exports.getAllPetByUserId = async (req, res, next) => {
    try {
        const pet = await prisma.pets.findMany({
            where: {
                userId: +req.user.id
            }
        });
        res.status(200).json({ pet })
    } catch (err) {
        next(err)
    }
}

exports.deletePetbyId = async (req, res, next) => {
    try {
        const { value, error } = checkPetIdSchema.validate(req.params);
        if (error) {
            return next(error);
        }
        const petId = value.petId
        console.log(petId)
        await prisma.pets.delete({
            where: {
                id: petId
            }
        });
        res.status(200).json({ message: 'deleted' })
    } catch (err) {
        next(err)
    }
};
