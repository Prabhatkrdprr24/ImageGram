import { createPostRepo, findPostById } from "../repositories/postRepository.js";
import { findAllPosts, countAllPosts } from "../repositories/postRepository.js";
import { deletePostById } from "../repositories/postRepository.js";
import { updatePostById } from "../repositories/postRepository.js";
import deleteAwsFile from "../services/deleteAwsFile.js";

export const createPostService = async(createPostObject) => {
    const caption = createPostObject.caption?.trim();
    const image = createPostObject.image;
    // const user = createPostObject.user;

    const post = await createPostRepo(caption, image);
    return post;
}

export const getAllPostsService = async (limit, offset) => {
    const posts = await findAllPosts(limit, offset);

    // Calculate total no of posts and total no of pages
    const totalDocuments = await countAllPosts();
    const totalPages = Math.ceil(totalDocuments / limit);

    return {
        posts,
        totalDocuments,
        totalPages
    }
}

export const deletePostService = async (postId) => {
    try{
        const post = await findPostById(postId);
        if(!post){
            throw new Error("Post not found");
        }
        const response = await deletePostById(postId);
        if(response){
            console.log("Post deleted successfully print in service", response);
            await deleteAwsFile(response.image);
            console.log("File deleted from AWS S3 successfully print in service");
        }
        return response;
    }
    catch(error){
        console.log(error);
        return res.status(500).json({
            message: "Internal Service error",
            success: false
        });
    }
}

export const updatePostService = async (id, updateObject) => {
    // Implement logic to delete old image uploaded on aws
    if(updateObject.image){
        const existingPost = await findPostById(id);
        if(existingPost && existingPost.image){
            await deleteAwsFile(existingPost.image);
            console.log("Old file deleted from AWS S3 successfully print in service");
        }
    }

    const response = await updatePostById(id, updateObject);
    return response;
   
}