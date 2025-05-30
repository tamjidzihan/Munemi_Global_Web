const mongoose = require("mongoose");

const offerSchema = new mongoose.Schema(
    {
        title: { type: String, required: true },
        description: { type: String, required: true },
        startDate: { type: Date, required: true },
        endDate: { type: Date, required: true },
        termsAndConditions: { type: String },
        image: {
            publicId: { type: String },
            imageUrl: { type: String }
        },
        isActive: { type: Boolean, default: true },
    },
    { timestamps: true }
);

const OfferModel = mongoose.model("Offer", offerSchema);

module.exports = {
    OfferModel
};