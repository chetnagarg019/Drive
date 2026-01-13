import express from "express";
import UserRouter from "./routes/userRoutes.js"
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import cookieParser from "cookie-parser";
import homeRouter from "./routes/homeRoutes.js";
import "./config/cloudinary.js";
import uploadRoutes from "./routes/uploadRoutes.js";
// import User from '../models/user.js'

dotenv.config();


const app = express();

// //for ejs 
app.set('view engine','ejs');
app.use(cookieParser())
app.use("/", uploadRoutes);


// //2 bulit in middlware for data read in console 
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

connectDB();


// //for user route
app.use("/user",UserRouter);
app.use("/",homeRouter);




const PORT = 5000;
app.listen(PORT,() => {
    console.log(`Server is running on ${PORT}`);
    
})

// phle maine .env me teeno chiz copy kri 
// fr maine config/cloudinary file bnayi usme kuch code likha
//import kiya cloudinary ko index.js me 
// or fr npm install multer
// middleware/ multer.js  some code insert
// controller/upload some code 
//uploadRoutes create in routes
//npm list cloudinary

