import express from 'express'
import { nanoid } from 'nanoid'
import { client } from './../../mongodb.mjs'

const db = client.db('cruddb');
const col = db.collection("posts");

let router = express.Router()



let posts = [
    {
        id: nanoid(),
        title: " abc title",
        text: "some text"
    }
]



router.post('/post', async (req, res, next) => {
    // console.log('this is the post request');

    if (
        !req.body.title || !req.body.text
    ) {
        res.status(403).send(`required parameters are: {
            title: "abc posts title",
            text: "some posts text"
        } `);
        return;
    }

    const insertResponse = await col.insertOne({
        id: nanoid(),
        title: req.body.title,
        text: req.body.text
    })
    console.log("insertResponse: ", insertResponse)

    res.send("Posts created!")

})


router.get('/posts', async (req, res, next) => {
    console.log('This is all post request', new Date());

    const cursor = col.find({});
    let results = await cursor.toArray();
    console.log(results);
    res.send(results);

})

router.get('/post/:postId', (req, res, next) => {

    if ((req.params.postId)) {
        res.status(403).send(`post id must be a valid id`)
    }

    for (let i = 0; i < posts.length; i++) {
        if (posts[i].id === req.params.postId) {
            res.send(posts[i]);
            return;
        }
    }
    res.send('post not found with id ' + req.params.postId);
})
router.put('/post/:postId', (req, res, next) => {
    if (!req.params.postId
        || !req.body.text
        || !req.body.title) {
        res.status(403).send(`example put body: 
        {
            title: "updated title",
            text: "updated text"
        }
        `)
    }
    for (let i = 0; i < posts.length; i++) {
        if (posts[i].id === req.params.postId) {
            posts[i] = {
                text: req.body.text,
                title: req.body.title,
            }
            res.send('post updated with id ' + req.params.postId);
            return;
        }
    }
    res.send('post not found with id ' + req.params.postId);
})
router.delete(`/post/:postId`, (req, res, next) => {
    if (!req.params.postId) {
        res.status(403).send(`post id must be a valid id`)
    }
    for (let i = 0; i < posts.length; i++) {
        if (posts[i].id === req.params.postId) {
            posts.splice(i, 1);
            res.send('post deleted with id ' + req.params.postId);

            return;
        }
    }
    res.send('post not found with id ' + req.params.postId);

})
export default router