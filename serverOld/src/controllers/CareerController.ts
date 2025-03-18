import express from "express";
import { createCareer, deleteCareerById, findCareerById, getCareers } from "../services/CareerService";
import { deleteImageFromCloudinary } from "../helpers";

export const getAllCareers = async (req: express.Request, res: express.Response) => {
    try {
        const careers = await getCareers();
        res.status(200).json(careers);
    } catch (error) {
        console.log(error);
        res.sendStatus(400);
    }
};


export const getCareerById = async (req: express.Request, res: express.Response) => {
    try {
        const { id } = req.params;
        const career = await findCareerById(id);
        if (!career) {
            res.status(404).json({ message: "Career not found" });
            return;
        }
        res.status(200).json(career);
    } catch (error) {
        console.log(error);
        res.sendStatus(400);
    }
};


export const createNewCareer = async (req: express.Request, res: express.Response) => {
    try {
        const { firstName, lastName, phone, email, country, currentAddress, idCard, resume, jobType } = req.body;

        if (!firstName || !lastName || !phone || !email || !country || !currentAddress || !resume || !jobType) {
            res.status(400).json({ message: "Please fill out all the required career fields." });
            return;
        }
        if (!["Full Time", "Part Time", "Casual", "Internship"].includes(jobType)) {
            res.status(400).json({ message: "Invalid job type." });
            return;
        }
        const newCareer = await createCareer({
            firstName,
            lastName,
            phone,
            email,
            country,
            currentAddress,
            idCard: idCard ? { publicId: idCard.publicId, imageUrl: idCard.imageUrl } : null,
            resume,
            jobType
        });
        res.status(200).json(newCareer);
    } catch (error) {
        console.log(error);
        res.sendStatus(400);
    }
};


export const updateCareerById = async (req: express.Request, res: express.Response) => {
    try {
        const { id } = req.params;
        const { firstName, lastName, phone, email, country, currentAddress, idCard, resume, jobType } = req.body;

        if (!firstName || !lastName || !phone || !email || !country || !currentAddress || !resume || !jobType) {
            res.status(400).json({ message: "Please fill out all the required fields." });
            return;
        }
        if (!["Full Time", "Part Time", "Casual", "Internship"].includes(jobType)) {
            res.status(400).json({ message: "Invalid job type." });
            return;
        }
        const career = await findCareerById(id);
        if (!career) {
            res.status(404).json({ message: "Career not found" });
            return;
        }

        career.firstName = firstName;
        career.lastName = lastName;
        career.phone = phone;
        career.email = email;
        career.country = country;
        career.currentAddress = currentAddress;
        career.idCard = idCard ? { publicId: idCard.publicId, imageUrl: idCard.imageUrl } : null,
            career.resume = resume;
        career.jobType = jobType;

        await career.save();
        res.status(200).json(career);
    } catch (error) {
        console.log(error);
        res.sendStatus(400);
    }
};

export const deleteCareer = async (req: express.Request, res: express.Response) => {
    try {
        const { id } = req.params;

        const career = await findCareerById(id)
        if (!career) {
            res.status(404).json({ message: 'Career not found' });
            return
        }
        const publicId = career.idCard.publicId

        // Delete the image from Cloudinary
        const imageDeleted = await deleteImageFromCloudinary(publicId);
        if (!imageDeleted) {
            res.status(500).json({ message: 'Failed to delete image from Cloudinary' });
            return
        }

        const deletedCareer = await deleteCareerById(id);
        if (!deletedCareer) {
            res.status(404).json({ message: "Career not found" });
            return;
        }
        res.status(200).json({ message: "Career deleted successfully", deleteCareer });
    } catch (error) {
        console.log(error);
        res.sendStatus(400);
    }
};