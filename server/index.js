import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import http from "http";
import mongoose from "mongoose";
import "dotenv/config";
import routes from "./src/routes/index.js";

const app = express();

app.use(
  cors({
    origin: ["https://flixxit-chinmays-projects-972d344e.vercel.app", "http://localhost:3000"],
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"], // Allow all required methods
    allowedHeaders: [
      "Content-Type",
      "Authorization",
      "x-csrf-token", // Add any custom headers your client uses
    ],
    credentials: true,
  })
);

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "https://flixxit-frontend.vercel.app"); // Allow your frontend origin
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  res.header("Access-Control-Allow-Headers", "Authorization, Content-Type");
  res.header("Access-Control-Allow-Credentials", "true"); // Required for cookies or credentials
  if (req.method === "OPTIONS") {
    return res.status(200).end(); // Handle preflight requests
  }
  next();
});

app.options("*", cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use("/api/v1", routes);

const port = process.env.PORT || 5000;

const server = http.createServer(app);

mongoose.set("strictQuery", false);

mongoose
  .connect(process.env.MONGODB_URL)
  .then(() => {
    console.log("Mongodb connected");
    server.listen(port, () => {
      console.log(`Server is listening on port ${port}`);
    });
  })
  .catch((err) => {
    console.log({ err });
    process.exit(1);
  });
