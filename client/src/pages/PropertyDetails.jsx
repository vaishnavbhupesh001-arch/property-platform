import { useEffect, useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import { getSingleProperty, getProperties } from "../services/api";
import { sendOwnerEnquiry } from "../services/api";
import PropertyCard from "../components/PropertyCard";
import VisitForm from "../components/VisitForm";
import propertyVideo from "../assets/videos/property-tour.mp4";
import propertyImages from "../utils/propertyImages";

function PropertyDetails() {
  const { id } = useParams();

  const [property, setProperty] = useState(null);
  const [allProperties, setAllProperties] = useState([]);
  const [loading, setLoading] = useState(true);

  const [showPopup, setShowPopup] = useState(false);
  const [showOwnerPopup, setShowOwnerPopup] = useState(false);
  const [showFullscreen, setShowFullscreen] = useState(false);

  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    let ignore = false;

    const loadData = async () => {
      try {
        const [singleRes, allRes] = await Promise.all([
          getSingleProperty(id),
          getProperties(),
        ]);

        if (!ignore) {
          setProperty(singleRes.data.property);
          setAllProperties(allRes.data.properties || []);
          setCurrentIndex(0);
        }
      } catch (error) {
        console.error("Error fetching property details:", error);
      } finally {
        if (!ignore) {
          setLoading(false);
        }
      }
    };

    loadData();

    return () => {
      ignore = true;
    };
  }, [id]);

  const galleryImages = useMemo(() => {
    if (!property?.images || property.images.length === 0) {
      return [propertyImages["property.jpg"]];
    }

    return property.images.map(
      (img) => propertyImages[img] || propertyImages["property.jpg"]
    );
  }, [property]);

  const nextImage = () => {
    setCurrentIndex((prev) =>
      prev === galleryImages.length - 1 ? 0 : prev + 1
    );
  };

  const prevImage = () => {
    setCurrentIndex((prev) =>
      prev === 0 ? galleryImages.length - 1 : prev - 1
    );
  };

  if (loading) {
    return <p style={styles.message}>Loading property details...</p>;
  }

  if (!property) {
    return <p style={styles.message}>Property not found.</p>;
  }

  const relatedProperties = allProperties.filter(
    (item) => item._id !== property._id
  );

  return (
    <div style={styles.page}>
      <div style={styles.sliderContainer}>
        <button type="button" style={styles.arrowLeft} onClick={prevImage}>
          ❮
        </button>

        <img
          src={galleryImages[currentIndex]}
          alt="property"
          style={styles.mainImage}
          onClick={() => setShowFullscreen(true)}
        />

        <button type="button" style={styles.arrowRight} onClick={nextImage}>
          ❯
        </button>
      </div>

      <div style={styles.thumbnailRow}>
        {galleryImages.map((img, index) => (
          <img
            key={index}
            src={img}
            alt="thumb"
            style={{
              ...styles.thumbnail,
              border:
                currentIndex === index
                  ? "2px solid black"
                  : "2px solid transparent",
            }}
            onClick={() => setCurrentIndex(index)}
          />
        ))}
      </div>

      <div style={styles.content}>
        <div style={styles.left}>
          <h1 style={styles.title}>{property.title}</h1>

          <p style={styles.price}>₹ {property.price?.toLocaleString()}</p>

          <p style={styles.location}>
            {property.locality}, {property.city}
          </p>

          <div style={styles.infoBox}>
            <p><strong>BHK:</strong> {property.bhk}</p>
            <p><strong>Area:</strong> {property.sqft} sqft</p>
            <p><strong>Furnishing:</strong> {property.furnishingType}</p>
            <p>
              <strong>Payment Type:</strong>{" "}
              {property.paymentTypeAllowed?.join(", ")}
            </p>
          </div>

          <div style={styles.actions}>
            <button
              type="button"
              style={styles.visitBtn}
              onClick={() => setShowPopup(true)}
            >
              Schedule Visit
            </button>

            <button type="button" style={styles.loanBtn}>
              Apply for Loan
            </button>

            <button
              type="button"
              style={styles.contactBtn}
              onClick={() => setShowOwnerPopup(true)}
            >
              Contact Owner
            </button>
          </div>
        </div>

        <div style={styles.right}>
          <video
            src={propertyVideo}
            controls
            autoPlay
            muted
            loop
            style={styles.video}
          />
        </div>
      </div>

      <div style={styles.amenitiesSection}>
        <h2>Amenities</h2>

        <div style={styles.amenitiesGrid}>
          <div style={styles.amenity}>🚗 Parking</div>
          <div style={styles.amenity}>🛗 Lift</div>
          <div style={styles.amenity}>🛡 Security</div>
          <div style={styles.amenity}>🏊 Swimming Pool</div>
          <div style={styles.amenity}>🏋 Gym</div>
          <div style={styles.amenity}>🌳 Garden</div>
          <div style={styles.amenity}>⚡ Power Backup</div>
          <div style={styles.amenity}>📹 CCTV</div>
        </div>
      </div>

      <div style={styles.mapSection}>
        <h2>Location Map</h2>

        <iframe
          title="map"
          src="https://maps.google.com/maps?q=Mumbai&t=&z=13&ie=UTF8&iwloc=&output=embed"
          style={styles.map}
        ></iframe>
      </div>

      <div style={styles.relatedSection}>
        <h2>More Properties</h2>

        <div style={styles.grid}>
          {relatedProperties.map((item) => (
            <PropertyCard key={item._id} property={item} />
          ))}
        </div>
      </div>

      {showPopup && (
        <VisitForm closePopup={() => setShowPopup(false)} />
      )}

      {showOwnerPopup && (
  <div style={styles.ownerOverlay}>
    <div style={styles.ownerPopup}>

      <button
        style={styles.ownerCloseBtn}
        onClick={() => setShowOwnerPopup(false)}
      >
        ✕
      </button>

      <h2 style={styles.ownerTitle}>Contact Owner</h2>

      <form
        onSubmit={async (e) => {

          e.preventDefault();

          const formData = new FormData(e.target);

          const data = {
            name: formData.get("name"),
            email: formData.get("email"),
            phone: formData.get("phone"),
            message: formData.get("message"),
            propertyId: property._id,
          };

          try {

            await sendOwnerEnquiry(data);

            alert("Message sent successfully");

            setShowOwnerPopup(false);

          } catch (err) {

            console.error(err);

            alert("Failed to send message");

          }

        }}
      >

        <input
          name="name"
          placeholder="Your Name"
          required
          style={styles.input}
        />

        <input
          name="email"
          placeholder="Email"
          required
          style={styles.input}
        />

        <input
          name="phone"
          placeholder="Phone"
          required
          style={styles.input}
        />

        <textarea
          name="message"
          placeholder="Message"
          required
          style={styles.textarea}
        />

        <button style={styles.ownerActionBtn}>
          Send Message
        </button>

      </form>

    </div>
  </div>
)}

      {showFullscreen && (
        <div style={styles.fullscreenOverlay}>
          <button
            type="button"
            style={styles.fullscreenClose}
            onClick={() => setShowFullscreen(false)}
          >
            ✕
          </button>

          <button
            type="button"
            style={styles.fullscreenArrowLeft}
            onClick={prevImage}
          >
            ❮
          </button>

          <img
            src={galleryImages[currentIndex]}
            alt="fullscreen property"
            style={styles.fullscreenImage}
          />

          <button
            type="button"
            style={styles.fullscreenArrowRight}
            onClick={nextImage}
          >
            ❯
          </button>
        </div>
      )}
    </div>
  );
}

