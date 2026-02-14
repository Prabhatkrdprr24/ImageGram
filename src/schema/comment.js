import mongoose from "mongoose";
import { minLength } from "zod";

const commentSchema = new mongoose.Schema({
    content: {
        type: String,
        required: true,
        maxLength: 300,
        minLength: 1
    },
    onModel: {
        type: String,
        required: true,
        enum: ["Post", "Comment"]
    },
    commentableId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        refPath: "onModel"
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    reply: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Comment"
    }],
    likes: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Like"
    }]
}, {timestamps: true});

const comment = mongoose.model("Comment", commentSchema);

export default comment;