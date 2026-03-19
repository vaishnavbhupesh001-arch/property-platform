import { useState } from "react";
import axios from "axios";

function VisitForm({ closePopup }) {
  const [form, setForm] = useState({
    name: "",
    phone: "",
    date: "",
    time: "",
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);

  const handleChange = (e) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      setMessage("");
      setIsSuccess(false);

      await axios.post("http://localhost:5000/api/visit", form);

      setMessage("Visit booked successfully! Email sent to owner.");
      setIsSuccess(true);

      setForm({
        name: "",
        phone: "",
        date: "",
        time: "",
      });
    } catch (error) {
      console.error("Error booking visit:", error);
      setMessage("Failed to book visit. Please try again.");
      setIsSuccess(false);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.overlay}>
      <div style={styles.popup}>
        <div style={styles.topRow}>
          <h2 style={styles.title}>Schedule Visit</h2>

          <button style={styles.iconCloseBtn} onClick={closePopup}>
            ×
          </button>
        </div>

        <p style={styles.subtitle}>
          Fill in your details and choose your preferred visit date and time.
        </p>

        <form onSubmit={handleSubmit} style={styles.form}>
          <input
            type="text"
            placeholder="Your Name"
            name="name"
            value={form.name}
            onChange={handleChange}
            required
            style={styles.input}
          />

          <input
            type="tel"
            placeholder="Phone Number"
            name="phone"
            value={form.phone}
            onChange={handleChange}
            required
            style={styles.input}
          />

          <input
            type="date"
            name="date"
            value={form.date}
            onChange={handleChange}
            required
            style={styles.input}
          />

          <input
            type="time"
            name="time"
            value={form.time}
            onChange={handleChange}
            required
            style={styles.input}
          />

          <button type="submit" style={styles.button} disabled={loading}>
            {loading ? "Submitting..." : "Submit"}
          </button>

          {message && (
            <p
              style={{
                ...styles.message,
                color: isSuccess ? "#1f7a1f" : "#c62828",
              }}
            >
              {message}
            </p>
          )}
        </form>

        <button style={styles.closeBtn} onClick={closePopup}>
          Close
        </button>
      </div>
    </div>
  );
}

const styles = {
  overlay: {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    background: "rgba(0,0,0,0.55)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 999,
    padding: "20px",
    boxSizing: "border-box",
  },

  popup: {
    background: "#fff",
    padding: "28px",
    borderRadius: "18px",
    width: "100%",
    maxWidth: "420px",
    boxShadow: "0 10px 35px rgba(0,0,0,0.2)",
    boxSizing: "border-box",
  },

  topRow: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    gap: "10px",
  },

  title: {
    margin: 0,
    fontSize: "28px",
    color: "#111",
  },

  subtitle: {
    margin: "10px 0 20px 0",
    fontSize: "14px",
    lineHeight: "1.7",
    color: "#666",
  },

  iconCloseBtn: {
    background: "transparent",
    border: "none",
    fontSize: "28px",
    cursor: "pointer",
    color: "#555",
    lineHeight: 1,
  },

  form: {
    display: "flex",
    flexDirection: "column",
    gap: "12px",
  },

  input: {
    padding: "12px 14px",
    borderRadius: "10px",
    border: "1px solid #d0d0d0",
    fontSize: "14px",
    outline: "none",
  },

  button: {
    background: "#111",
    color: "#fff",
    border: "none",
    padding: "12px",
    cursor: "pointer",
    borderRadius: "10px",
    fontSize: "14px",
    fontWeight: "600",
    marginTop: "4px",
  },

  message: {
    margin: "6px 0 0 0",
    fontSize: "14px",
    lineHeight: "1.6",
  },

  closeBtn: {
    marginTop: "16px",
    background: "#999",
    color: "#fff",
    border: "none",
    padding: "10px 14px",
    cursor: "pointer",
    borderRadius: "10px",
    fontSize: "14px",
    width: "100%",
  },
};

export default VisitForm;