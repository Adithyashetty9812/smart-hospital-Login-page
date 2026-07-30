import { getToken } from "./authService";

const API_URL = "http://localhost:5000/api";

// ====================== CHANGE PASSWORD ======================

export async function changePassword(passwords) {

    const response = await fetch(
        `${API_URL}/auth/change-password`,
        {

            method: "PUT",

            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${getToken()}`
            },

            body: JSON.stringify(passwords)

        }
    );

    const data = await response.json();

    if (!data.success) {
        throw new Error(data.message);
    }

    return data;

}