const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const morgan = require("morgan");
const colors = require("colors");
const connectDB = require("./config/db");

dotenv.config({ path: "./config/.env" });

connectDB();

const products = require("./routes/products");

const app = express();
app.use(morgan("dev"));
app.use(cors());
app.use(express.json());

app.use("/api", products);

const PORT = process.env.PORT || 5500;
app.listen(PORT, () =>
  console.log(`Server started. Listeninh on port ${PORT}`.yellow.bold)
);
