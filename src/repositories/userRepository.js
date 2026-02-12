import User from "../schema/user.js";

export const RegisterUser = async (user) => {
    try{
        
        const newUser = new User({
            username: user.username,
            email: user.email,
            password: user.password
        });

        const savedUser = await newUser.save();
        return savedUser;
    }
    catch(error){
        throw error;
    }
}

export const findDuplicateUser = async ({ email, username }) => {
    try{
        const user = await User.findOne({
            $or: [
                { email: email },
                { username: username }
            ]
        });
        return user;
    }
    catch(error){
        console.error("Error finding duplicate user:", error);
    }
}

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