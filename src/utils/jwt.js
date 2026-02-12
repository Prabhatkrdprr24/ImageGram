import jwt from 'jsonwebtoken';
import { JWT_SECRET } from '../config/serverConfig.js';

export const generateJwtToken = async (email) => {
    try{
        const token = await jwt.sign(
            { email: email}, 
            JWT_SECRET, 
            { expiresIn: "1y" }
        );
        return token;
    }
    catch(error){
        throw error;
    }
}