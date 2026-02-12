import { registerUserService } from "../services/userServices.js";

export async function getProfile(req, res){
    // return umimplemented error
    return res.status(501).json({
        success: false,
        message: "Not implemented yet"
    })
}

export const signup = async (req, res) => {
    try{
        const registerObject = req.body;
        console.log("Request body print in controller", req);
        const email = registerObject.email;
        const password = registerObject.password;
        const username = registerObject.username;

        if(!email || !password || !username){
            return res.status(400).json({
                success: false,
                message: "Email, password and username are required"
            });
        }

        const response = await registerUserService({ email, password, username });
        // console.log("Response from service print in controller", response);

        return res.status(201).json({
            success: true,
            message: "User registered successfully",
            data: response
        });
    }
    catch(error){
        if(error.status){
            return res.status(error.status).json({
                success: false,
                message: error.message
            });
        }
        return res.status(500).json({
            success: false,
            message: "Failed to signup",
            error: error.message
        })
    }
}