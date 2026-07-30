import { getToken } from "./authService";

const API_URL = "http://localhost:5000/api";

// ====================== BOOK APPOINTMENT ======================

export async function bookAppointment(appointment) {

    const response = await fetch(`${API_URL}/appointments`, {

        method: "POST",

        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${getToken()}`
        },

        body: JSON.stringify(appointment)

    });

    const data = await response.json();

    if (!data.success) {
        throw new Error(data.message);
    }

    return data;

}

// ====================== GET PATIENT APPOINTMENTS ======================

export async function getPatientAppointments() {

    const response = await fetch(`${API_URL}/appointments`, {

        headers: {
            Authorization: `Bearer ${getToken()}`
        }

    });

    const data = await response.json();

    if (!data.success) {
        throw new Error(data.message);
    }

    return data.appointments;

}

// ====================== CANCEL APPOINTMENT ======================

export async function cancelAppointment(id) {

    const response = await fetch(`${API_URL}/appointments/${id}`, {

        method: "PUT",

        headers: {
            Authorization: `Bearer ${getToken()}`
        }

    });

    const data = await response.json();

    if (!data.success) {
        throw new Error(data.message);
    }

    return data;

}

// ====================== ADMIN - GET ALL APPOINTMENTS ======================

export async function getAllAppointments() {

    const response = await fetch(`${API_URL}/appointments/admin/all`, {

        headers: {
            Authorization: `Bearer ${getToken()}`
        }

    });

    const data = await response.json();

    if (!data.success) {
        throw new Error(data.message);
    }

    return data.appointments;

}

// ====================== ADMIN - UPDATE STATUS ======================

export async function updateAppointmentStatus(id, status) {

    const response = await fetch(
        `${API_URL}/appointments/admin/status/${id}`,
        {

            method: "PUT",

            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${getToken()}`
            },

            body: JSON.stringify({ status })

        }
    );

    const data = await response.json();

    if (!data.success) {
        throw new Error(data.message);
    }

    return data;

}

// ====================== ADMIN - DELETE APPOINTMENT ======================

export async function deleteAppointment(id) {

    const response = await fetch(
        `${API_URL}/appointments/admin/${id}`,
        {

            method: "DELETE",

            headers: {
                Authorization: `Bearer ${getToken()}`
            }

        }
    );

    const data = await response.json();

    if (!data.success) {
        throw new Error(data.message);
    }

    return data;

}