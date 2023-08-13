import express from 'express'
import path from 'path';
const __dirname = path.resolve();
import cookieParser from 'cookie-parser';
import jwt from 'jsonwebtoken';
import 'dotenv/config';



const app = express();
app.use(express.json());
app.use(cookieParser());

import postRouter from './api/index.mjs';
import authRouter from './api/index.mjs';


app.use('/api', authRouter)


app.use((req, res, next) => {
    console.log("cookies; ", req.cookies)
    
    const token = req.cookies.token;
    try {
        const decoded = jwt.verify(token, process.env.SECRET)
        console.log("decoded: ", decoded);
        
        
        req.body.decoded = {
            firstName: decoded.firstName,
            lastName: decoded.lastName,
            email: decoded.email,
            isAdmin: decoded.isAdmin,
        };
        next();
        
    } catch (error) {
        
        res.status(401).send({
            message: "Invalid token"
        });
    }
    
})


app.use('/api', postRouter);


app.use(express.static(path.join(__dirname, 'public')))


const PORT = process.env.Port || 3000
app.listen(PORT, () => {
    console.log(`posting app listening on ${PORT} `)
})