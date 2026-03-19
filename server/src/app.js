const express = require("express");
const cors = require("cors");

const propertyRoutes = require("./routes/propertyRoutes");
const contactRoutes = require("./routes/contactRoutes");
const visitRoutes = require("./routes/visitRoutes");

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Backend running successfully 🚀");
});

app.use("/api/properties", propertyRoutes);
app.use("/api/contact", contactRoutes);
app.use("/api", visitRoutes);

module.exports = app;