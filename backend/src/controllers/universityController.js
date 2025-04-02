const universityService = require('../services/universityService')
const fs = require('fs').promises;
const path = require('path');

const uploadDir = path.join(__dirname, '../uploads/');

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


const updateUniversity = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, country } = req.body;

        const university = await universityService.findUniversityById(id);
        if (!university) {
            return res.status(404).json({ message: 'University not found' });
        }

        // Validate country if provided
        if (country && !['Australia', 'United States', 'Canada', 'United Kingdom', 'Hungary', 'France', 'Saudi Arabia', 'Spain'].includes(country)) {
            return res.status(400).json({ message: 'Invalid country' });
        }

        // Check if a new logo file is uploaded
        const newLogo = req.files && req.files['logo'] ? req.files['logo'][0].filename : null;
        let updatedFields = { name, country };

        if (newLogo) {
            // Delete the old logo if it exists
            if (university.logo) {
                try {
                    await fs.unlink(path.join(uploadDir, university.logo));
                } catch (err) {
                    console.log(`Error deleting old logo ${university.logo}: `, err);
                }
            }
            updatedFields.logo = newLogo;
        }

        // Update the university and return the updated record
        const updatedUniversity = await universityService.updateUniversityById(id, updatedFields);

        if (!updatedUniversity) {
            return res.status(400).json({ message: 'No changes made to the university' });
        }

        res.status(200).json(updatedUniversity); // Send the updated object
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Error updating university', error });
    }
};




const deleteUniversity = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedUniversity = await universityService.findUniversityById(id)

        if (!deletedUniversity) {
            return res.status(404).json({ message: 'University not found' });
        }

        const filesToDelete = []
        if (deletedUniversity.logo) filesToDelete.push(deletedUniversity.logo);

        const deleted = await universityService.deleteUniversityById(id)
        if (!deleted) {
            return res.status(404).json({ message: 'University not found' });
        }

        await Promise.all(
            filesToDelete.map(async (filename) => {
                try {
                    await fs.unlink(path.join(uploadDir, filename));
                } catch (err) {
                    console.log(`Error deleting logo ${filename}: `, err);
                }
            })
        )

        res.status(200).json({ message: 'University deleted successfully' })
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: 'Error deleting University', error });
    }
}





module.exports = {
    getAllUniversities,
    getUniversityById,
    createNewUniversity,
    deleteUniversity,
    updateUniversity
};