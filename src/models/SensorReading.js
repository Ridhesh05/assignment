// Reading model
// like id , temperature , created_at , timestamp
const mongoose = require("mongoose");
// we index based on device id for faster query
const sensorReadingSchema = new mongoose.Schema({
  deviceId: {
    type: String,
    required: true,
    index: true
  },
  temperature: {
    type: Number,
    required: true
  },
  timestamp: {
    type: Number,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model("SensorReading", sensorReadingSchema);
