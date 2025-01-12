import cors from "cors";
import express from "express";
import * as dotenv from "dotenv";
import handleError from "./middleware/error.js";
import connectDB from "./db/connectDB.js";
import PostRouter from "./routes/Posts.js";
import genImageRouter from "./routes/GenerateImage.js";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: true }));

// error handling

app.use(handleError);

app.use("/api/generateImage", genImageRouter);
app.use("/api/post", PostRouter);

const startServer = async () => {
  try {
    connectDB();
    app.listen(8080, () => console.log("Server listening on port 8080..."));
  } catch (error) {
    console.log(error);
  }
};

startServer();
