import { Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";

import Home from "./pages/Home";
import Properties from "./pages/Properties";
import PropertyDetails from "./pages/PropertyDetails";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Wishlist from "./pages/Wishlist";
import AdminVisits from "./pages/AdminVisits";
import AdminAddProperty from "./pages/AdminAddProperty";
import AdminProperties from "./pages/AdminProperties";
import AdminEditProperty from "./pages/AdminEditProperty";

function App() {
  return (
    <>
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/properties" element={<Properties />} />
        <Route path="/property/:id" element={<PropertyDetails />} />
        <Route path="/wishlist" element={<Wishlist />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/admin-visits" element={<AdminVisits />} />
        <Route path="/admin-properties" element={<AdminProperties />} />
        <Route path="/admin-add-property" element={<AdminAddProperty />} />
        <Route path="/admin-edit-property/:id" element={<AdminEditProperty />} />
      </Routes>
    </>
  );
}

export default App;