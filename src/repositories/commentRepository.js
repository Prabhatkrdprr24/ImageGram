import { populate } from "dotenv";
import Comment from "../schema/comment.js";

export const createComment = async (commentData) => {
    try{
        const newComment = await Comment.create(commentData);
        return newComment;
    }
    catch(error){
        throw error;
    }
}

export const findCommentById = async (commentId) => {
    try{
        const comment = await Comment.findById(commentId).populate("reply");
        return comment;
    }   
    catch(error){
        throw error;
    }
}