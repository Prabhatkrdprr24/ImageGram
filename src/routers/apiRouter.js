// This api router will triggered when any request starting with /api is come.
import express from 'express';
import v1Router from './v1/v1Router.js';
import v2Router from './v2/v2Router.js';

const apiRouter = express.Router();

apiRouter.use("/v1", v1Router);
apiRouter.use("/v2", v2Router);

export default apiRouter;