require("dotenv").config();
const app = require("./app");
const connectDB = require("./config/db");
const startMqttSubscriber = require("./mqtt/subscriber");

const PORT = process.env.PORT || 3000;

connectDB();

startMqttSubscriber();

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
