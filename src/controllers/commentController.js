import { createCommentService } from "../services/comment.js";
import { findCommentByIdService } from "../services/comment.js";

export const commentController = async (req, res) => {
    try{
        const commentId = req.params.commentId;
        const { content } = req.body;
        const userMail = req.user.email;

        const comment = await createCommentService("Comment", content, commentId, userMail);

        return res.status(201).json({
            success: true,
            message: "Comment created successfully",
            comment: comment
        })
    }
    catch(error){
        return res.status(error.status || 500).json({
            success: false,
            message: error.message || "Internal Server Error"
        })
    }
}

export const postController = async (req, res) => {
    try{
        const postId = req.params.postId;
        const { content } = req.body;
        const userMail = req.user.email;

        console.log("comment post controller", postId, content, userMail);

        const comment = await createCommentService("Post", content, postId, userMail);

        return res.status(201).json({
            success: true,
            message: "Comment on post created successfully",
            comment: comment
        })
    }
    catch(error){
        return res.status(error.status || 500).json({
            success: false,
            message: error.message || "Internal Server Error"
        })
    }
}

export const getCommentById = async (req, res) => {
    try{
        const commentId = req.params.commentId;

        const comment = await findCommentByIdService(commentId);
        return res.status(200).json({
            success: true,
            comment: comment
        });
    }
    catch(error){
        return res.status(error.status || 500).json({
            success: false,
            message: error.message || "Internal Server Error"
        })
    }
}