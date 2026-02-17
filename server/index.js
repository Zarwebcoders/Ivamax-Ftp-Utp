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
  origin: 'http://localhost:5173', // Vite default port
  credentials: true
}));
app.use(cookieParser());

// Database Connection
mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/ivamax')
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.log(err));

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

// Start Server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
