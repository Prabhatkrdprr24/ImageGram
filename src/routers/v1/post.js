import express from 'express';
import { createPost } from '../../controllers/postController.js';
import { s3Uploader } from '../../config/multer.js';
import { getAllPosts } from '../../controllers/postController.js';
import { deletePost } from '../../controllers/postController.js';
import { updatePost } from '../../controllers/postController.js';
import { validate } from '../../validators/zodValidator.js';
import { zodPostSchema } from '../../validators/zodPostSchema.js';
import { authUser, isAdmin } from '../../middleware/authUser.js';

const postRouter = express.Router();

/**
 * @swagger
 * /posts:
 *   post:
 *     summary: Create a new post
 *     description: create a new post
 *     responses:
 *       200:
 *         description: post created successfully
 */

postRouter.post("/", authUser, s3Uploader.single("image"), validate(zodPostSchema), createPost);
postRouter.get("/", getAllPosts);
postRouter.delete("/:id", authUser, deletePost);
postRouter.put("/:id", authUser, isAdmin, s3Uploader.single("image"), updatePost);

export default postRouter;