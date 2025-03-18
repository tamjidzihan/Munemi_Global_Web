const express = require("express");
const {
    createCareer,
    deleteCareerById,
    findCareerById,
    getCareers
} = require("../services/CareerService");
const { deleteImageFromCloudinary } = require("../helpers");

const getAllCareers = async (req, res) => {
    try {
        const careers = await getCareers();
        res.status(200).json(careers);
    } catch (error) {
        console.log(error);
        res.sendStatus(400);
    }
};

const getCareerById = async (req, res) => {
    try {
        const { id } = req.params;
        const career = await findCareerById(id);
        if (!career) {
            return res.status(404).json({ message: "Career not found" });
        }
        res.status(200).json(career);
    } catch (error) {
        console.log(error);
        res.sendStatus(400);
    }
};

const createNewCareer = async (req, res) => {
    try {
        const {
            firstName,
            lastName,
            phone,
            email,
            country,
            currentAddress,
            idCard,
            resume,
            jobType
        } = req.body;

        if (!firstName || !lastName || !phone || !email || !country ||
            !currentAddress || !resume || !jobType) {
            return res.status(400).json({ message: "Please fill out all required fields" });
        }

        if (!["Full Time", "Part Time", "Casual", "Internship"].includes(jobType)) {
            return res.status(400).json({ message: "Invalid job type" });
        }

        const newCareer = await createCareer({
            firstName,
            lastName,
            phone,
            email,
            country,
            currentAddress,
            idCard: idCard ? {
                publicId: idCard.publicId,
                imageUrl: idCard.imageUrl
            } : null,
            resume,
            jobType
        });

        res.status(201).json(newCareer);
    } catch (error) {
        console.log(error);
        res.sendStatus(400);
    }
};

const updateCareerById = async (req, res) => {
    try {
        const { id } = req.params;
        const {
            firstName,
            lastName,
            phone,
            email,
            country,
            currentAddress,
            idCard,
            resume,
            jobType
        } = req.body;

        if (!firstName || !lastName || !phone || !email || !country ||
            !currentAddress || !resume || !jobType) {
            return res.status(400).json({ message: "Please fill out all required fields" });
        }

        if (!["Full Time", "Part Time", "Casual", "Internship"].includes(jobType)) {
            return res.status(400).json({ message: "Invalid job type" });
        }

        const career = await findCareerById(id);
        if (!career) {
            return res.status(404).json({ message: "Career not found" });
        }

        // Update career fields
        career.firstName = firstName;
        career.lastName = lastName;
        career.phone = phone;
        career.email = email;
        career.country = country;
        career.currentAddress = currentAddress;
        career.idCard = idCard ? {
            publicId: idCard.publicId,
            imageUrl: idCard.imageUrl
        } : null;
        career.resume = resume;
        career.jobType = jobType;

        await career.save();
        res.status(200).json(career);
    } catch (error) {
        console.log(error);
        res.sendStatus(400);
    }
};

const deleteCareer = async (req, res) => {
    try {
        const { id } = req.params;
        const career = await findCareerById(id);

        if (!career) {
            return res.status(404).json({ message: "Career not found" });
        }

        // Delete associated image if exists
        if (career.idCard?.publicId) {
            const imageDeleted = await deleteImageFromCloudinary(career.idCard.publicId);
            if (!imageDeleted) {
                return res.status(500).json({ message: "Failed to delete image from Cloudinary" });
            }
        }

        const deletedCareer = await deleteCareerById(id);
        res.status(200).json({
            message: "Career deleted successfully",
            deletedCareer
        });
    } catch (error) {
        console.log(error);
        res.sendStatus(400);
    }
};

module.exports = {
    getAllCareers,
    getCareerById,
    createNewCareer,
    updateCareerById,
    deleteCareer
};