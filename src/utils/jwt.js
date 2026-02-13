import jwt from 'jsonwebtoken';
import { JWT_SECRET } from '../config/serverConfig.js';

export const generateJwtToken = async (email, userRole) => {
    try{
        const token = await jwt.sign(
            { email: email, role: userRole}, 
            JWT_SECRET, 
            { expiresIn: "1y" }
        );
        return token;
    }
    catch(error){
        throw error;
    }
}

export const verifyJwtToken = async (token) => {
    try{
        const decodedToken = await jwt.verify(token, JWT_SECRET);
        return decodedToken;
    }
    catch(error){
        throw error;
    }
}