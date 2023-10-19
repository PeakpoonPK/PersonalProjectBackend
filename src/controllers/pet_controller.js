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
        if (!req.files) { }
        const response = {};
        if (req.files.petImage) {
            const url = await upload(req.files.petImage[0].path);
            response.petImage = url;
            const petId = +req.params.petId
            await prisma.pets.update({
                data: {
                    petImage: url
                },
                where: {
                    id: petId
                }
            })
        }
        console.log(first)
        console.log(req.params)
        const oldData = await prisma.pets.findFirst({ where: { id: +req.params.petId } });
        console.log(req.body)

        const patchData = { ...oldData, ...req.body }
        console.log(patchData)
        // console.log(req.body)
        const updatePet = await prisma.pets.update({
            data: patchData,
            where: { id: patchData.id }
        }
        );
        res.status(201).json({ updatePet })
        // console.log(patchData)

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
