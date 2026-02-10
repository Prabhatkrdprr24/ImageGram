import express from 'express';
import { createPost } from '../../controllers/postController.js';
import { s3Uploader } from '../../config/multer.js';
import { getAllPosts } from '../../controllers/postController.js';

const postRouter = express.Router();

postRouter.post("/", s3Uploader.single("image"), createPost);
postRouter.get("/", getAllPosts);

export default postRouter;