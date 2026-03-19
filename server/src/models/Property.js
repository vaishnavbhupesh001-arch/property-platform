const mongoose = require("mongoose");

const propertySchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },

    price: {
      type: Number,
      required: true,
    },

    location: {
      type: String,
      required: true,
      trim: true,
    },

    city: {
      type: String,
      required: true,
      trim: true,
    },

    locality: {
      type: String,
      required: true,
      trim: true,
    },

    bhk: {
      type: Number,
      required: true,
    },

    sqft: {
      type: Number,
      required: true,
    },

    paymentTypeAllowed: {
      type: [String],
      enum: ["full", "loan"],
      default: ["full"],
    },

    furnishingType: {
      type: String,
      enum: ["fully-furnished", "semi-furnished", "unfurnished"],
      required: true,
    },

    images: {
      type: [String],
      default: [],
    },

    videoUrl: {
      type: String,
      default: "",
    },

    status: {
      type: String,
      enum: ["pending", "approved"],
      default: "approved",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Property", propertySchema);