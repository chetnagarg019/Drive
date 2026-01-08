import express from "express";
import UserRouter from "./routes/userRoutes.js"
import dotenv from "dotenv";
import connectDB from "./config/db.js";
// import User from '../models/user.js'

dotenv.config();


const app = express();

// //for ejs 
app.set('view engine','ejs');

// //2 bulit in middlware for data read in console 
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

connectDB();

 
// //for user route
app.use("/user",UserRouter);




const PORT = 5000;
app.listen(PORT,() => {
    console.log(`Server is running on ${PORT}`);
    
})