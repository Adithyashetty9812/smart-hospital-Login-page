import { getToken } from "./authService";

const API_URL = "http://localhost:5000/api";

// ====================== GET ADMIN DASHBOARD ======================

export async function getAdminDashboard() {

    // Fetch doctors and statistics together
    const [doctorResponse, statsResponse] = await Promise.all([

        fetch(`${API_URL}/doctors`, {
            headers: {
                Authorization: `Bearer ${getToken()}`
            }
        }),

        fetch(`${API_URL}/doctors/stats`, {
            headers: {
                Authorization: `Bearer ${getToken()}`
            }
        })

    ]);

    const doctorData = await doctorResponse.json();
    const statsData = await statsResponse.json();

    if (!doctorData.success) {
        throw new Error(doctorData.message);
    }

    if (!statsData.success) {
        throw new Error(statsData.message);
    }

    return {
        doctors: doctorData.doctors,
        stats: statsData.stats
    };

}

// ====================== ADD DOCTOR ======================

export async function addDoctor(doctor) {

    const response = await fetch(`${API_URL}/doctors`, {

        method: "POST",

        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${getToken()}`
        },

        body: JSON.stringify(doctor)

    });

    const data = await response.json();

    if (!data.success) {
        throw new Error(data.message);
    }

    return data;

}

// ====================== UPDATE DOCTOR ======================

export async function updateDoctor(id, doctor) {

    const response = await fetch(`${API_URL}/doctors/${id}`, {

        method: "PUT",

        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${getToken()}`
        },

        body: JSON.stringify(doctor)

    });

    const data = await response.json();

    if (!data.success) {
        throw new Error(data.message);
    }

    return data;

}

// ====================== DELETE DOCTOR ======================

export async function removeDoctor(id) {

    const response = await fetch(`${API_URL}/doctors/${id}`, {

        method: "DELETE",

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