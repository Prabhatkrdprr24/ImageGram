import bcrypt from 'bcrypt';
import { RegisterUser } from '../repositories/userRepository.js';
import { findDuplicateUser } from '../repositories/userRepository.js';

export const registerUserService = async (user) => {
    try{
        // check if user already exists with email or username
        const existingUser = await findDuplicateUser({
            email: user.email,
            username: user.username
        });
        if(existingUser){
            throw new Error("User already exists with this email or username");
        }

        // save user to db
        const newUser = await RegisterUser(user);
        return newUser;
    }
    catch(error){
        // console.error("Error in registerUserService:", error);
        if(error.name === "MongoServerError" && error.code === 11000){
            throw {
                stauts: 400,
message: "User already exists with this email or username"
            }
        }
        throw error;
    }
}