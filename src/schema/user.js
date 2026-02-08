import mongoose from "mongoose";

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
    password: {
        type: String,
        required: [true, "Password is required"],
        minLength: 5
    }
}, {timestamps: true});

const User = mongoose.model("User", userSchema);

export default User;