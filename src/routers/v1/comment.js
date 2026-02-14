import express from 'express';
import { commentController, getCommentById, postController } from '../../controllers/commentController.js';
import { authUser } from '../../middleware/authUser.js';

const commentRouter = express.Router();

commentRouter.get("/comment/:commentId", getCommentById);
commentRouter.post("/comment/:commentId", authUser, commentController);
commentRouter.post("/post/:postId", authUser, postController);

export default commentRouter;