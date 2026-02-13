import mongoose from "mongoose";
import bcrypt from 'bcrypt';

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: {
            value: true,
            message: "Username is required"
        },
        unique: true,
        minLength: 5
    },
    email: {
        type: String,
        required: [true, "Email is required"], //short hand of rquired used in username 
        unique: true,
        minLength: 5,
        validate:{
            validator: function(emailValue){
                return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(emailValue);
            },
            message: props => `${props.value} is not a valid email address`
        }
    },
    role: {
        type: String,
        default: "user",
        enum: ["user", "admin"]
    },
    password: {
        type: String,
        required: [true, "Password is required"],
        minLength: 5
    },
    posts: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Post"
    }]
}, {timestamps: true});

userSchema.pre("save", function modifyPassword(){
    // incoming user object
    const user = this;  // object with plain password

    if(!user.isModified("password")){
        return;
    }

    const salt = bcrypt.genSaltSync(10);
    const hashPassword = bcrypt.hashSync(user.password, salt);

    user.password = hashPassword; // object with hashed password
});

const User = mongoose.model("User", userSchema);

export default User;