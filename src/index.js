import express from 'express';
import connectDB from './config/dbConfig.js';

const PORT = 3000;
const app = express();

app.get("/", (req, res) => {
  res.send("home");
});

app.get("/ping", (req, res) => {
  return res.json({message: "pong"});
});

app.get("/hello", (req, res) => {
  return res.json({message: "Hello World"});
});

app.post("/hello", (req, res) => {
  return res.json({message: "post: Hello World"});
});

app.put("/hello", (req, res) => {
  return res.json({message: "put: Hello World"});
});

app.delete("/hello", (req, res) => {
  return res.json({message: "delete: Hello World"});
});

app.listen(PORT, () => {
  console.log(`Server running at: http://localhost:${PORT}`);
  connectDB();
});