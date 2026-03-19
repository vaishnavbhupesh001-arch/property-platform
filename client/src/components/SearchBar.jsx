function SearchBar({ searchText, setSearchText, sortBy, setSortBy }) {
  return (
    <div style={styles.wrapper}>
      <input
        type="text"
        placeholder="Search by city or locality"
        value={searchText}
        onChange={(e) => setSearchText(e.target.value)}
        style={styles.input}
      />

      <select
        value={sortBy}
        onChange={(e) => setSortBy(e.target.value)}
        style={styles.select}
      >
        <option value="">Sort By</option>
        <option value="lowToHigh">Price: Low to High</option>
        <option value="highToLow">Price: High to Low</option>
      </select>
    </div>
  );
}

const styles = {
  wrapper: {
    display: "grid",
    gridTemplateColumns: "2fr 1fr",
    gap: "15px",
    marginBottom: "20px",
  },
  input: {
    padding: "12px",
    borderRadius: "8px",
    border: "1px solid #ccc",
    fontSize: "14px",
    outline: "none",
    background: "#fff",
  },
  select: {
    padding: "12px",
    borderRadius: "8px",
    border: "1px solid #ccc",
    fontSize: "14px",
    outline: "none",
    background: "#fff",
  },
};

export default SearchBar;