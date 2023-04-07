// ? import packages
import express from "express";
import { errorHandler } from "./middlewares/error.js";
import dotenv from "dotenv";
import morgan from "morgan";
import cors from "cors";
import "colors";

//? access the env variables
dotenv.config();

// ? Connect to the database
import { connectDB } from "./config/db.js";
connectDB();

// ? Start the server
const app = express();

// ? cors origin
app.use(cors());

// ? Serve the static files
app.use("/public", express.static("public"));

// ? let express access the body
app.use(express.json());

app.use(express.urlencoded({ extended: true }));

// ? the logger on the terminal
app.use(morgan("dev"));



// // ? import the routes
// import { userRouter } from "./routes/user.routes.js";



// // ? mount routes
// app.use("/api/users", userRouter);



// ! CATCH THE ERRORS USING THE CUSTOM ERROR
app.use(errorHandler);

// ? Make the server listen on the port
const PORT = process.env.PORT || 6666
app.listen(PORT, () => {
    console.log(`the app is listening  on port ${PORT}`.white.bold);
});
