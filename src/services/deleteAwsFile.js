import { s3 } from "../config/awsConfig.js";
import { AWS_BUCKET_NAME } from "../config/serverConfig.js";

const deleteAwsFile = async (location) => {
    try{
        const url = new URL(location);
        const key = url.pathname.substring(1);

        const params = {
            Bucket: AWS_BUCKET_NAME,
            Key: key
        }
        await s3.deleteObject(params).promise();
    }
    catch(error){
        console.log("Error deleting file from AWS S3:", error);
        throw new Error("Failed to delete file from AWS S3");
    }
}

export default deleteAwsFile;