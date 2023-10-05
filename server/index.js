import express from "express";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import cors from "cors";
import mongoose from "mongoose";

import bookRoutes from "./routes/books.js";
import userRoutes from "./routes/users.js";

const app = express();
dotenv.config();

app.use(cors());
app.use(bodyParser.json({ limit: "10mb" }));
app.use(bodyParser.urlencoded({ limit: "10mb", extended: true }));

app.use('/books', bookRoutes);
app.use('/users', userRoutes);
app.get('/', (req, res) => {
    res.send("Book API");
});
app.use(function(err, req, res, next){
    res.status(err?.code ?? 400).json(err.message);
    next();
});

const PORT = process.env.PORT || 5000;

mongoose.connect(process.env.DB_URL)
    .then(() => app.listen(PORT, () => console.log(`server is running at port: ${PORT}`)))
    .catch((error) => console.log(error.message));