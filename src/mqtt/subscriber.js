const mqtt = require("mqtt");
const SensorReading = require("../models/SensorReading");

const MQTT_BROKER_URL = process.env.MQTT_BROKER_URL || "mqtt://test.mosquitto.org";
const MQTT_TOPIC = "iot/sensor/+/temperature";

const startMqttSubscriber = () => {
  const client = mqtt.connect(MQTT_BROKER_URL);

  client.on("connect", () => {
    console.log("MQTT connected");
    client.subscribe(MQTT_TOPIC, (err) => {
      if (err) {
        console.error("MQTT subscription error:", err.message);
      }
    });
  });

  client.on("message", async (topic, message) => {
    try {
      /**
       * topic example: iot/sensor/sensor-01/temperature
       */
      const parts = topic.split("/");
      const deviceId = parts[2];

      const temperature = Number(message.toString());

      if (!deviceId || isNaN(temperature)) {
        console.warn("Invalid MQTT message:", topic, message.toString());
        return;
      }

      const reading = new SensorReading({
        deviceId,
        temperature,
        timestamp: Date.now()
      });

      await reading.save();

      console.log(`MQTT data saved for ${deviceId}`);
    } catch (error) {
      console.error("MQTT message handling error:", error.message);
    }
  });

  client.on("error", (err) => {
    console.error("MQTT connection error:", err.message);
  });
};

module.exports = startMqttSubscriber;

