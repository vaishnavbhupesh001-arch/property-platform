import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import PropertyCard from "../components/PropertyCard";
import { getProperties } from "../services/api";

function Wishlist() {
  const navigate = useNavigate();
  const [wishlistProperties, setWishlistProperties] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchWishlist = async () => {
    try {
      const saved = JSON.parse(localStorage.getItem("wishlist")) || [];
      const res = await getProperties();
      const allProperties = res.data.properties || [];

      const filtered = allProperties.filter((p) => saved.includes(p._id));
      setWishlistProperties(filtered);
    } catch (error) {
      console.error("Wishlist error:", error);
      setWishlistProperties([]);
    } finally {
      setLoading(false);
    }
  };


  useEffect(() => {
    fetchWishlist();
  }, []);

  return (
    <div style={styles.page}>
      <div style={styles.header}>
        <p style={styles.label}>Saved Properties</p>
        <h1 style={styles.title}>❤️ Your Wishlist</h1>
        <p style={styles.subtitle}>
          Keep track of the homes you liked and revisit them anytime.
        </p>
      </div>

      {!loading && wishlistProperties.length > 0 && (
        <div style={styles.topBar}>
          <p style={styles.countText}>
            {wishlistProperties.length} saved propert
            {wishlistProperties.length > 1 ? "ies" : "y"}
          </p>

          <button
            style={styles.browseBtn}
            onClick={() => navigate("/properties")}
          >
            Browse More Properties
          </button>
        </div>
      )}

      {loading ? (
        <p>Loading wishlist...</p>
      ) : wishlistProperties.length === 0 ? (
        <div style={styles.emptyState}>
          <div style={styles.emptyIcon}>🤍</div>
          <h2 style={styles.emptyTitle}>No saved properties yet</h2>
          <p style={styles.emptyText}>
            Start exploring properties and save your favourites here.
          </p>
          <button
            style={styles.emptyBtn}
            onClick={() => navigate("/properties")}
          >
            Go to Properties
          </button>
        </div>
      ) : (
        <div style={styles.grid}>
          {wishlistProperties.map((property) => (
            <PropertyCard key={property._id} property={property} />
          ))}
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
    minHeight: "100vh",
    boxSizing: "border-box",
  },

  header: {
    textAlign: "center",
    maxWidth: "760px",
    margin: "0 auto 35px auto",
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

  topBar: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    gap: "15px",
    flexWrap: "wrap",
    marginBottom: "30px",
  },

  countText: {
    margin: 0,
    fontSize: "15px",
    fontWeight: "600",
    color: "#333",
  },

  browseBtn: {
    background: "#111",
    color: "#fff",
    border: "none",
    padding: "12px 18px",
    borderRadius: "10px",
    cursor: "pointer",
    fontSize: "14px",
    fontWeight: "600",
  },

  emptyState: {
    background: "#fff",
    borderRadius: "18px",
    padding: "50px 25px",
    textAlign: "center",
    boxShadow: "0 6px 24px rgba(0,0,0,0.08)",
    maxWidth: "700px",
    margin: "20px auto 0 auto",
  },

  emptyIcon: {
    fontSize: "54px",
    marginBottom: "16px",
  },

  emptyTitle: {
    margin: "0 0 12px 0",
    fontSize: "28px",
    color: "#111",
  },

  emptyText: {
    margin: "0 0 22px 0",
    fontSize: "15px",
    lineHeight: "1.7",
    color: "#666",
  },

  emptyBtn: {
    background: "#111",
    color: "#fff",
    border: "none",
    padding: "14px 22px",
    borderRadius: "10px",
    cursor: "pointer",
    fontSize: "15px",
    fontWeight: "600",
  },

  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
    gap: "24px",
  },
};

export default Wishlist;