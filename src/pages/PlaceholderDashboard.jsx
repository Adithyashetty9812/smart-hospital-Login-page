import { useNavigate } from "react-router-dom";

/**
 * Temporary placeholder dashboard.
 *
 * One component is reused for all three roles for now, just to
 * confirm login + routing works end-to-end. Each role will get
 * its own real dashboard (matching the wireframes already designed)
 * in the next stage of the project.
 */
function PlaceholderDashboard({ roleLabel }) {
  const navigate = useNavigate();

  return (
    <div style={{ padding: "48px", fontFamily: "var(--font-base)" }}>
      <h1 style={{ color: "var(--color-teal-dark)", marginBottom: "12px" }}>
        {roleLabel} dashboard
      </h1>
      <p style={{ color: "var(--color-gray)", marginBottom: "24px" }}>
        Login successful. This placeholder confirms routing works —
        the real {roleLabel.toLowerCase()} dashboard screen comes next.
      </p>
      <button
        onClick={() => navigate("/login")}
        style={{
          padding: "10px 20px",
          background: "var(--color-teal)",
          color: "white",
          borderRadius: "6px",
          fontWeight: 600,
        }}
      >
        Log out
      </button>
    </div>
  );
}

export default PlaceholderDashboard;
