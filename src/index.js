import express from 'express';
import connectDB from './config/dbConfig.js';
import { createPost } from './controllers/postController.js';
import { s3Uploader } from './config/multer.js';

const PORT = 3000;
const app = express();

app.use(express.json());
app.use(express.text());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.send("home");
});

app.get("/ping", (req, res) => {
  return res.json({message: "pong"});
});

app.get("/hello", (req, res) => {
  return res.json({message: "Hello World"});
});

// app.post("/hello", (req, res) => {
//   return res.json({message: "post: Hello World"});
// });

// app.put("/hello", (req, res) => {
//   return res.json({message: "put: Hello World"});
// });

// app.delete("/hello", (req, res) => {
//   return res.json({message: "delete: Hello World"});
// });

app.post("/posts", s3Uploader.single("image"), createPost);

app.listen(PORT, () => {
  console.log(`Server running at: http://localhost:${PORT}`);
  connectDB();
});