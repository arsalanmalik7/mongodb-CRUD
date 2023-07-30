import express from 'express';
let router = express.Router();

import postRouter from './routes/posts.mjs'

router.use(postRouter);



export default router