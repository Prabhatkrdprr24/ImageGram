import { createPostRepo, findPostById } from "../repositories/postRepository.js";
import { findAllPosts, countAllPosts } from "../repositories/postRepository.js";
import { deletePostById } from "../repositories/postRepository.js";
import { updatePostById } from "../repositories/postRepository.js";
import deleteAwsFile from "../services/deleteAwsFile.js";
import { findUserByEmail } from "../repositories/userRepository.js";
import User from "../schema/user.js";


export const createPostService = async(createPostObject) => {
    try{
        const caption = createPostObject.caption?.trim();
        const image = createPostObject.image;
        const user = createPostObject.user;

        const userObject = await findUserByEmail(user.email);

        const post = await createPostRepo(caption, image, userObject);

        userObject.posts.push(post._id);
        await userObject.save();
        return post;
    }
    catch(error){
        throw error;
    }
}

export const getAllPostsService = async (limit, offset) => {
    const posts = await findAllPosts(limit, offset);

      // Populate user details for each post without password field manually
    // await Promise.all(
    //     posts.map(async (post) => {
    //         const userDetails = await User.findById(post.user).select("-password");
    //         post.user = userDetails;
    //     })
    // );
        // orr
    // for (const post of posts) {
    //     const userDetails = await User.findById(post.user).select("-password");
    //     post.user = userDetails;
    // }


    // Calculate total no of posts and total no of pages
    const totalDocuments = await countAllPosts();
    const totalPages = Math.ceil(totalDocuments / limit);

    return {
        posts,
        totalDocuments,
        totalPages
    }
}

export const deletePostService = async (postId, user) => {
    try{
        const post = await findPostById(postId);
        const userObject = await findUserByEmail(user.email);
        if(!post){
            throw new Error("Post not found");
        }

        if(post.user._id.toString() !== userObject._id.toString()){
            throw new Error("Unauthorized to delete this post");
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