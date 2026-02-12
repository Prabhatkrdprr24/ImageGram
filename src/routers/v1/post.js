import express from 'express';
import { createPost } from '../../controllers/postController.js';
import { s3Uploader } from '../../config/multer.js';
import { getAllPosts } from '../../controllers/postController.js';
import { deletePost } from '../../controllers/postController.js';
import { updatePost } from '../../controllers/postController.js';
import { validate } from '../../validators/zodValidator.js';
import { zodPostSchema } from '../../validators/zodPostSchema.js';

const postRouter = express.Router();

postRouter.post("/", s3Uploader.single("image"), validate(zodPostSchema), createPost);
postRouter.get("/", getAllPosts);
postRouter.delete("/:id", deletePost);
postRouter.put("/:id", s3Uploader.single("image"), updatePost);

export default postRouter;