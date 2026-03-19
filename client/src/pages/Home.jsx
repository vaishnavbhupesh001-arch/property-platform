import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getProperties } from "../services/api";
import PropertyCard from "../components/PropertyCard";
import propertyImage from "../assets/images/property.jpg";

function Home() {
  const navigate = useNavigate();
  const [featuredProperties, setFeaturedProperties] = useState([]);

  useEffect(() => {
    let ignore = false;

    const loadFeaturedProperties = async () => {
      try {
        const res = await getProperties();

        if (!ignore) {
          setFeaturedProperties((res.data.properties || []).slice(0, 6));
        }
      } catch (error) {
        console.error("Error loading featured properties:", error);
      }
    };

    loadFeaturedProperties();

    return () => {
      ignore = true;
    };
  }, []);

  return (
    <div style={styles.page}>
      <section style={styles.hero}>
        <div style={styles.overlay}>
          <div style={styles.content}>
            <h1 style={styles.title}>Find Your Perfect Home with Ease</h1>

            <p style={styles.subtitle}>
              Explore premium flats, compare options, schedule visits, and
              choose full payment or loan — all in one place.
            </p>

            <div style={styles.actions}>
              <button
                style={styles.primaryBtn}
                onClick={() => navigate("/properties")}
              >
                Explore Properties
              </button>

              <button
                style={styles.secondaryBtn}
                onClick={() => navigate("/contact")}
              >
                Contact Us
              </button>
            </div>
          </div>
        </div>
      </section>

      <section style={styles.featuredSection}>
        <div style={styles.sectionTop}>
          <p style={styles.sectionLabel}>Featured Collection</p>
          <h2 style={styles.sectionTitle}>Featured Properties</h2>
          <p style={styles.sectionSubtitle}>
            Handpicked homes for buyers looking for comfort, trust, and the
            right location.
          </p>
        </div>

        {featuredProperties.length === 0 ? (
          <p>No featured properties available.</p>
        ) : (
          <div style={styles.grid}>
            {featuredProperties.map((property) => (
              <PropertyCard key={property._id} property={property} />
            ))}
          </div>
        )}

        <div style={styles.viewAllWrapper}>
          <button
            style={styles.viewAllBtn}
            onClick={() => navigate("/properties")}
          >
            View All Properties
          </button>
        </div>
      </section>

      <section style={styles.whySection}>
        <div style={styles.sectionTop}>
          <p style={styles.sectionLabel}>Why Choose Us</p>
          <h2 style={styles.sectionTitle}>A Smarter Way to Find Your Home</h2>
          <p style={styles.sectionSubtitle}>
            We make property discovery simple, trustworthy, and convenient for
            every buyer.
          </p>
        </div>

        <div style={styles.whyGrid}>
          <div style={styles.whyCard}>
            <div style={styles.whyIcon}>✅</div>
            <h3 style={styles.whyCardTitle}>Verified Properties</h3>
            <p style={styles.whyCardText}>
              Explore trusted listings with clear information and better
              confidence.
            </p>
          </div>

          <div style={styles.whyCard}>
            <div style={styles.whyIcon}>💳</div>
            <h3 style={styles.whyCardTitle}>Loan Support</h3>
            <p style={styles.whyCardText}>
              Choose full payment or loan-based options according to your need.
            </p>
          </div>

          <div style={styles.whyCard}>
            <div style={styles.whyIcon}>📅</div>
            <h3 style={styles.whyCardTitle}>Easy Visit Booking</h3>
            <p style={styles.whyCardText}>
              Schedule property visits quickly without going through a complex
              process.
            </p>
          </div>

          <div style={styles.whyCard}>
            <div style={styles.whyIcon}>🤝</div>
            <h3 style={styles.whyCardTitle}>Trusted Process</h3>
            <p style={styles.whyCardText}>
              From browsing to enquiry and visits, everything stays organized
              in one place.
            </p>
          </div>
        </div>
      </section>

      <section style={styles.howSection}>
        <div style={styles.sectionTop}>
          <p style={styles.sectionLabel}>How It Works</p>
          <h2 style={styles.sectionTitle}>Buy Your Home in Simple Steps</h2>
          <p style={styles.sectionSubtitle}>
            From search to site visit and payment choice, the process stays
            clear and easy.
          </p>
        </div>

        <div style={styles.howGrid}>
          <div style={styles.howCard}>
            <div style={styles.stepNumber}>01</div>
            <h3 style={styles.howCardTitle}>Search Property</h3>
            <p style={styles.howCardText}>
              Browse flats by city, locality, furnishing, and payment type.
            </p>
          </div>

          <div style={styles.howCard}>
            <div style={styles.stepNumber}>02</div>
            <h3 style={styles.howCardTitle}>Choose Payment Option</h3>
            <p style={styles.howCardText}>
              Select whether you want full payment or a loan-based purchase.
            </p>
          </div>

          <div style={styles.howCard}>
            <div style={styles.stepNumber}>03</div>
            <h3 style={styles.howCardTitle}>Schedule Visit</h3>
            <p style={styles.howCardText}>
              Book a property visit directly from the details page in a few
              clicks.
            </p>
          </div>

          <div style={styles.howCard}>
            <div style={styles.stepNumber}>04</div>
            <h3 style={styles.howCardTitle}>Finalize Your Home</h3>
            <p style={styles.howCardText}>
              Compare options, connect with the owner, and move ahead with
              confidence.
            </p>
          </div>
        </div>
      </section>

            <footer style={styles.footer}>
        <div style={styles.footerGrid}>
          <div>
            <h3 style={styles.footerLogo}>PropertyPlatform</h3>
            <p style={styles.footerText}>
              Find trusted flats, compare options, schedule visits, and move
              closer to your dream home.
            </p>
          </div>

          <div>
            <h4 style={styles.footerTitle}>Quick Links</h4>
            <p style={styles.footerLink} onClick={() => navigate("/")}>Home</p>
            <p style={styles.footerLink} onClick={() => navigate("/properties")}>
              Properties
            </p>
            <p style={styles.footerLink} onClick={() => navigate("/about")}>
              About
            </p>
            <p style={styles.footerLink} onClick={() => navigate("/contact")}>
              Contact
            </p>
          </div>

          <div>
            <h4 style={styles.footerTitle}>Contact</h4>
            <p style={styles.footerText}>Mumbai, India</p>
            <p style={styles.footerText}>support@propertyplatform.com</p>
            <p style={styles.footerText}>+91 98765 43210</p>
          </div>
        </div>

        <div style={styles.footerBottom}>
          © 2026 PropertyPlatform. All rights reserved.
        </div>
      </footer>
    </div>
  );
}

