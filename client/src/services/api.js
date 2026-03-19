import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000/api",
});

// =======================
// Properties APIs
// =======================

// Get all properties
export const getProperties = (params) => {
  return API.get("/properties", { params });
};

// Get single property
export const getSingleProperty = (id) => {
  return API.get(`/properties/${id}`);
};

// Create property
export const createProperty = (data) => {
  return API.post("/properties", data);
};

// =======================
// Contact API
// =======================

export const sendContactForm = (data) => {
  return API.post("/contact", data);
};

// Owner enquiry API
export const sendOwnerEnquiry = (data) => {
  return axios.post("http://localhost:5000/api/contact/owner-enquiry", data);
};

export default API;