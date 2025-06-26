import express from 'express';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import { connectDB } from './config/db.js';

dotenv.config();

import authRoute from './routes/auth.route.js';
import NoteRoute from './routes/note.route.js';

const app = express();
const PORT = process.env.PORT;

// ✅ Define allowed origins
const allowedOrigins = [
  'http://localhost:3000',
  'http://localhost:5173', // Vite (optional)
  'https://notes-app-client-mtvc.onrender.com', // Add your prod URL here
];

// ✅ Middleware
app.use(express.json());
app.use(cookieParser());

// ✅ Enable CORS for multiple origins
app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error('Not allowed by CORS'));
      }
    },
    credentials: true,
  })
);

// ✅ Routes
app.use('/api/auth', authRoute);
app.use('/api/notes', NoteRoute);

// ✅ Start Server
app.listen(PORT, () => {
  console.log(`Server is running on PORT ${PORT}`);
  connectDB();
});
