const { askGemini } = require("../services/geminiService");

// ====================== Detect Specialist ======================

function detectSpecialization(message) {

    const text = message.toLowerCase();

    if (
        text.includes("chest") ||
        text.includes("heart")
    ) {
        return "Cardiologist";
    }

    if (
        text.includes("headache") ||
        text.includes("migraine")
    ) {
        return "Neurologist";
    }

    if (
        text.includes("skin") ||
        text.includes("rash") ||
        text.includes("acne")
    ) {
        return "Dermatologist";
    }

    if (
        text.includes("eye") ||
        text.includes("vision")
    ) {
        return "Ophthalmologist";
    }

    if (
        text.includes("tooth") ||
        text.includes("teeth") ||
        text.includes("dental")
    ) {
        return "Dentist";
    }

    if (
        text.includes("bone") ||
        text.includes("joint") ||
        text.includes("fracture")
    ) {
        return "Orthopedic";
    }

    if (
        text.includes("pregnancy") ||
        text.includes("period") ||
        text.includes("gyne")
    ) {
        return "Gynecologist";
    }

    if (
        text.includes("stress") ||
        text.includes("anxiety") ||
        text.includes("depression")
    ) {
        return "Psychiatrist";
    }

    if (
        text.includes("fever") ||
        text.includes("cold") ||
        text.includes("cough")
    ) {
        return "General Physician";
    }

    return null;
}

// ====================== AI CHAT ======================

async function chatWithAI(req, res) {

    try {

        const { message } = req.body;

        if (!message || !message.trim()) {

            return res.status(400).json({

                success: false,

                message: "Message is required."

            });

        }

        const reply = await askGemini(message);

        const specialization = detectSpecialization(message);

        res.json({

            success: true,

            reply,

            specialization,

            showBookingButton: specialization !== null

        });

    }

    catch (error) {

        console.error("AI Error:", error);

        res.status(500).json({

            success: false,

            message: "Unable to generate AI response."

        });

    }

}

module.exports = {

    chatWithAI

};