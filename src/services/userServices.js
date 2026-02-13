import bcrypt from 'bcrypt';
import { findUserByEmail, RegisterUser } from '../repositories/userRepository.js';
import { findDuplicateUser } from '../repositories/userRepository.js';
import { generateJwtToken } from '../utils/jwt.js';

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
                status: 400,
                message: "User already exists with this email or username"
            }
        }
        throw error;
    }
}

export const signinUserService = async (email, password) => {
    try{
        const user = await findUserByEmail(email);
        if(!user){
            throw {
                status: 404,
                message: "User not found"
            }
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if(!isPasswordValid){
            throw {
                status: 401,
                message: "Invalid password"
            }
        }

        const token = await generateJwtToken(user.email, user.role || "user");
        return token;
    }
    catch(error){
        throw error;
    }
}

export const checkIfUserExists = async (email) => {
    try{
        const user = await findUserByEmail(email);
        return user;
    }
    catch(error){
        throw error;
    }
}