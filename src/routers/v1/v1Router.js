import express from 'express';
import postRouter from './post.js';
import userRouter from './user.js';
import commentRouter from './comment.js';

const v1Router = express.Router();

v1Router.use("/posts", postRouter);
v1Router.use("/users", userRouter);
v1Router.use("/comments", commentRouter);

export default v1Router;