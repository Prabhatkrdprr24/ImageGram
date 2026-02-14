import express from 'express';
import { commentController, postController } from '../../controllers/commentController.js';
import { authUser } from '../../middleware/authUser.js';

const commentRouter = express.Router();

commentRouter.post("/comment/:commentId", authUser, commentController);
commentRouter.post("/post/:postId", authUser, postController);

export default commentRouter;