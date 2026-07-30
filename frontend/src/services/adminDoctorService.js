import { getToken } from "./authService";

const API_URL = "http://localhost:5000/api";

// ================= Get Doctors =================

export async function getDoctors() {

    const response = await fetch(
        `${API_URL}/doctors`,
        {
            headers: {
                Authorization: `Bearer ${getToken()}`
            }
        }
    );

    const data = await response.json();

    if (!data.success) {
        throw new Error(data.message);
    }

    return data.doctors;
}