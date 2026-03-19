const Contact = require("../models/Contact");
const sendContactEmail = require("../utils/sendContactEmail");

const createContact = async (req, res) => {
  try {

    const { name, email, phone, message, meetingTime } = req.body;

    if (!name || !email || !phone || !message || !meetingTime) {
      return res.status(400).json({
        success: false,
        message: "All fields are required"
      });
    }

    const contact = await Contact.create({
      name,
      email,
      phone,
      message,
      meetingTime
    });

    await sendContactEmail({
      name,
      email,
      phone,
      message,
      meetingTime,
    });

    res.status(201).json({
      success: true,
      message: "Contact form submitted successfully",
      contact
    });

  } catch (error) {

    console.error("Contact form error:", error);

    res.status(500).json({
      success: false,
      message: error.message
    });

  }
};

module.exports = {
  createContact
};