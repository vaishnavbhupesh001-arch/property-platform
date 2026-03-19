function Filters({ filters, setFilters, clearFilters }) {
  const handleChange = (e) => {
    const { name, value } = e.target;

    setFilters((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <div style={styles.wrapper}>
      <select name="pay" value={filters.pay} onChange={handleChange} style={styles.select}>
        <option value="">Payment Type</option>
        <option value="full">Full Payment</option>
        <option value="loan">Loan</option>
      </select>

      <select
        name="furnishing"
        value={filters.furnishing}
        onChange={handleChange}
        style={styles.select}
      >
        <option value="">Furnishing Type</option>
        <option value="fully-furnished">Fully Furnished</option>
        <option value="semi-furnished">Semi-Furnished</option>
        <option value="unfurnished">Unfurnished</option>
      </select>

      <select name="city" value={filters.city} onChange={handleChange} style={styles.select}>
        <option value="">City</option>
        <option value="Mumbai">Mumbai</option>
        <option value="Pune">Pune</option>
      </select>

      <select
        name="locality"
        value={filters.locality}
        onChange={handleChange}
        style={styles.select}
      >
        <option value="">Locality</option>
        <option value="Andheri West">Andheri West</option>
        <option value="Borivali West">Borivali West</option>
        <option value="Wakad">Wakad</option>
      </select>

      <button style={styles.clearBtn} onClick={clearFilters}>
        Clear Filters
      </button>
    </div>
  );
}

const styles = {
  wrapper: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
    gap: "15px",
    marginBottom: "20px",
  },
  select: {
    padding: "12px",
    borderRadius: "8px",
    border: "1px solid #ccc",
    fontSize: "14px",
    outline: "none",
    background: "#fff",
  },
  clearBtn: {
    padding: "12px",
    borderRadius: "8px",
    border: "none",
    background: "#111",
    color: "#fff",
    cursor: "pointer",
    fontSize: "14px",
  },
};

export default Filters;