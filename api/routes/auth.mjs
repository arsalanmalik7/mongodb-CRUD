import express from 'express'
import { client } from './../../mongodb.mjs';
import bcrypt from 'bcrypt'

const db = client.db('cruddb');
const users = db.collection("users");

let router = express.Router()


router.post('/signup', async (req, res, next) => {
    console.log("Sign up to this page ");
    const { username, password } = req.body

    const existingUser = await users.findOne({ username })
    if (existingUser) {
        return res.status(400).json('User already exists');
    }
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = users.insertOne({
        username,
        password: hashedPassword
    })
    await users.insertOne({ newUser });
    res.status(201).send("User created Successfuly!")
    console.log(username)
    console.log(password)
})

router.post('/login', async (req, res, next) => {
    console.log("Log in to this page");
    const { username, password } = req.body
    const user = await users.findOne({ username })
    if (!user) {
        res.status(401).send("Invalid Credentials")
    }

    const isValidPassword = await bcrypt.compare(password, user.password);

    if (!isValidPassword) {
        return res.status(401).json({ error: 'Invalid credentials' });
    }

    res.status(200).send("Login Successfully!");
})



export default router