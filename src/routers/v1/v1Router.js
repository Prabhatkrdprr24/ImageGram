import express from 'express';
import postRouter from './post.js';
import userRouter from './user.js';

const v1Router = express.Router();

v1Router.use("/posts", postRouter);
v1Router.use("/users", userRouter);

export default v1Router;