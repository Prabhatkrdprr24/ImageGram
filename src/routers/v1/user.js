import express from 'express';
import { getProfile, signup } from '../../controllers/userController.js';
import { validate } from '../../validators/zodValidator.js';

const userRouter = express.Router();

import multer from 'multer';
import { zodSignupSchema } from '../../validators/zodSignupSchema.js';
const upload = multer();

userRouter.get("/profile", getProfile);
userRouter.post("/signup", upload.none(), validate(zodSignupSchema), signup)

export default userRouter;