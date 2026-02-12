import { ZodError } from 'zod';

export const validate = (schema) => {
    return async (req, res, next) => {
        try{
            console.log("Validating request body:", req.body);
            schema.parse(req.body);
            next();
        }
        catch(error){
             if (error instanceof ZodError) {
                console.log(error.issues);  // here it comes
            }
            return res.status(400).json({
                success: false,
                message: error.issues[0].message,
                // errors: error
            });
        }
    }
}