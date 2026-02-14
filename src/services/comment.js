import { findUserByEmail } from "../repositories/userRepository.js";
import { createComment, findCommentById } from "../repositories/commentRepository.js";
import { findPostById } from "../repositories/postRepository.js";

// "Comment", content, commentId, userMail
export const createCommentService = async (onModal, content, id, userMail) => {
    try{
        const user = await findUserByEmail(userMail);
        if(!user){
            throw {
                status: 404,
                message: "User not found"
            }
        }

        let parent = await fetchCommentParent(onModal, id);
        if(!parent){
            throw {
                status: 404,
                message: `${onModal} not found`
            }
        }

        const newComment = await createComment({
            content,
            user: user._id,
            onModel: onModal,
            commentableId: id
        });
        await addChildCommentToParent(onModal, parent, newComment);
        return newComment;
    }
    catch(error){
        throw error;
    }
}

const addChildCommentToParent = async (onModel, parent, comment) => {
    try{
        if(onModel === "Comment"){
            parent.reply.push(comment._id);
        }
        else if(onModel === "Post"){
            parent.comments.push(comment._id);
        }
        await parent.save();
    }
    catch(error){
        throw error;
    }
}

const fetchCommentParent = async (onModel, commentableId) => {
    try{
        let parent;
        if(onModel === "Comment"){
            parent = await findCommentById(commentableId);
        }
        else if(onModel === "Post"){
            parent = await findPostById(commentableId);
        }
        return parent;
    }
    catch(error){
        throw error;
    }
}