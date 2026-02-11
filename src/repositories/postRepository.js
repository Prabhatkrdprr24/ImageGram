import Post from "../schema/post.js";

export const createPostRepo = async (caption, image, user) => {
    try{
        const newPost = await Post.create({
            caption: caption,
            image: image,
            // user: user
        });
        return newPost;
    }
    catch(error){
        console.error("Error creating post:", error);
    }
}

export const findAllPosts = async (limit, offset) => {
    try{
        const posts = await Post.find().sort({ createdAt: -1 }).skip(offset).limit(limit);
        return posts;
    }
    catch(error){
        console.error("Error finding all posts:", error);
    }
}

export const countAllPosts = async () => {
    try{
        const totalPosts = await Post.countDocuments();
        return totalPosts;
    }
    catch(error){
        console.error("Error counting all posts:", error);
        return res.status(500).json({
            success: false,
            message: "Failed to count posts",
            error: error.message
        });
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

export const updatePostById = async (id, updateObject) => {
    try{
        const updatedPost = await Post.findByIdAndUpdate(id, updateObject, { new: true });
        return updatedPost;
    }
    catch(error){
        console.log(error);
    }
}