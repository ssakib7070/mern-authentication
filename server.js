const dotenv = require("dotenv").config({ path: "./config.env" });
const express = require("express");
const app = express();
const PORT = process.env.PORT || 5000;
const mongoDB = require("./config/db");

// Database Connection
mongoDB();

// middlewares
app.use(express.json());
app.use("/api/auth", require("./routes/auth"));
app.use("/api/private", require("./routes/private"));

const server = app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

process.on("unhandledRejection", (error, promise) => {
  console.log(`Logged Error: ${error}`);
  server.close(() => process.exit(1));
});
