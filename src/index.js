import express from 'express';
import connectDB from './config/dbConfig.js';
import apiRouter from "./routers/apiRouter.js";
import { authUser } from './middleware/authUser.js';
import swaggerUi from 'swagger-ui-express';
import swaggerJSDoc from 'swagger-jsdoc';
import swaggerOptions from '../swagger.json' with { type: 'json' };
import ip from 'ip';

const PORT = 3000;
const app = express();


app.use(express.json());
app.use(express.text());
app.use(express.urlencoded({ extended: true }));

app.use("/api", apiRouter);

app.get("/ping", (req, res) => {
    const ipaddr = ip.address();
    return res.status(200).json({
        success: true,
        message: "Pong",
        ip: ipaddr
    })
});

const swaggerSpec = swaggerJSDoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.listen(PORT, () => {
  console.log(`Server running at: http://localhost:${PORT}`);
  connectDB();
});