import { createPostService, deletePostService, updatePostService } from "../services/postServices.js";
import { getAllPostsService } from "../services/postServices.js";

export async function createPost(req, res){
    console.log(req.file);

    if(!req.file || !req.file.location){
        return res.status(400).json({
            success: false,
            message: "Image is required"
        });
    }

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

        // console.log(paginatedPosts);
        
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

export async function deletePost(req, res){
    try{
        const postId = req.params.id;
        const response = await deletePostService(postId);

        if(!response){
            return res.status(404).json({
                success: false,
                message: "Post not found"
            });
        }

        return res.status(200).json({
            success: true,
            message: "Post deleted successfully",
            data: response
        });
    }
    catch(error){
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "error in delete post controller",
            error: error
        });
    }
}

export async function updatePost(req, res){
    try{
        console.log("req.file", req.file);
        const updateObject = req.body;
        if(req.file){
            updateObject.image = req.file.location;
        }

        const response = await updatePostService(req.params.id, updateObject);
        return res.status(200).json({
            success: true,
            message: "Post updated successfully",
            data: response
        });
    }
    catch(error){
        console.log(error);
        return res.status(300).json({
            success: false,
            message: "update post failed",
            error: error
        })
    }
}