import { createPostService } from "../services/postServices.js";
import { getAllPostsService } from "../services/postServices.js";

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

// /api/v11/posts?limit=10&offset=0
export async function getAllPosts(req, res){
    try{
        const limit = req.query.limit || 10;
        const offset = req.query.offset || 0;

        const paginatedPosts = await getAllPostsService(limit, offset);
        
        return res.status(200).json({
            success: true,
            message: "Posts retrieved successfully",
            data: paginatedPosts,
        })
        
    } catch(error){
        return res.status(500).json({
            success: false,
            message: "Failed to get posts",
            error: error.message
        })
    }
}