import { getToken } from "./authService";

const API_URL = "http://localhost:5000/api/ai";

// ================= AI CHAT =================

export async function chatWithAI(message) {

    const response = await fetch(

        `${API_URL}/chat`,

        {

            method: "POST",

            headers: {

                "Content-Type": "application/json",

                Authorization: `Bearer ${getToken()}`

            },

            body: JSON.stringify({

                message

            })

        }

    );

    const data = await response.json();

    if (!data.success) {

        throw new Error(data.message);

    }

    return {

        reply: data.reply,

        showBookingButton: data.showBookingButton || false,

        specialization: data.specialization || ""

    };

}