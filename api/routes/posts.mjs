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

    res.send("Post created!")

})


router.get('/posts', async (req, res, next) => {
    console.log('This is all post request', new Date());

    const cursor = col.find({});
    let results = await cursor.toArray();
    console.log(results);
    res.send(results);

})

router.get('/post/:postId', async (req, res, next) => {

    const postId = req.params.postId;

    try {
        const post = await col.findOne({ id: postId });
        if (post) {
            console.log(post);
            res.send(post);
        } else {
            res.status(404).send("Post not found " + postId);
        }
    } catch (error) {
        console.error("Error finding post:", error);
        res.status(500).send("Error finding post");
    }

})


router.put('/post/:postId', async (req, res, next) => {
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
    const post = req.params.postId;
    try {
        const postId = await col.findOne({ id: post });
        const { title, text } = req.body;

        const updatedPost = col.findOneAndUpdate(
            { id: post },
            { $set: { title: title, text: text } },
            { returnOriginal: false }
        );
        if (updatedPost) {
            console.log("Post updated:", (await updatedPost).value);
            res.send("Post updated with id " + post);
        } else {
            res.status(404).send("Post not found " + req.params.postId);
        }
    } catch (error) {
        console.error("Error finding post:", error);
        res.status(500).send("Error finding post");
    }
})
router.delete(`/post/:postId`, async (req, res, next) => {
    if (!req.params.postId) {
        res.status(403).send(`post id must be a valid id`)
    }

    const post = req.params.postId;
    const filter = { id: post }
    const postId = await col.findOne({ id: post });

    const deletedDoc = await col.deleteOne(filter);
    if (deletedDoc.deletedCount === 1) {
        console.log("Successfully deleted one document.");
        res.send("Post deleted successfully!")
    } else {
        console.log("No documents matched the query. Deleted 0 documents.");
        res.send('post not found with id ' + post);
    }


})
export default router