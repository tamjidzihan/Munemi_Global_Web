const newsHeadlineService = require('../services/newsHeadlineService');

const getAllNewsHeadline = async (req, res) => {
    try {
        const newsHeadlines = await newsHeadlineService.getAllNewsHeadlines();
        res.status(200).json(newsHeadlines);
    } catch (error) {
        console.log(error);
        res.status(400).json({ message: "Error fetching news headlines" });
    }
};

const createNewsHeadline = async (req, res) => {
    try {
        const {
            title,
            link,
            isBreaking,
            category,
            isActive
        } = req.body;

        if (!title || !link) {
            return res.status(400).json({ message: "Please fill out all required fields" });
        }

        const newNewsHeadline = await newsHeadlineService.createNewsHeadline({
            title,
            link,
            isBreaking: isBreaking || false,
            category: category || null,
            isActive: isActive !== undefined ? isActive : true
        });
        res.status(201).json(newNewsHeadline); // Fixed: changed 'req.status' to 'res.status'
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Error creating NewsHeadline", error: error.message });
    }
};

const getNewsHeadlineById = async (req, res) => {
    try {
        const { id } = req.params;
        const newsHeadline = await newsHeadlineService.findNewsHeadlineById(id);

        if (!newsHeadline) {
            return res.status(404).json({ message: "News headline not found" });
        }

        res.status(200).json(newsHeadline);
    } catch (error) {
        console.log(error);
        res.status(400).json({ message: "Error fetching news headline" });
    }
};

const updateNewsHeadline = async (req, res) => {
    try {
        const { id } = req.params;
        const updateData = req.body;

        const [affectedRows, [updatedNewsHeadline]] = await newsHeadlineService.updateNewsHeadline(id, updateData);

        if (affectedRows === 0) {
            return res.status(404).json({ message: "News headline not found" });
        }

        res.status(200).json(updatedNewsHeadline);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Error updating news headline", error: error.message });
    }
};

const deleteNewsHeadline = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedRows = await newsHeadlineService.deleteNewsHeadline(id);

        if (deletedRows === 0) {
            return res.status(404).json({ message: "News headline not found" });
        }

        res.status(200).json({ message: "News headline deleted successfully" });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Error deleting news headline", error: error.message });
    }
};

module.exports = {
    getAllNewsHeadline,
    createNewsHeadline,
    getNewsHeadlineById,
    updateNewsHeadline,
    deleteNewsHeadline
};