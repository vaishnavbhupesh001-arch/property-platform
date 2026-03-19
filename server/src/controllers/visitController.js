const Visit = require("../models/Visit");
const sendEmail = require("../utils/sendEmail");

const createVisit = async (req, res) => {

  try {

    const visit = await Visit.create(req.body);

    await sendEmail(req.body);

    res.status(201).json({
      success: true,
      message: "Visit scheduled successfully",
      visit
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message
    });

  }
};

const getVisits = async (req, res) => {

  try {

    const visits = await Visit.find().sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      visits
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message
    });

  }
};

module.exports = {
  createVisit,
  getVisits
};