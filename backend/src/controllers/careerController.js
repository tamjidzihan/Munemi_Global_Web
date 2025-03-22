const careerService = require('../services/careerService');

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
        const [updated] = await careerService.updateCareer(req.params.id, req.body);
        if (!updated) return res.status(404).json({ message: 'Career not found' });
        res.status(200).json({ message: 'Career updated successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error updating career', error });
    }
};

const deleteCareer = async (req, res) => {
    try {
        const deleted = await careerService.deleteCareerById(req.params.id);
        if (!deleted) return res.status(404).json({ message: 'Career not found' });
        res.status(200).json({ message: 'Career deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting career', error });
    }
};

module.exports = { getAllCareers, getCareerById, createNewCareer, updateCareerById, deleteCareer };