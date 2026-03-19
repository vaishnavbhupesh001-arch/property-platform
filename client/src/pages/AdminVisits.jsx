import { useEffect, useState } from "react";
import axios from "axios";

function AdminVisits() {
  const [visits, setVisits] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let ignore = false;

    const loadVisits = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/visits");

        if (!ignore) {
          setVisits(res.data.visits || []);
        }
      } catch (error) {
        console.error("Error fetching visits:", error);
      } finally {
        if (!ignore) {
          setLoading(false);
        }
      }
    };

    loadVisits();

    return () => {
      ignore = true;
    };
  }, []);

  return (
    <div style={styles.page}>
      <h1>Visit Requests</h1>

      {loading ? (
        <p>Loading visits...</p>
      ) : visits.length === 0 ? (
        <p>No visit requests found.</p>
      ) : (
        <table style={styles.table}>
          <thead>
            <tr>
              <th style={styles.th}>Name</th>
              <th style={styles.th}>Phone</th>
              <th style={styles.th}>Date</th>
              <th style={styles.th}>Time</th>
            </tr>
          </thead>

          <tbody>
            {visits.map((visit) => (
              <tr key={visit._id}>
                <td style={styles.td}>{visit.name}</td>
                <td style={styles.td}>{visit.phone}</td>
                <td style={styles.td}>{visit.date}</td>
                <td style={styles.td}>{visit.time}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

const styles = {
  page: {
    padding: "40px",
  },

  table: {
    width: "100%",
    borderCollapse: "collapse",
    marginTop: "20px",
    background: "#fff",
  },

  th: {
    border: "1px solid #ddd",
    padding: "12px",
    textAlign: "left",
    background: "#f5f5f5",
  },

  td: {
    border: "1px solid #ddd",
    padding: "12px",
  },
};

export default AdminVisits;