// src/app.ts
import express from 'express';
import mongoose from 'mongoose';
import authRoutes from './routes/auth';
import watchlistRoutes from './routes/watchlist';
import alertRoutes from './routes/alert';
import dotenv from 'dotenv';
import cors from 'cors';
import { startPriceChecker } from './utils/priceChecker'; // Import the price checker
import http from 'http';
import { Server } from 'socket.io';
import jwt from 'jsonwebtoken';

// Initialize Express app
const app = express();
dotenv.config();

// Create HTTP server
const server = http.createServer(app);

// Initialize Socket.IO server
export const io = new Server(server, {
    cors: {
        origin: "*", // Allows all origins
        methods: ["GET", "POST"],
        credentials: true
    }
});

// Apply middleware
app.use(cors());
app.use(express.json());

// Define routes
app.use('/api/auth', authRoutes);
app.use('/api/watchlist', watchlistRoutes);
app.use('/api/alerts', alertRoutes);

// Socket.IO authentication middleware
io.use((socket, next) => {
    const token = socket.handshake.auth.token;
    if (token) {
        jwt.verify(token, process.env.JWT_SECRET as string, (err: any, decoded: any) => {
            if (err) {
                return next(new Error('Authentication error'));
            }
            (socket as any).user = decoded;
            next();
        });
    } else {
        next(new Error('Authentication error'));
    }
}).on('connection', (socket) => {
    const user = (socket as any).user;
    console.log('a user connected:', user);
    socket.join(user._id); // Join room with user ID
    socket.on('disconnect', () => {
        console.log('user disconnected');
    });
});

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI!)
    .then(() => {
        console.log('MongoDB connected');
        // Start the price checker after successful database connection
        startPriceChecker(io);
    })
    .catch((err) => console.error(err));

// Export app and server for usage in server.ts
export default app;
export { server };
