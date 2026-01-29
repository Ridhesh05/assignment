// Controller for sensor readings
const SensorReading = require("../models/SensorReading");

exports.ingestReading = async (req, res) => {
  try {
    const { deviceId, temperature, timestamp } = req.body;

    if (!deviceId || typeof temperature !== "number") {
      return res.status(400).json({
        message: "deviceId is required and temperature must be a number"
      });
    }

    const reading = new SensorReading({
      deviceId,
      temperature,
      timestamp: timestamp || Date.now()
    });

    await reading.save();

    return res.status(201).json({
      message: "Sensor reading ingested successfully",
      data: reading
    });
  } catch (error) {
    return res.status(500).json({
      message: "Internal server error",
      error: error.message
    });
  }
};

// GET
exports.getLatestReading = async (req, res) => {
  try {
    const { deviceId } = req.params;
    // just need raw data so instead of mongoose object we use lean()
    const latestReading = await SensorReading.findOne({ deviceId })
      .sort({ timestamp: -1 }).lean();

    if (!latestReading) {
      return res.status(404).json({
        message: "No readings found for this device"
      });
    }

    return res.json(latestReading);
  } catch (error) {
    return res.status(500).json({
      message: "Internal server error",
      error: error.message
    });
  }
};
