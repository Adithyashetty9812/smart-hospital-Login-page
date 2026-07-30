/**
 * Mock doctor service.
 *
 * Simulates what a real GET /api/doctor/dashboard call would return —
 * today's appointments for the logged-in doctor, plus summary stats.
 *
 * REAL BACKEND VERSION (replace later):
 *
 *   export async function getDoctorDashboard(doctorEmail) {
 *     const res = await fetch(
 *       `http://localhost:5000/api/doctor/dashboard?email=${doctorEmail}`
 *     );
 *     if (!res.ok) throw new Error("Failed to load dashboard");
 *     return await res.json();
 *   }
 */

const DELAY = 500;

// Today's appointment list for Dr. Sunita Rao
const MOCK_TODAY_APPOINTMENTS = [
  {
    id: 1,
    patientName: "Aditya Shetty",
    reason: "Follow-up visit",
    time: "10:30 AM",
    status: "waiting",     // patient has arrived, not yet seen
  },
  {
    id: 2,
    patientName: "Meena Iyer",
    reason: "New consultation",
    time: "11:00 AM",
    status: "waiting",
  },
  {
    id: 3,
    patientName: "Rohit Pai",
    reason: "Routine checkup",
    time: "11:30 AM",
    status: "scheduled",   // booked but not yet arrived
  },
  {
    id: 4,
    patientName: "Kavitha Nair",
    reason: "Test result review",
    time: "12:00 PM",
    status: "scheduled",
  },
];

// Stats shown on the three stat cards on the dashboard
const MOCK_STATS = {
  todayCount: 4,
  totalPatients: 128,
  pendingRequests: 2,
};

// Mock patient detail (what the doctor sees when they click "View details")
const MOCK_PATIENT_DETAILS = {
  1: { name: "Aditya Shetty", age: 29, phone: "9876543210", lastVisit: "02 May 2026", notes: "Follow-up for ECG results. Patient reported occasional chest discomfort." },
  2: { name: "Meena Iyer", age: 45, phone: "9845001122", lastVisit: "First visit", notes: "New patient. Referred by Dr. Karan Mehta for cardiac evaluation." },
  3: { name: "Rohit Pai", age: 34, phone: "9900112233", lastVisit: "15 Mar 2026", notes: "Routine annual checkup. No major concerns in last visit." },
  4: { name: "Kavitha Nair", age: 52, phone: "9812345678", lastVisit: "20 Jun 2026", notes: "Blood panel and echocardiogram results ready for discussion." },
};

export function getDoctorDashboard() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        stats: { ...MOCK_STATS },
        appointments: [...MOCK_TODAY_APPOINTMENTS],
      });
    }, DELAY);
  });
}

export function getPatientDetail(appointmentId) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const detail = MOCK_PATIENT_DETAILS[appointmentId];
      if (!detail) {
        reject(new Error("Patient details not found"));
        return;
      }
      resolve({ ...detail });
    }, DELAY);
  });
}
