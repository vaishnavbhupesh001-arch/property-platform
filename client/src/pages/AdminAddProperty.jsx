import { useState } from "react";
import { createProperty } from "../services/api";

function AdminAddProperty() {
  const [form, setForm] = useState({
    title: "",
    price: "",
    location: "",
    city: "",
    locality: "",
    bhk: "",
    sqft: "",
    paymentTypeAllowed: "full",
    furnishingType: "fully-furnished",
    image1: "",
    image2: "",
    image3: "",
    image4: "",
    image5: "",
    videoUrl: "",
    status: "approved",
  });

  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setMessage("");

      const payload = {
        title: form.title,
        price: Number(form.price),
        location: form.location,
        city: form.city,
        locality: form.locality,
        bhk: Number(form.bhk),
        sqft: Number(form.sqft),
        paymentTypeAllowed: [form.paymentTypeAllowed],
        furnishingType: form.furnishingType,
        images: [
          form.image1,
          form.image2,
          form.image3,
          form.image4,
          form.image5,
        ].filter(Boolean),
        videoUrl: form.videoUrl,
        status: form.status,
      };

      await createProperty(payload);

      setMessage("Property added successfully ✅");

      setForm({
        title: "",
        price: "",
        location: "",
        city: "",
        locality: "",
        bhk: "",
        sqft: "",
        paymentTypeAllowed: "full",
        furnishingType: "fully-furnished",
        image1: "",
        image2: "",
        image3: "",
        image4: "",
        image5: "",
        videoUrl: "",
        status: "approved",
      });
    } catch (error) {
      console.error("Error adding property:", error);
      setMessage(
        error?.response?.data?.message || "Failed to add property ❌"
      );
    }
  };

  return (
    <div style={styles.page}>
      <div style={styles.card}>
        <h1 style={styles.title}>Admin Add Property</h1>

        <form onSubmit={handleSubmit} style={styles.form}>
          <input
            name="title"
            value={form.title}
            onChange={handleChange}
            placeholder="Title"
            required
            style={styles.input}
          />

          <input
            type="number"
            name="price"
            value={form.price}
            onChange={handleChange}
            placeholder="Price"
            required
            style={styles.input}
          />

          <input
            name="location"
            value={form.location}
            onChange={handleChange}
            placeholder="Location"
            required
            style={styles.input}
          />

          <input
            name="city"
            value={form.city}
            onChange={handleChange}
            placeholder="City"
            required
            style={styles.input}
          />

          <input
            name="locality"
            value={form.locality}
            onChange={handleChange}
            placeholder="Locality"
            required
            style={styles.input}
          />

          <input
            type="number"
            name="bhk"
            value={form.bhk}
            onChange={handleChange}
            placeholder="BHK (only number, e.g. 2)"
            required
            style={styles.input}
          />

          <input
            type="number"
            name="sqft"
            value={form.sqft}
            onChange={handleChange}
            placeholder="Sqft"
            required
            style={styles.input}
          />

          <select
            name="paymentTypeAllowed"
            value={form.paymentTypeAllowed}
            onChange={handleChange}
            style={styles.input}
          >
            <option value="full">Full Payment</option>
            <option value="loan">Loan</option>
          </select>

          <select
            name="furnishingType"
            value={form.furnishingType}
            onChange={handleChange}
            style={styles.input}
          >
            <option value="fully-furnished">Fully Furnished</option>
            <option value="semi-furnished">Semi-Furnished</option>
            <option value="unfurnished">Unfurnished</option>
          </select>

          <input
            name="image1"
            value={form.image1}
            onChange={handleChange}
            placeholder="Image 1 name (e.g. property.jpg)"
            style={styles.input}
          />

          <input
            name="image2"
            value={form.image2}
            onChange={handleChange}
            placeholder="Image 2 name (e.g. property2.jpg)"
            style={styles.input}
          />

          <input
            name="image3"
            value={form.image3}
            onChange={handleChange}
            placeholder="Image 3 name (e.g. property3.jpg)"
            style={styles.input}
          />

          <input
            name="image4"
            value={form.image4}
            onChange={handleChange}
            placeholder="Image 4 name (e.g. property4.jpg)"
            style={styles.input}
          />

          <input
            name="image5"
            value={form.image5}
            onChange={handleChange}
            placeholder="Image 5 name (e.g. property5.jpg)"
            style={styles.input}
          />

          <input
            name="videoUrl"
            value={form.videoUrl}
            onChange={handleChange}
            placeholder="Video URL / file name"
            style={styles.input}
          />

          <button type="submit" style={styles.button}>
            Add Property
          </button>
        </form>

        {message && <p style={styles.message}>{message}</p>}
      </div>
    </div>
  );
}

const styles = {
  page: {
    padding: "50px 20px",
    background: "#f8f8f8",
    minHeight: "100vh",
  },
  card: {
    maxWidth: "800px",
    margin: "0 auto",
    background: "#fff",
    padding: "30px",
    borderRadius: "18px",
    boxShadow: "0 6px 24px rgba(0,0,0,0.08)",
  },
  title: {
    marginBottom: "20px",
  },
  form: {
    display: "grid",
    gap: "15px",
  },
  input: {
    padding: "14px",
    borderRadius: "10px",
    border: "1px solid #ccc",
    fontSize: "14px",
  },
  button: {
    background: "#111",
    color: "#fff",
    border: "none",
    padding: "14px",
    borderRadius: "10px",
    cursor: "pointer",
    fontSize: "15px",
    fontWeight: "600",
  },
  message: {
    marginTop: "15px",
    fontWeight: "600",
  },
};

export default AdminAddProperty;