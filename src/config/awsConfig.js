import AWS, { SESV2 } from "aws-sdk";
import { AWS_ACCESS_KEY_ID, AWS_SECRET_ACCESS_KEY} from "./serverConfig.js";
import serverConfig from "./serverConfig.js";

const s3 = new AWS.S3({
    region: serverConfig.AWS_REGION,
    accessKeyId: AWS_ACCESS_KEY_ID,
    secretAccessKey: AWS_SECRET_ACCESS_KEY
});

export default s3;