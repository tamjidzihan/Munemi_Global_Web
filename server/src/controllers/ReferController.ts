import express from "express";
import {
    getAllRefers,
    createRefer,
    findReferById,
    updateRefer,
    deleteReferById,
} from "../services/ReferService";

export const getRefers = async (req: express.Request, res: express.Response) => {
    try {
        const refers = await getAllRefers();
        res.status(200).json(refers);
    } catch (error) {
        console.error(error);
        res.sendStatus(400);
        return
    }
};


export const getReferById = async (req: express.Request, res: express.Response) => {
    try {
        const { id } = req.params
        const refer = await findReferById(id)
        if (!refer) {
            res.status(404).json({ message: "Refer Not found" })
            return
        }
        res.status(200).json(refer)
    } catch (error) {
        console.log(error)
        res.sendStatus(400)
        return
    }
}


export const createNewRefer = async (req: express.Request, res: express.Response) => {
    try {
        const { firstName, lastName, registrationNumber, email, phone, country, currentAddress, idCard } = req.body;

        if (!firstName || !lastName || !registrationNumber || !email || !phone || !country || !currentAddress) {
            res.status(400).json({ message: "Please fill out all required fields" });
            return;
        }

        const newRefer = await createRefer({
            firstName, lastName, registrationNumber, email, phone, country, currentAddress, idCard
        });

        res.status(201).json(newRefer);
    } catch (error) {
        console.error(error);
        res.sendStatus(400);
        return
    }
};

export const updateReferData = async (req: express.Request, res: express.Response) => {
    try {
        const { id } = req.params;
        const updates = req.body;

        const updatedRefer = await updateRefer(id, updates);
        if (!updatedRefer) {
            res.status(404).json({ message: "Refer data not found" });
            return;
        }

        res.status(200).json(updatedRefer);
    } catch (error) {
        console.error(error);
        res.sendStatus(400);
        return
    }
};

export const deleteReferData = async (req: express.Request, res: express.Response) => {
    try {
        const { id } = req.params;
        const deletedRefer = await deleteReferById(id);
        if (!deletedRefer) {
            res.status(404).json({ message: "Refer data not found" });
            return;
        }

        res.status(202).json(deletedRefer);
    } catch (error) {
        console.error(error);
        res.sendStatus(400);
        return
    }
};
