import { getToken } from "./authService";

const API_URL = "http://localhost:5000/api";

// ================= AI CHAT =================

export async function sendMessage(message) {

    const response = await fetch(`${API_URL}/ai/chat`, {

        method: "POST",

        headers: {

            "Content-Type": "application/json",

            Authorization: `Bearer ${getToken()}`

        },

        body: JSON.stringify({

            message

        })

    });

    const data = await response.json();

    if (!data.success) {

        throw new Error(data.message);

    }

    return data.reply;

}