import { createPostRepo } from "../repositories/postRepository.js";

export const createPostService = async(createPostObject) => {
    const caption = createPostObject.caption?.trim();
    const image = createPostObject.image;
    // const user = createPostObject.user;

    const post = await createPostRepo(caption, image);
    return post;
}