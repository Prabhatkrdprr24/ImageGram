import User from "../schema/user.js";

export const findUserByEmail = async (email) => {
    try{
        const user = await User.findOne({email: email});
        return user;
    }
    catch(error){
        console.error("Error finding user by email:", error);
    }
}

export const findAllUsers = async () => {
    try{
        const users = await User.find({});    
        return users;
    }   
    catch(error){
        console.error("Error finding all users:", error);
    }
}