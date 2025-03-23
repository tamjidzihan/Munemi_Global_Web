const careerService = require('../services/careerService');
const fs = require('fs').promises;
const path = require('path');

// Configure upload directory path
const uploadDir = path.join(__dirname, '../uploads/');

const getAllCareers = async (req, res) => {
    try {
        const careers = await careerService.getCareers();
        res.status(200).json(careers);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching careers', error });
    }
};

const getCareerById = async (req, res) => {
    try {
        const career = await careerService.findCareerById(req.params.id);
        if (!career) return res.status(404).json({ message: 'Career not found' });
        res.status(200).json(career);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching career', error });
    }
};

const createNewCareer = async (req, res) => {
    try {
        const { firstName, lastName, phone, email, country, currentAddress, jobType } = req.body;
        const idCard = req.files['idCard'] ? req.files['idCard'][0].filename : null;
        const resume = req.files['resume'] ? req.files['resume'][0].filename : null;

        const newCareer = await careerService.createCareer({
            firstName,
            lastName,
            phone,
            email,
            country,
            currentAddress,
            idCard,
            resume,
            jobType
        });

        res.status(201).json(newCareer);
    } catch (error) {
        res.status(500).json({ message: 'Error creating career', error });
    }
};

const updateCareerById = async (req, res) => {
    try {
        const careerId = req.params.id;
        const existingCareer = await careerService.findCareerById(careerId);

        if (!existingCareer) {
            return res.status(404).json({ message: 'Career not found' });
        }

        const updateData = { ...req.body };
        const filesToDelete = [];

        // Handle ID Card update
        if (req.files?.['idCard']) {
            updateData.idCard = req.files['idCard'][0].filename;
            if (existingCareer.idCard) {
                filesToDelete.push(existingCareer.idCard);
            }
        }

        // Handle Resume update
        if (req.files?.['resume']) {
            updateData.resume = req.files['resume'][0].filename;
            if (existingCareer.resume) {
                filesToDelete.push(existingCareer.resume);
            }
        }

        // Update database record
        const [updated] = await careerService.updateCareer(careerId, updateData);
        if (!updated) {
            return res.status(404).json({ message: 'Career not found' });
        }

        // Delete old files
        await Promise.all(
            filesToDelete.map(async (filename) => {
                try {
                    await fs.unlink(path.join(uploadDir, filename));
                } catch (err) {
                    console.error(`Error deleting file ${filename}:`, err);
                }
            })
        );

        res.status(200).json({ message: 'Career updated successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error updating career', error });
    }
};


const deleteCareer = async (req, res) => {
    try {
        const careerId = req.params.id;
        const career = await careerService.findCareerById(careerId);

        if (!career) {
            return res.status(404).json({ message: 'Career not found' });
        }

        // Get files to delete
        const filesToDelete = [];
        if (career.idCard) filesToDelete.push(career.idCard);
        if (career.resume) filesToDelete.push(career.resume);

        // Delete database record
        const deleted = await careerService.deleteCareerById(careerId);
        if (!deleted) {
            return res.status(404).json({ message: 'Career not found' });
        }

        // Delete associated files
        await Promise.all(
            filesToDelete.map(async (filename) => {
                try {
                    await fs.unlink(path.join(uploadDir, filename));
                } catch (err) {
                    console.error(`Error deleting file ${filename}:`, err);
                }
            })
        );

        res.status(200).json({ message: 'Career deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting career', error });
    }
};

module.exports = { getAllCareers, getCareerById, createNewCareer, updateCareerById, deleteCareer };