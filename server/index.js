import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { authRouter } from './routes/auth.js';
import { todoRouter } from './routes/todo.js';
import {healthRouter} from './routes/health.js'
import {httpLogger} from './config/httplogger.js';
import {logger} from './config/logger.js';

dotenv.config();


const app = express();
app.use(express.json());
app.use(cors());
app.use(httpLogger);

mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on('connected', () => {
  logger.info('Connected to MongoDB');
});
db.on('error', (error) => {
  console.error('Error connecting to MongoDB:', error);
});


app.use("/api/auth", authRouter);
app.use("/api", todoRouter);
app.use("/health", healthRouter);


app.listen(process.env.PORT, () => {
    logger.info(`Server is running! on port ${process.env.PORT}`);
})

app.use((err,req,res,next)=>{

    logger.error({
        message: err.message,
        stack: err.stack
    });

    res.status(500).json({
        message:"Internal Server Error"
    });

});