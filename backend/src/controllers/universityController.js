const universityService = require('../services/universityService')


const getAllUniversities = async (req, res) => {
    try {
        const universities = await universityService.getUniversity()
        res.status(200).json(universities);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching Universities', error });
        return
    }
}


const getUniversityById = async (req, res) => {
    try {
        const { id } = req.params
        const university = await universityService.findUniversityById(id)
        if (!university) return res.status(404).json({ message: 'University not found' });
        res.status(200).json(university);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching University', error });
    }
}


const createNewUniversity = async (req, res) => {
    try {
        const { name, country } = req.body

        if (!name || !country) {
            res.status(400).json({ message: "Please fill out all the required fields" })
            return
        }

        if (!['Australia', 'United States', 'Canada', 'United Kingdom', 'Hungary', 'France', 'Saudi Arabia', 'Spain'].includes(country)) {
            return res.status(400).json({ message: "Invalid country" });
        }

        const logo = req.files['logo'] ? req.files['logo'][0].filename : null;

        const newUniversity = await universityService.createUniversity({
            name,
            logo,
            country
        })

        res.status(201).json(newUniversity)

    } catch (error) {
        res.status(500).json({ message: 'Error creating career', error });
    }
}


module.exports = {
    getAllUniversities,
    getUniversityById,
    createNewUniversity
};