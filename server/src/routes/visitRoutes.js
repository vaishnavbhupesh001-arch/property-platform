const express = require("express");
const router = express.Router();

const {
  createVisit,
  getVisits,
} = require("../controllers/visitController");

router.post("/visit", createVisit);
router.get("/visits", getVisits);

module.exports = router;