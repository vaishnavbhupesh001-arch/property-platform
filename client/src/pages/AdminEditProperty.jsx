import { useEffect, useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import { getSingleProperty, getProperties } from "../services/api";
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
        <button style={styles.arrowLeft} onClick={prevImage}>
          ❮
        </button>

        <img
          src={galleryImages[currentIndex]}
          alt="property"
          style={styles.mainImage}
        />

        <button style={styles.arrowRight} onClick={nextImage}>
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
            <p>
              <strong>BHK:</strong> {property.bhk}
            </p>
            <p>
              <strong>Area:</strong> {property.sqft} sqft
            </p>
            <p>
              <strong>Furnishing:</strong> {property.furnishingType}
            </p>
            <p>
              <strong>Payment Type:</strong>{" "}
              {property.paymentTypeAllowed?.join(", ")}
            </p>
          </div>

          <div style={styles.actions}>
            <button
              style={styles.visitBtn}
              onClick={() => setShowPopup(true)}
            >
              Schedule Visit
            </button>

            <button style={styles.loanBtn}>Apply for Loan</button>

            <button style={styles.contactBtn}>Contact Owner</button>
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

      {showPopup && <VisitForm closePopup={() => setShowPopup(false)} />}
    </div>
  );
}

const styles = {
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
    padding: "10px",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
  },

  loanBtn: {
    background: "#007bff",
    color: "#fff",
    padding: "10px",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
  },

  contactBtn: {
    background: "#28a745",
    color: "#fff",
    padding: "10px",
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

  message: {
    padding: "40px",
  },
};

export default PropertyDetails;