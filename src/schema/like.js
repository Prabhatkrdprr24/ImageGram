import mongoose from "mongoose";

const likeSchema = new mongoose.Schema({
    onModel: {
        type: String,
        required: [true, "Liked model is required"],
        enum: ["Post", "Comment"]
    },
    likableId: {
        type: mongoose.Schema.Types.ObjectId,
        required: [true, "Liked model ID is required"],
        refPath: "onModel"
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: [true, "User ID is required"]
    }
}, {timestamps: true});

const like = mongoose.model("like", likeSchema);

export default like;