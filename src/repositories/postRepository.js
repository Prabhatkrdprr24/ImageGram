import Post from "../schema/post.js";

export const createPost = async (caption, image, user) => {
    try{
        const newPost = await Post.create({
            caption: caption,
            image: image,
            user: user._id
        });
        return newPost;
    }
    catch(error){
        console.error("Error creating post:", error);
    }
}

export const findAllPosts = async () => {
    try{
        const posts = await Post.find({});
        return posts;
    }
    catch(error){
        console.error("Error finding all posts:", error);
    }
}

export const findPostById = async (postId) => {
    try{
        const post = await Post.findById(postId);
        return post;
    }
    catch(error){
        console.error("Error finding post by ID:", error);
    }
}

export const deletePostById = async (postId) => {
    try{
        const deletedPost = await Post.findByIdAndDelete(postId);
        return deletedPost;
    }   
    catch(error){
        console.error("Error deleting post by ID:", error);
    }
}