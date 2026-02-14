import mongoose from "mongoose";

const post = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: [true, "User ID is required"]
    },
    image: {
        type: String,
        required: [true, "Image URL is required"],
    },
    caption: {
        type: String,
        // required: [true, "Caption is required"],
        maxLength: 200
    },
    comments: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Comment"
    }],
    likes: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Like"
    }]
}, {timestamps: true});

const Post = mongoose.model("Post", post);

export default Post;