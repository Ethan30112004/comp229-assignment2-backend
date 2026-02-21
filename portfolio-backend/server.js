require("dotenv").config();

const express = require("express");
const createError = require("http-errors");
const morgan = require("morgan");
const cors = require("cors");

const connectDB = require("./config/db");

const referenceRoutes = require("./routes/reference.routes");
const projectRoutes = require("./routes/project.routes");
const serviceRoutes = require("./routes/service.routes");
const userRoutes = require("./routes/user.routes");

const app = express();

connectDB();

app.use(cors());
app.use(morgan("dev"));
app.use(express.json());

app.use("/api/references", referenceRoutes);
app.use("/api/projects", projectRoutes);
app.use("/api/services", serviceRoutes);
app.use("/api/users", userRoutes);

app.use((req, res, next) => next(createError(404, "Endpoint not found")));

app.use((err, req, res, next) => {
  res.status(err.status || 500).json({
    success: false,
    message: err.message || "Server error"
  });
});

app.listen(3000, () => console.log("Server running on http://localhost:3000"));