require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const cookieParser = require('cookie-parser');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(express.json());
app.use(cors({
  origin: ['http://localhost:5173', 'https://ivamax-ftp-utp.vercel.app'],
  credentials: true
}));
app.use(cookieParser());

// Database Connection (Serverless Global Caching)
const MONGODB_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/ivamax';

if (!MONGODB_URI) {
  throw new Error('Please define the MONGO_URI environment variable inside .env');
}

let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

async function dbConnect() {
  if (cached.conn) {
    return cached.conn;
  }
  if (!cached.promise) {
    const opts = {
      bufferCommands: false, // Important for serverless
    };
    cached.promise = mongoose.connect(MONGODB_URI, opts).then((mongoose) => {
      console.log('MongoDB Connected / Reused');
      return mongoose;
    });
  }
  cached.conn = await cached.promise;
  return cached.conn;
}

// Ensure DB connects before requests in Serverless
app.use(async (req, res, next) => {
  await dbConnect();
  next();
});

const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/user');
const walletRoutes = require('./routes/wallet');
const stakeRoutes = require('./routes/stake');

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/user', userRoutes);
app.use('/api/wallet', walletRoutes);
app.use('/api/stake', stakeRoutes);
app.use('/api/support', require('./routes/support'));
app.use('/api/admin', require('./routes/admin'));

app.get('/', (req, res) => {
  res.send('IVAMAX V1.0 API Running');
});

// Start Cron Jobs
require('./cron/dailyRoi');
require('./cron/dailyBinary');

// Start Server only if NOT in Vercel Serverless environment
if (process.env.NODE_ENV !== 'production') {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}

// Export for Vercel
module.exports = app;
