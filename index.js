import express from "express";
import addRoutes from "./routes/transactionRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import connectDB from "./config/db.js";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import cors from 'cors';
import path from 'path';

dotenv.config();

const app = express();

const port = process.env.PORT || 5000;

app.use(cors());
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

connectDB();

app.use("/api/transactions", addRoutes);
app.use("/api/users", userRoutes);

app.listen(port, () => {
  console.log(`Listening on port ${[port]}`);
});
