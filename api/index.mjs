import express from 'express';
let router = express.Router();

import postRouter from './routes/posts.mjs'
import authRouter from './routes/auth.mjs'

router.use(postRouter);

router.use(authRouter);

export default router