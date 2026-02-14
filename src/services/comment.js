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

        const commentData = await createComment({
            content: content,
            onModel: onModal,
            commentableId: id,
            user: user._id
        });

        if(onModal === "Comment"){
            const comment = await findCommentById(id);
            if(!comment){
                throw {
                    status: 404,
                    message: "Comment not found"
                }
            }

           comment.reply.push(commentData._id);
           await comment.save(); 
        }
        else if(onModal === "Post"){
            const post = await findPostById(id);
            if(!post){
                throw {
                    status: 404,
                    message: "Post not found"
                }
            }

            post.comments.push(commentData._id);
            await post.save();
        }

        return commentData;
    }
    catch(error){
        throw error;
    }
}

