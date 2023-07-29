import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import { userRouter } from './routes/users.js';
import { recipeRouter } from './routes/recipes.js';

const app = express();

app.use(express.json());
app.use(cors());
app.use("/auth", userRouter);
app.use("/recipes", recipeRouter);

mongoose.connect(
    "mongodb+srv://manish320:Y0CYUJy2GaQbNHK0@reciepe.brboiw9.mongodb.net/reciepe?retryWrites=true&w=majority",
    {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    }
    );

app.listen(3001, ()=> console.log("Server Started!"));
