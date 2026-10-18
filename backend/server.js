import express from "express";
import cors from "cors";
import "dotenv/config";

import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";
import taskRoutes from "./routes/taskRoutes.js";
import { notFound, errorHandler } from "./middleware/errorMiddleware.js";

// App Config
const app = express();
const port = process.env.PORT || 8000;

// Middleware
app.use(express.json());
app.use(cors({ origin: process.env.CLIENT_URL || "*" }));

// API Endpoints
app.get("/", (req, res) => {
  res.send("API Working");
});
app.use("/api/auth", authRoutes);
app.use("/api/tasks", taskRoutes);

// Error Handling (must be last)
app.use(notFound);
app.use(errorHandler);

// Start Server
const startServer = async () => {
  await connectDB();
  app.listen(port, () => console.log(`Server running on PORT : ${port}`));
};

startServer();
