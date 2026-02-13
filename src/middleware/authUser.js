import { verifyJwtToken } from '../utils/jwt.js';
import { checkIfUserExists } from '../services/userServices.js';

export const authUser = async (req, res, next) => {
    try{
        const token = req.headers['x-access-token'];
        console.log("header in authUser middleware", req.headers);
        if(!token){
            throw {
                status: 401,
                message: "Unauthorized: No token provided"
            }
        }

        const decodedToken = await verifyJwtToken(token);
        console.log("decoded token in authUser middleware", decodedToken);

        const doesUserExist = await checkIfUserExists(decodedToken.email);
        if(!doesUserExist){
            throw {
                status: 404,
                message: "User not found"
            }
        }

        req.user = decodedToken;
        next();
    }
    catch(error){
        throw error;
    }
}

export const isAdmin = async (req, res, next) => {
    if(req.user.role !== "admin"){
        return res.status(403).json({
            success: false,
            message: "Unauthorized: Admins only"
        });
    }

    next();
}