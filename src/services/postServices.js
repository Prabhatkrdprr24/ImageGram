import { createPostRepo } from "../repositories/postRepository.js";
import { findAllPosts, countAllPosts } from "../repositories/postRepository.js";

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