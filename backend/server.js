import dotenv from 'dotenv'
dotenv.config();
import express from "express";
import cors from "cors";

// Import routes
import moodRoutes from "./routes/moodRoutes.js";

// Initialize Express
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// API Routes
app.use('/api',moodRoutes);

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`API Endpoint: http://localhost:${PORT}/api/response`);
});