const styles = {

  input: {
  width: "100%",
  padding: "10px",
  marginBottom: "10px",
  borderRadius: "8px",
  border: "1px solid #ccc",
},

textarea: {
  width: "100%",
  padding: "10px",
  height: "80px",
  marginBottom: "10px",
  borderRadius: "8px",
  border: "1px solid #ccc",
},

  page: {
    padding: "40px",
    background: "#f8f8f8",
  },

  sliderContainer: {
    position: "relative",
  },

  mainImage: {
    width: "100%",
    height: "450px",
    objectFit: "cover",
    borderRadius: "16px",
    cursor: "zoom-in",
  },

  arrowLeft: {
    position: "absolute",
    top: "50%",
    left: "10px",
    fontSize: "30px",
    background: "#000",
    color: "#fff",
    border: "none",
    cursor: "pointer",
    padding: "8px 12px",
    borderRadius: "8px",
  },

  arrowRight: {
    position: "absolute",
    top: "50%",
    right: "10px",
    fontSize: "30px",
    background: "#000",
    color: "#fff",
    border: "none",
    cursor: "pointer",
    padding: "8px 12px",
    borderRadius: "8px",
  },

  thumbnailRow: {
    display: "flex",
    gap: "10px",
    marginTop: "10px",
    flexWrap: "wrap",
  },

  thumbnail: {
    width: "120px",
    height: "80px",
    objectFit: "cover",
    cursor: "pointer",
    borderRadius: "8px",
  },

  content: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: "30px",
    marginTop: "30px",
  },

  left: {
    background: "#fff",
    padding: "25px",
    borderRadius: "12px",
  },

  right: {
    background: "#fff",
    padding: "20px",
    borderRadius: "12px",
  },

  title: {
    fontSize: "32px",
  },

  price: {
    fontSize: "24px",
    fontWeight: "bold",
  },

  location: {
    color: "#666",
  },

  infoBox: {
    marginTop: "10px",
    display: "grid",
    gap: "8px",
  },

  actions: {
    marginTop: "20px",
    display: "flex",
    gap: "10px",
    flexWrap: "wrap",
  },

  visitBtn: {
    background: "#000",
    color: "#fff",
    padding: "10px 14px",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
  },

  loanBtn: {
    background: "#007bff",
    color: "#fff",
    padding: "10px 14px",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
  },

  contactBtn: {
    background: "#28a745",
    color: "#fff",
    padding: "10px 14px",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
  },

  video: {
    width: "100%",
    borderRadius: "12px",
  },

  amenitiesSection: {
    marginTop: "40px",
    background: "#fff",
    padding: "25px",
    borderRadius: "12px",
  },

  amenitiesGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))",
    gap: "10px",
    marginTop: "15px",
  },

  amenity: {
    background: "#f4f4f4",
    padding: "10px",
    textAlign: "center",
    borderRadius: "8px",
  },

  mapSection: {
    marginTop: "40px",
    background: "#fff",
    padding: "25px",
    borderRadius: "12px",
  },

  map: {
    width: "100%",
    height: "350px",
    border: "0",
    borderRadius: "12px",
  },

  relatedSection: {
    marginTop: "50px",
  },

  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
    gap: "25px",
  },

  ownerOverlay: {
    position: "fixed",
    inset: 0,
    background: "rgba(0,0,0,0.55)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 3000,
    padding: "20px",
    boxSizing: "border-box",
  },

  ownerPopup: {
    width: "100%",
    maxWidth: "420px",
    background: "#fff",
    borderRadius: "18px",
    padding: "28px",
    boxShadow: "0 10px 35px rgba(0,0,0,0.2)",
    position: "relative",
    boxSizing: "border-box",
  },

  ownerCloseBtn: {
    position: "absolute",
    top: "14px",
    right: "16px",
    background: "transparent",
    border: "none",
    fontSize: "24px",
    cursor: "pointer",
    color: "#555",
  },

  ownerTitle: {
    margin: "0 0 18px 0",
    fontSize: "28px",
    color: "#111",
  },

  ownerText: {
    margin: "0 0 12px 0",
    fontSize: "15px",
    lineHeight: "1.7",
    color: "#444",
  },

  ownerActionBtn: {
    marginTop: "10px",
    width: "100%",
    background: "#111",
    color: "#fff",
    border: "none",
    padding: "12px",
    borderRadius: "10px",
    cursor: "pointer",
    fontSize: "14px",
    fontWeight: "600",
  },

  fullscreenOverlay: {
    position: "fixed",
    inset: 0,
    background: "rgba(0,0,0,0.92)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 2000,
    padding: "20px",
    boxSizing: "border-box",
  },

  fullscreenImage: {
    maxWidth: "90%",
    maxHeight: "85vh",
    objectFit: "contain",
    borderRadius: "12px",
  },

  fullscreenClose: {
    position: "absolute",
    top: "20px",
    right: "25px",
    background: "transparent",
    color: "#fff",
    border: "none",
    fontSize: "34px",
    cursor: "pointer",
  },

  fullscreenArrowLeft: {
    position: "absolute",
    left: "25px",
    background: "rgba(255,255,255,0.12)",
    color: "#fff",
    border: "none",
    fontSize: "34px",
    padding: "10px 14px",
    borderRadius: "10px",
    cursor: "pointer",
  },

  fullscreenArrowRight: {
    position: "absolute",
    right: "25px",
    background: "rgba(255,255,255,0.12)",
    color: "#fff",
    border: "none",
    fontSize: "34px",
    padding: "10px 14px",
    borderRadius: "10px",
    cursor: "pointer",
  },

  message: {
    padding: "40px",
  },
};

export default PropertyDetails;