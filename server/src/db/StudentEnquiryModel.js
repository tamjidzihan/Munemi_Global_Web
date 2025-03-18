const mongoose = require("mongoose");

const StudentEnquirySchema = new mongoose.Schema({
    studentName: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    address: { type: String, required: true },
    englishProficiencyTest: { type: String, required: true, enum: ["IELTS", "PTE", "TOEFl", "Duolingo"] },
    testResult: {
        reading: { type: String, required: true },
        writing: { type: String, required: true },
        listening: { type: String, required: true },
        speaking: { type: String, required: true },
        overAll: { type: String, required: true },
    },
    academicQualification: [{
        degreeName: { type: String, required: true },
        institutionName: { type: String, required: true },
        passingYear: { type: String, required: true },
    }],
    que1: { type: String, required: true },
    que2: { type: String, required: true },
    que3: { type: String, required: true },
    visaHistory: {
        heldVisa: { type: Boolean, required: true },
        heldVisaDetails: { type: String },
        visaRefusal: { type: Boolean, required: true },
        visaRefusalDetails: { type: String },
        visaViolation: { type: Boolean, required: true },
        visaViolationDetails: { type: String }
    }
}, { timestamps: true });


const StudentEnquiryModel = mongoose.model("StudentEnquiry", StudentEnquirySchema)

module.exports = { StudentEnquiryModel }