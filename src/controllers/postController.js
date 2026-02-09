import { createPostService } from "../services/postServices.js";

export async function createPost(req, res){
    console.log(req.file);

    const post = await createPostService({
        caption: req.body.caption,
        image: req.file.location,
        // user: req.user
    });

    return res.status(201).json({
        success: true,
        message: "Post created successfully",
        data: post
    })
}