const styles = {
  page: {
    width: "100%",
    minHeight: "100vh",
    background: "#f8f8f8",
    overflowX: "hidden",
  },

  hero: {
    width: "100%",
    minHeight: "90vh",
    backgroundImage: `url(${propertyImage})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    position: "relative",
    overflow: "hidden",
    boxSizing: "border-box",
  },

  overlay: {
    width: "100%",
    minHeight: "90vh",
    background: "rgba(0,0,0,0.45)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "40px 20px",
    boxSizing: "border-box",
  },

  content: {
    width: "100%",
    maxWidth: "800px",
    textAlign: "center",
    color: "#fff",
    margin: "0 auto",
    boxSizing: "border-box",
  },

  title: {
    fontSize: "56px",
    fontWeight: "700",
    lineHeight: "1.2",
    marginBottom: "20px",
  },

  subtitle: {
    fontSize: "18px",
    lineHeight: "1.7",
    marginBottom: "30px",
    color: "#f1f1f1",
  },

  actions: {
    display: "flex",
    gap: "15px",
    justifyContent: "center",
    flexWrap: "wrap",
  },

  primaryBtn: {
    background: "#111",
    color: "#fff",
    border: "none",
    padding: "14px 22px",
    borderRadius: "8px",
    cursor: "pointer",
    fontSize: "15px",
  },

  secondaryBtn: {
    background: "#fff",
    color: "#111",
    border: "none",
    padding: "14px 22px",
    borderRadius: "8px",
    cursor: "pointer",
    fontSize: "15px",
  },

  featuredSection: {
    padding: "70px 40px",
    boxSizing: "border-box",
  },

  sectionTop: {
    textAlign: "center",
    maxWidth: "750px",
    margin: "0 auto 40px auto",
  },

  sectionLabel: {
    margin: "0 0 10px 0",
    fontSize: "14px",
    fontWeight: "600",
    letterSpacing: "1px",
    textTransform: "uppercase",
    color: "#666",
  },

  sectionTitle: {
    fontSize: "38px",
    margin: "0 0 14px 0",
    color: "#111",
  },

  sectionSubtitle: {
    fontSize: "16px",
    lineHeight: "1.7",
    color: "#666",
    margin: 0,
  },

  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
    gap: "25px",
  },

  viewAllWrapper: {
    display: "flex",
    justifyContent: "center",
    marginTop: "35px",
  },

  viewAllBtn: {
    background: "#111",
    color: "#fff",
    border: "none",
    padding: "14px 22px",
    borderRadius: "8px",
    cursor: "pointer",
    fontSize: "15px",
  },

  whySection: {
    padding: "20px 40px 80px 40px",
    boxSizing: "border-box",
  },

  whyGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
    gap: "25px",
    marginTop: "10px",
  },

  whyCard: {
    background: "#fff",
    borderRadius: "16px",
    padding: "28px 22px",
    boxShadow: "0 4px 18px rgba(0,0,0,0.08)",
    textAlign: "center",
  },

  whyIcon: {
    fontSize: "34px",
    marginBottom: "14px",
  },

  whyCardTitle: {
    fontSize: "20px",
    margin: "0 0 12px 0",
    color: "#111",
  },

  whyCardText: {
    fontSize: "15px",
    lineHeight: "1.7",
    color: "#666",
    margin: 0,
  },

  howSection: {
    padding: "0 40px 90px 40px",
    boxSizing: "border-box",
  },

  howGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
    gap: "25px",
  },

  howCard: {
    background: "#fff",
    borderRadius: "16px",
    padding: "30px 24px",
    boxShadow: "0 4px 18px rgba(0,0,0,0.08)",
    textAlign: "left",
  },

  stepNumber: {
    width: "52px",
    height: "52px",
    borderRadius: "50%",
    background: "#111",
    color: "#fff",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "18px",
    fontWeight: "700",
    marginBottom: "16px",
  },

  howCardTitle: {
    fontSize: "20px",
    margin: "0 0 12px 0",
    color: "#111",
  },

  howCardText: {
    fontSize: "15px",
    lineHeight: "1.7",
    color: "#666",
    margin: 0,
  },

    footer: {
    background: "#111",
    color: "#fff",
    padding: "60px 40px 25px 40px",
    marginTop: "20px",
  },

  footerGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
    gap: "30px",
    marginBottom: "30px",
  },

  footerLogo: {
    fontSize: "26px",
    margin: "0 0 12px 0",
  },

  footerTitle: {
    fontSize: "18px",
    margin: "0 0 14px 0",
  },

  footerText: {
    fontSize: "14px",
    lineHeight: "1.8",
    color: "#d1d1d1",
    margin: "0 0 8px 0",
  },

  footerLink: {
    fontSize: "14px",
    lineHeight: "1.8",
    color: "#d1d1d1",
    margin: "0 0 8px 0",
    cursor: "pointer",
  },

  footerBottom: {
    borderTop: "1px solid rgba(255,255,255,0.12)",
    paddingTop: "18px",
    textAlign: "center",
    fontSize: "13px",
    color: "#bdbdbd",
  },
};

export default Home;