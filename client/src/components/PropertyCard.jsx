import { useNavigate } from "react-router-dom";
import propertyVideo from "../assets/videos/property-tour.mp4";
import { useState } from "react";

import propertyImages from "../utils/propertyImages";   // ✅ added

function PropertyCard({ property }) {

  const navigate = useNavigate();

  const propertyId = property._id || property.id;

  const [isHovered, setIsHovered] = useState(false);

  const [isFavorite, setIsFavorite] = useState(() => {
    const saved = JSON.parse(localStorage.getItem("wishlist")) || [];
    return saved.includes(propertyId);
  });

  const openDetails = () => {
    navigate(`/property/${propertyId}`);
  };

  const paymentText =
    property.paymentTypeAllowed?.includes("loan") &&
    property.paymentTypeAllowed?.includes("full")
      ? "Full + Loan"
      : property.paymentTypeAllowed?.includes("loan")
      ? "Loan"
      : "Full Payment";

  const toggleWishlist = (e) => {
    e.stopPropagation();

    let saved = JSON.parse(localStorage.getItem("wishlist")) || [];

    if (saved.includes(propertyId)) {
      saved = saved.filter((id) => id !== propertyId);
      setIsFavorite(false);
    } else {
      saved.push(propertyId);
      setIsFavorite(true);
    }

    localStorage.setItem("wishlist", JSON.stringify(saved));
  };

  const firstImageName = property.images?.[0];

  // ✅ STEP 2 image mapping
  const imageSrc =
    propertyImages[firstImageName] || propertyImages["property.jpg"];

  return (
    <div
      style={{
        ...styles.card,
        transform: isHovered ? "translateY(-8px)" : "translateY(0)",
        boxShadow: isHovered
          ? "0 14px 30px rgba(0,0,0,0.14)"
          : "0 4px 18px rgba(0,0,0,0.08)",
      }}
      onClick={openDetails}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >

      <div style={styles.imageContainer}>

        {isHovered ? (
          <video
            src={propertyVideo}
            style={styles.image}
            autoPlay
            muted
            loop
            playsInline
          />
        ) : (
          <img src={imageSrc} alt={property.title} style={styles.image} />
        )}

        <div style={styles.heart} onClick={toggleWishlist}>
          {isFavorite ? "❤️" : "🤍"}
        </div>

        <div style={styles.topBadges}>
          <span style={styles.badgeDark}>{paymentText}</span>

          <span style={styles.badgeLight}>
            {property.furnishingType || "Not available"}
          </span>
        </div>

        <div style={styles.priceTag}>
          ₹ {property.price?.toLocaleString() || "N/A"}
        </div>
      </div>

      <div style={styles.details}>
        <h3 style={styles.title}>{property.title}</h3>

        <p style={styles.location}>
          {property.locality || "Area not available"},{" "}
          {property.city || "City not available"}
        </p>

        <div style={styles.infoRow}>
          <span style={styles.infoItem}>{property.bhk} BHK</span>
          <span style={styles.dot}>•</span>
          <span style={styles.infoItem}>{property.sqft} sqft</span>
        </div>

        <button
          style={styles.viewBtn}
          onClick={(e) => {
            e.stopPropagation();
            openDetails();
          }}
        >
          View Details
        </button>
      </div>
    </div>
  );
}

const styles = {
  card: { borderRadius: "18px", overflow: "hidden", cursor: "pointer", background: "#fff", transition: "all 0.3s ease" },
  imageContainer: { position: "relative" },
  image: { width: "100%", height: "240px", objectFit: "cover", display: "block" },
  heart: { position: "absolute", top: "14px", right: "14px", fontSize: "22px", cursor: "pointer", zIndex: 10 },
  topBadges: { position: "absolute", top: "14px", left: "14px", right: "60px", display: "flex", justifyContent: "space-between", gap: "10px", flexWrap: "wrap" },
  badgeDark: { background: "rgba(17,17,17,0.9)", color: "#fff", padding: "7px 12px", borderRadius: "999px", fontSize: "12px", fontWeight: "600" },
  badgeLight: { background: "rgba(255,255,255,0.92)", color: "#111", padding: "7px 12px", borderRadius: "999px", fontSize: "12px", fontWeight: "600", textTransform: "capitalize" },
  priceTag: { position: "absolute", bottom: "14px", left: "14px", background: "#111", color: "#fff", padding: "9px 14px", borderRadius: "10px", fontSize: "15px", fontWeight: "700" },
  details: { padding: "18px" },
  title: { margin: "0 0 10px 0", fontSize: "22px", color: "#111" },
  location: { margin: "0 0 12px 0", fontSize: "14px", color: "#666" },
  infoRow: { display: "flex", alignItems: "center", gap: "8px", marginBottom: "16px" },
  infoItem: { fontSize: "14px", color: "#333", fontWeight: "500" },
  dot: { color: "#888" },
  viewBtn: { background: "#111", color: "#fff", border: "none", padding: "12px 16px", borderRadius: "10px", cursor: "pointer", fontSize: "14px", fontWeight: "600", width: "100%" },
};

export default PropertyCard;