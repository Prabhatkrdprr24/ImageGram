import express from 'express';
import { getProfile, signup } from '../../controllers/userController.js';
import { validate } from '../../validators/zodValidator.js';
import { signin } from '../../controllers/userController.js';
import { zodSigninSchema } from '../../validators/zodSigninSchema.js';

const userRouter = express.Router();

import multer from 'multer';
import { zodSignupSchema } from '../../validators/zodSignupSchema.js';
const upload = multer();

userRouter.get("/profile", getProfile);
userRouter.post("/signup", upload.none(), validate(zodSignupSchema), signup);
userRouter.post("/signin", upload.none(), validate(zodSigninSchema), signin);

export default userRouter;