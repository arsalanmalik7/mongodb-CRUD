import express from 'express'
import { client } from './../../mongodb.mjs'
import { ObjectId } from 'mongodb';

const db = client.db('cruddb');
const col = db.collection("posts");

let router = express.Router()


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
        const postId = await col.findOne({ _id: new ObjectId(req.params.postId) });
        if (postId) {
            console.log(postId);
            res.send(postId);
        } else {
            res.status(404).send("Post not found ");
        }
    } catch (error) {
        console.error("Error finding post:", error);
        res.status(500).send("Error finding post");
    }

})


router.put('/post/:postId', async (req, res, next) => {
    if (!ObjectId.isValid(req.params.postId)) {
        res.status(403).send(`Invalid post id`);
        return;
    }

    let updatedData = {};
    if (req.body.title) { updatedData.title = req.body.title }
    if (req.body.text) { updatedData.text = req.body.text }

    try {

        const updatedPost = col.updateOne(
            { _id: new ObjectId(req.params.postId) },
            { $set: updatedData }
        );
        if (updatedPost) {
            console.log("Post updated:", await updatedPost);
            res.send("Post updated!");
        } else {
            res.status(404).send("Post not found " + req.params.postId);
        }
    } catch (error) {
        console.error("Error finding post:", error);
        res.status(500).send("Error finding post");
    }
})
router.delete(`/post/:postId`, async (req, res, next) => {
    if (!ObjectId.isValid(req.params.postId)) {
        res.status(403).send(`Invalid post id`);
        return;
    }

    const postId = await col.findOne({ _id: new ObjectId(req.params.postId) });
    const filter = { _id: postId }


    try {
        const deleteResponse = await col.deleteOne({ _id: new ObjectId(req.params.postId) })
        console.log("deleteResponse; ", deleteResponse);
        res.send("Post deleted!")
    } catch (error) {
        console.log("error deleting mongodb: ", error);
        res.status(500).send('server error, please try later');
    }


})
export default router