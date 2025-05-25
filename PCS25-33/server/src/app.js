import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';

const app = express();

app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true
}))

app.use(express.json());
app.use(cookieParser());

// Import routes

import userRouter from './routes/user.routes.js'
import grievanceRouter from './routes/grievance.routes.js'
import petitionRouter from './routes/petition.routes.js'

//Routes declaration

app.use("/api/v1/users", userRouter) // /api/v1/users is prefix
app.use("/api/v1/grievances", grievanceRouter)
app.use("/api/v1/petitions", petitionRouter)


export default app;