import express from "express" ;
import colors from "colors";
import dotenv from "dotenv";
import morgan from 'morgan';
import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";
import categoryRoutes from './routes/categoryRoutes.js';
import productRoutes from './routes/productRoutes.js';  
import cors from 'cors';

// Config dotenv
dotenv.config();

// Database Config
connectDB();


// rest object
const app = express()

// middleware
app.use(cors())
app.use(express.json());
app.use(morgan('dev'));

// routes
app.use("/api/v1/auth",authRoutes)
app.use("/api/v1/category", categoryRoutes);
app.use("/api/v1/product", productRoutes)


// rest Api 
app.get("/",(req,res)=>{
    res.send("<h1>Welcome to E-commerce website!</h1>");
})

// port 
const PORT = process.env.PORT || 5000;

app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}!`.bgWhite.black);
})