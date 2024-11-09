import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import userRoutes from './routes/userRoute.js';
import productRoutes from './routes/productRoute.js';
import cookieParser from "cookie-parser"
import errorMiddleware from "./middleware/error.js"
import bodyParser from "body-parser"
import orderRoutes from "./routes/orderRoute.js"

const app = express();

dotenv.config();  

// Middleware
app.use(cors()); 
app.use(express.json());  
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.urlencoded({extended:true}))

// Routes
app.use('/api/user', userRoutes);
app.use('/api/product', productRoutes);
app.use('/api/order', orderRoutes);

app.use(errorMiddleware);

export default app;
