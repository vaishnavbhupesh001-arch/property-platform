const express = require("express");

const router = express.Router();

router.post("/owner-enquiry", async (req, res) => {
  try {
    const { name, email, phone, message, propertyId } = req.body;

    console.log("Owner enquiry received:", {
      name,
      email,
      phone,
      message,
      propertyId,
    });

    res.status(200).json({
      success: true,
      message: "Enquiry sent successfully",
    });
  } catch (error) {
    console.error("Owner enquiry error:", error);

    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
});

module.exports = router;