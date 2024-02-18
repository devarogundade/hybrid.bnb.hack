import cors from "cors";
import Route from "./routes";
import express from "express";
import mongoose from "mongoose";
import DbConfig from "./configs/db.cofig";
import env from 'dotenv';

env.config();

const app = express();

const corsOptions = {
    // origin: ""
};

app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

const route = new Route();

mongoose.connect(DbConfig.url)
    .then(() => {
        console.log("Connected to the database!");

        route.init(app);
    })
    .catch((error: Error) => {
        console.log("Cannot connect to the database!", error);
        process.exit();
    });

app.get("/", (_, res) => {
    res.json({ message: "Hybrid Node V1" });
});

// set port, listen for requests
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`⚡ Server is on port ${PORT}.`);
});