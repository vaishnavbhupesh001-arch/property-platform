import { useEffect, useMemo, useState } from "react";
import { getProperties } from "../services/api";
import PropertyCard from "../components/PropertyCard";
import Filters from "../components/Filters";
import SearchBar from "../components/SearchBar";

function Properties() {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);

  const [filters, setFilters] = useState({
    pay: "",
    furnishing: "",
    city: "",
    locality: "",
  });

  const [searchText, setSearchText] = useState("");
  const [sortBy, setSortBy] = useState("");

  useEffect(() => {
    let ignore = false;

    const loadProperties = async () => {
      try {
        setLoading(true);

        const cleanedFilters = Object.fromEntries(
          Object.entries(filters).filter(([, value]) => value !== "")
        );

        const res = await getProperties(cleanedFilters);

        if (!ignore) {
          setProperties(res.data.properties || []);
        }
      } catch (error) {
        console.error("Error fetching properties:", error);
        if (!ignore) setProperties([]);
      } finally {
        if (!ignore) setLoading(false);
      }
    };

    loadProperties();

    return () => {
      ignore = true;
    };
  }, [filters]);

  const clearFilters = () => {
    setFilters({
      pay: "",
      furnishing: "",
      city: "",
      locality: "",
    });
    setSearchText("");
    setSortBy("");
  };

  const filteredAndSortedProperties = useMemo(() => {
    let result = [...properties];

    if (searchText.trim()) {
      const q = searchText.toLowerCase();
      result = result.filter(
        (property) =>
          property.city?.toLowerCase().includes(q) ||
          property.locality?.toLowerCase().includes(q) ||
          property.title?.toLowerCase().includes(q)
      );
    }

    if (sortBy === "lowToHigh") {
      result.sort((a, b) => a.price - b.price);
    }

    if (sortBy === "highToLow") {
      result.sort((a, b) => b.price - a.price);
    }

    return result;
  }, [properties, searchText, sortBy]);

  return (
    <div style={styles.page}>
      <h1 style={styles.heading}>Available Properties</h1>

      <SearchBar
        searchText={searchText}
        setSearchText={setSearchText}
        sortBy={sortBy}
        setSortBy={setSortBy}
      />

      <Filters
        filters={filters}
        setFilters={setFilters}
        clearFilters={clearFilters}
      />

      {loading ? (
        <p>Loading properties...</p>
      ) : filteredAndSortedProperties.length === 0 ? (
        <p>No properties found.</p>
      ) : (
        <div style={styles.grid}>
          {filteredAndSortedProperties.map((property) => (
            <PropertyCard key={property._id} property={property} />
          ))}
        </div>
      )}
    </div>
  );
}

const styles = {
  page: {
    padding: "40px",
  },
  heading: {
    marginBottom: "24px",
    fontSize: "28px",
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
    gap: "25px",
    marginTop: "30px",
  },
};

export default Properties;