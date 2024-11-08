import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import userRoutes from './routes/userRoute.js';

const app = express();

dotenv.config();  

// Middleware
app.use(cors()); 
app.use(express.json());  

// Routes
app.use('/api/auth', userRoutes);

export default app;
