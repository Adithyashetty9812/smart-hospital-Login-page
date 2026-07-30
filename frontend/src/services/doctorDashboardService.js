import { getToken } from "./authService";

const API_URL = "http://localhost:5000/api/doctor-dashboard";

// ================= GET APPOINTMENTS =================

export async function getDoctorAppointments() {

    const response = await fetch(
        `${API_URL}/appointments`,
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

    return data.appointments;
}

// ================= GET PATIENT DETAILS =================

export async function getPatientDetail(id) {

    const response = await fetch(
        `${API_URL}/appointments/${id}`,
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

    return data.patient;
}

// ================= UPDATE STATUS =================

export async function updateAppointmentStatus(id, status) {

    const response = await fetch(
        `${API_URL}/appointments/${id}/status`,
        {
            method: "PUT",

            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${getToken()}`
            },

            body: JSON.stringify({
                status
            })
        }
    );

    const data = await response.json();

    if (!data.success) {
        throw new Error(data.message);
    }

    return data;
}