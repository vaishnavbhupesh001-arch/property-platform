import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function AdminProperties() {
  const navigate = useNavigate();

  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchProperties = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/properties");
      setProperties(res.data.properties || []);
    } catch (error) {
      console.error("Error fetching properties:", error);
      setProperties([]);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this property?"
    );

    if (!confirmDelete) return;

    try {
      await axios.delete(`http://localhost:5000/api/properties/${id}`);
      setProperties((prev) => prev.filter((item) => item._id !== id));
    } catch (error) {
      console.error("Error deleting property:", error);
      alert("Failed to delete property");
    }
  };

  useEffect(() => {
    fetchProperties();
  }, []);

  return (
    <div style={styles.page}>
      <div style={styles.topBar}>
        <div>
          <p style={styles.label}>Admin Panel</p>
          <h1 style={styles.title}>Manage Properties</h1>
        </div>

        <button
          style={styles.addBtn}
          onClick={() => navigate("/admin-add-property")}
        >
          + Add Property
        </button>
      </div>

      {loading ? (
        <p>Loading properties...</p>
      ) : properties.length === 0 ? (
        <p>No properties found.</p>
      ) : (
        <div style={styles.tableWrapper}>
          <table style={styles.table}>
            <thead>
              <tr>
                <th style={styles.th}>Title</th>
                <th style={styles.th}>City</th>
                <th style={styles.th}>Locality</th>
                <th style={styles.th}>Price</th>
                <th style={styles.th}>BHK</th>
                <th style={styles.th}>Action</th>
              </tr>
            </thead>

            <tbody>
              {properties.map((property) => (
                <tr key={property._id}>
                  <td style={styles.td}>{property.title}</td>
                  <td style={styles.td}>{property.city}</td>
                  <td style={styles.td}>{property.locality}</td>
                  <td style={styles.td}>₹ {property.price?.toLocaleString()}</td>
                  <td style={styles.td}>{property.bhk}</td>
                  <td style={styles.td}>
                    <div style={styles.actionRow}>
                      <button
                        style={styles.editBtn}
                        onClick={() =>
                          navigate(`/admin-edit-property/${property._id}`)
                        }
                      >
                        Edit
                      </button>

                      <button
                        style={styles.deleteBtn}
                        onClick={() => handleDelete(property._id)}
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

const styles = {
  page: {
    padding: "50px 40px",
    maxWidth: "1200px",
    margin: "0 auto",
    boxSizing: "border-box",
  },

  topBar: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    gap: "20px",
    marginBottom: "30px",
    flexWrap: "wrap",
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
    margin: 0,
    color: "#111",
  },

  addBtn: {
    background: "#111",
    color: "#fff",
    border: "none",
    padding: "14px 18px",
    borderRadius: "10px",
    cursor: "pointer",
    fontSize: "14px",
    fontWeight: "600",
    whiteSpace: "nowrap",
  },

  tableWrapper: {
    overflowX: "auto",
    background: "#fff",
    borderRadius: "18px",
    boxShadow: "0 6px 24px rgba(0,0,0,0.08)",
    padding: "15px",
  },

  table: {
    width: "100%",
    borderCollapse: "collapse",
    minWidth: "900px",
  },

  th: {
    border: "1px solid #e5e5e5",
    padding: "16px",
    textAlign: "left",
    background: "#f8f8f8",
  },

  td: {
    border: "1px solid #e5e5e5",
    padding: "16px",
    color: "#333",
  },

  actionRow: {
    display: "flex",
    gap: "10px",
  },

  editBtn: {
    background: "#111",
    color: "#fff",
    border: "none",
    padding: "10px 14px",
    borderRadius: "8px",
    cursor: "pointer",
    fontSize: "13px",
    fontWeight: "600",
  },

  deleteBtn: {
    background: "#c62828",
    color: "#fff",
    border: "none",
    padding: "10px 14px",
    borderRadius: "8px",
    cursor: "pointer",
    fontSize: "13px",
    fontWeight: "600",
  },
};

export default AdminProperties;