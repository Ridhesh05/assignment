const express = require("express");
const router = express.Router();

const {
  ingestReading,
  getLatestReading
} = require("../controllers/sensor.controller");

router.post("/ingest", ingestReading);
router.get("/:deviceId/latest", getLatestReading);

module.exports = router;
