import multer from "multer";
import multerS3 from "multer-s3";
import { s3 } from "./awsConfig.js";
import { AWS_BUCKET_NAME } from "./serverConfig.js";

const storage = multerS3({
    s3: s3,
    bucket: AWS_BUCKET_NAME,
    key: function (req, file, cb) {
        console.log("file in multer print: ", file);
        if(!file){
            console.log("No file received in multer");
            return cb(new Error("No file received"), null);
        }

        // check for file mimetype i.e only jpeg and png files are allowed
        if(file.mimetype !== "image/jpeg" && file.mimetype !== "image/png"){
            console.log("Invalid file type received in multer: ", file.mimetype);
            return cb(new Error("Invalid file type. Only JPEG and PNG are allowed."), null);
        }
        
        const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1E9);
        cb(null, file.fieldname + "-" + uniqueSuffix + "." + file.mimetype.split("/")[1]);
    }
})

export const s3Uploader = multer({ storage: storage }); // s3Uploader is a middleware