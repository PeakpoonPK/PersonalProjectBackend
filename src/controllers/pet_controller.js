const { upload } = require('../utilis/cloudinary_service');
const prisma = require('../models/prisma');
const fs = require('fs/promises')
const { checkpetIdSchema, checkEditPetSchema } = require('../validators/pets_validator')

exports.Addpet = async (req, res, next) => {
    try {
        const newData = JSON.parse(req.body.petData)
        const { value, error } = checkEditPetSchema.validate(newData);
        if (error) {
            return next(error)
        }
        value.userId = req.user.id

        const pets = await prisma.pets.create({
            data: value
        })

        if (!req.files) { }
        const response = {};
        if (req.files) {

            const url = await upload(req.files.petImage[0].path);
            response.petImage = url;
            await prisma.pets.create({
                data: {
                    ...value,
                    petImage: url,

                },
            })
        }
        res.status(201).json({ pets, message: "Add pet Successful!" })
        // res.status(201).json({ message: "Add pet Successful!", URL })
    } catch (err) {
        console.log(err)
    }
}


exports.updatePet = async (req, res, next) => {
    try {
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
                    id: req.pet.id
                }
            })
        }
        const oldData = await prisma.pets.findFirst({ where: { id: req.pet.id } });
        const newData = JSON.parse(req.body.petData)
        const patchData = { ...oldData, ...newData }
        // console.log(req.body)
        const updatePet = await prisma.pets.update({
            data: patchData,
            where: { id: req.pet.id }
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
        const { error } = checkpetIdSchema.validate(req.params);
        if (error) {
            return next(error);
        };

        const petId = +req.params.petId;
        const pet = await prisma.pet.findUnique({
            where: {
                id: petId
            }
        });
        res.status(200).json({ pet })
    } catch (err) {
        next(err)
    }
}