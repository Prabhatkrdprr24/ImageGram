import express from 'express';
import connectDB from './config/dbConfig.js';
import apiRouter from "./routers/apiRouter.js";


const PORT = 3000;
const app = express();


app.use(express.json());
app.use(express.text());
app.use(express.urlencoded({ extended: true }));

app.use("/api", apiRouter);

app.get("/ping", (req, res) => {
    return res.status(200).json({
        success: true,
        message: "Pong"
    })
});

app.listen(PORT, () => {
  console.log(`Server running at: http://localhost:${PORT}`);
  connectDB();
});