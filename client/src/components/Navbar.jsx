import { useState } from "react";
import { NavLink } from "react-router-dom";

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav style={styles.navbar}>
      <div style={styles.container}>
        <div style={styles.logo}>PropertyPlatform</div>

        <div
          style={{
            ...styles.links,
            ...(menuOpen ? styles.linksMobileOpen : {}),
          }}
        >
          <NavLink to="/" style={styles.link}>
            Home
          </NavLink>

          <NavLink to="/properties" style={styles.link}>
            Properties
          </NavLink>

          <NavLink to="/wishlist" style={styles.link}>
            Wishlist
          </NavLink>

          <NavLink to="/about" style={styles.link}>
            About
          </NavLink>

          <NavLink to="/contact" style={styles.link}>
            Contact
          </NavLink>
        </div>

        <div
          style={styles.hamburger}
          onClick={() => setMenuOpen(!menuOpen)}
        >
          ☰
        </div>
      </div>
    </nav>
  );
}

const styles = {
  navbar: {
    position: "sticky",
    top: 0,
    width: "100%",
    background: "#000",
    borderBottom: "1px solid #eee",
    zIndex: 1000,
  },

  container: {
    maxWidth: "1200px",
    margin: "0 auto",
    padding: "14px 20px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },

  logo: {
    fontSize: "22px",
    fontWeight: "700",
    color: "#fff",
  },

  links: {
    display: "flex",
    gap: "20px",
    alignItems: "center",
  },

  link: {
    textDecoration: "none",
    color: "#fff",
    fontSize: "15px",
    fontWeight: "500",
  },

  hamburger: {
    display: "none",
    fontSize: "22px",
    cursor: "pointer",
  },

  linksMobileOpen: {
    position: "absolute",
    top: "60px",
    left: 0,
    width: "100%",
    background: "#000",
    flexDirection: "column",
    padding: "20px",
    gap: "15px",
  },
};

export default Navbar;