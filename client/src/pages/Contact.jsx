import { useState } from "react";
import { sendContactForm } from "../services/api";

function Contact() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
    meetingTime: "",
  });

  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

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
      setSuccessMessage("");

      await sendContactForm(form);

      setSuccessMessage(
        "Your message has been submitted successfully and sent to the owner."
      );

      setForm({
        name: "",
        email: "",
        phone: "",
        message: "",
        meetingTime: "",
      });
    } catch (error) {
      console.error("Error submitting contact form:", error);
      setSuccessMessage("Failed to submit your message.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.page}>
      <div style={styles.container}>
        <div style={styles.header}>
          <p style={styles.label}>Contact Us</p>
          <h1 style={styles.title}>Let’s Connect</h1>
          <p style={styles.subtitle}>
            Have questions about a property or want to schedule a discussion?
            Send us your details and preferred time.
          </p>
        </div>

        <div style={styles.card}>
          <form onSubmit={handleSubmit} style={styles.form}>
            <div style={styles.fieldGroup}>
              <label style={styles.labelText}>Name</label>
              <input
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
                placeholder="Enter your name"
                required
                style={styles.input}
              />
            </div>

            <div style={styles.fieldGroup}>
              <label style={styles.labelText}>Email</label>
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                placeholder="Enter your email"
                required
                style={styles.input}
              />
            </div>

            <div style={styles.fieldGroup}>
              <label style={styles.labelText}>Phone Number</label>
              <input
                type="tel"
                name="phone"
                value={form.phone}
                onChange={handleChange}
                placeholder="Enter your phone number"
                required
                style={styles.input}
              />
            </div>

            <div style={styles.fieldGroup}>
              <label style={styles.labelText}>Message</label>
              <textarea
                name="message"
                value={form.message}
                onChange={handleChange}
                placeholder="Write your message"
                required
                rows="5"
                style={styles.textarea}
              />
            </div>

            <div style={styles.fieldGroup}>
              <label style={styles.labelText}>Time to meet with me</label>
              <input
                type="datetime-local"
                name="meetingTime"
                value={form.meetingTime}
                onChange={handleChange}
                required
                style={styles.input}
              />
            </div>

            <button type="submit" style={styles.button} disabled={loading}>
              {loading ? "Submitting..." : "Submit"}
            </button>

            {successMessage && (
              <p style={styles.successMessage}>{successMessage}</p>
            )}
          </form>
        </div>
      </div>
    </div>
  );
}

const styles = {
  page: {
    minHeight: "100vh",
    background: "#f8f8f8",
    padding: "60px 20px",
    boxSizing: "border-box",
  },

  container: {
    maxWidth: "820px",
    margin: "0 auto",
  },

  header: {
    textAlign: "center",
    marginBottom: "35px",
  },

  label: {
    margin: "0 0 10px 0",
    fontSize: "14px",
    fontWeight: "600",
    letterSpacing: "1px",
    textTransform: "uppercase",
    color: "#666",
  },

  title: {
    fontSize: "40px",
    margin: "0 0 14px 0",
    color: "#111",
  },

  subtitle: {
    fontSize: "16px",
    lineHeight: "1.7",
    color: "#666",
    margin: 0,
  },

  card: {
    background: "#fff",
    borderRadius: "18px",
    padding: "32px",
    boxShadow: "0 6px 24px rgba(0,0,0,0.08)",
  },

  form: {
    display: "grid",
    gap: "20px",
  },

  fieldGroup: {
    display: "grid",
    gap: "8px",
  },

  labelText: {
    fontSize: "15px",
    fontWeight: "600",
    color: "#222",
  },

  input: {
    width: "100%",
    padding: "14px 16px",
    borderRadius: "10px",
    border: "1px solid #d6d6d6",
    fontSize: "15px",
    outline: "none",
    boxSizing: "border-box",
  },

  textarea: {
    width: "100%",
    padding: "14px 16px",
    borderRadius: "10px",
    border: "1px solid #d6d6d6",
    fontSize: "15px",
    outline: "none",
    resize: "vertical",
    boxSizing: "border-box",
  },

  button: {
    background: "#111",
    color: "#fff",
    border: "none",
    padding: "14px 20px",
    borderRadius: "10px",
    cursor: "pointer",
    fontSize: "15px",
    fontWeight: "600",
  },

  successMessage: {
    margin: 0,
    fontSize: "14px",
    color: "#1f7a1f",
  },
};

export default Contact;