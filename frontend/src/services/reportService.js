import { getToken } from "./authService";

const API_URL = "http://localhost:5000/api";

// ====================== GET REPORT ======================

export async function getDashboardReport() {

    const response = await fetch(`${API_URL}/reports`, {

        headers: {
            Authorization: `Bearer ${getToken()}`
        }

    });

    const data = await response.json();

    if (!data.success) {
        throw new Error(data.message);
    }

    return data.report;

}