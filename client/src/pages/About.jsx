import ownerImage from "../assets/images/property.jpg";

function About() {
  return (
    <div style={styles.page}>
      <div style={styles.container}>
        <h1 style={styles.title}>About Us</h1>

        <div style={styles.ownerSection}>
          <img src={ownerImage} alt="owner" style={styles.ownerImage} />

          <div>
            <h2 style={styles.ownerName}>Founder / Owner</h2>

            <p style={styles.ownerText}>
              Welcome to PropertyPlatform. Our mission is to simplify the
              process of finding and buying flats by bringing everything into
              one place. From browsing verified properties to scheduling visits
              and choosing payment options, we aim to make property discovery
              easy, transparent, and trustworthy.
            </p>

            <p style={styles.ownerText}>
              Whether you are planning to buy with full payment or through a
              loan, our platform helps you explore options and move forward
              with confidence.
            </p>
          </div>
        </div>

        <div style={styles.testimonialSection}>
          <h2 style={styles.sectionTitle}>Customer Testimonials</h2>

          <div style={styles.testimonialGrid}>
            <div style={styles.testimonialCard}>
              <p style={styles.testimonialText}>
                "The platform made it easy to explore properties and schedule
                visits. Everything was clear and simple."
              </p>
              <p style={styles.testimonialAuthor}>— Rahul Sharma</p>
            </div>

            <div style={styles.testimonialCard}>
              <p style={styles.testimonialText}>
                "I liked how the payment options and property details were
                explained clearly. It helped me make a confident decision."
              </p>
              <p style={styles.testimonialAuthor}>— Sneha Verma</p>
            </div>

            <div style={styles.testimonialCard}>
              <p style={styles.testimonialText}>
                "Scheduling a visit was very quick. The experience felt smooth
                and professional."
              </p>
              <p style={styles.testimonialAuthor}>— Amit Patel</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

const styles = {
  page: {
    padding: "60px 40px",
    background: "#f8f8f8",
    minHeight: "100vh",
  },

  container: {
    maxWidth: "1100px",
    margin: "0 auto",
  },

  title: {
    textAlign: "center",
    fontSize: "40px",
    marginBottom: "50px",
  },

  ownerSection: {
    display: "grid",
    gridTemplateColumns: "1fr 2fr",
    gap: "40px",
    alignItems: "center",
    marginBottom: "70px",
  },

  ownerImage: {
    width: "100%",
    borderRadius: "16px",
  },

  ownerName: {
    fontSize: "28px",
    marginBottom: "15px",
  },

  ownerText: {
    fontSize: "16px",
    lineHeight: "1.8",
    color: "#555",
    marginBottom: "14px",
  },

  testimonialSection: {
    marginTop: "40px",
  },

  sectionTitle: {
    fontSize: "32px",
    textAlign: "center",
    marginBottom: "35px",
  },

  testimonialGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
    gap: "25px",
  },

  testimonialCard: {
    background: "#fff",
    padding: "24px",
    borderRadius: "14px",
    boxShadow: "0 4px 18px rgba(0,0,0,0.08)",
  },

  testimonialText: {
    fontSize: "15px",
    lineHeight: "1.7",
    color: "#555",
    marginBottom: "15px",
  },

  testimonialAuthor: {
    fontWeight: "600",
    color: "#111",
  },
};

export default About;