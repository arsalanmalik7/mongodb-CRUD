import express from 'express'
import path from 'path';
const __dirname = path.resolve();

const app = express();
app.use(express.json());

import postRouter from './api/index.mjs';
import authRouter from './api/index.mjs';


app.use('/api', authRouter)

app.use('/api', postRouter);


app.use(express.static(path.join(__dirname, 'public')))


const PORT = process.env.Port || 3000

app.listen(PORT, () => {
    console.log(`posting app listening on ${PORT} `)
})