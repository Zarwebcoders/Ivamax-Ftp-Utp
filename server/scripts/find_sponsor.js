require('dotenv').config({ path: '../.env' });
const mongoose = require('mongoose');
const User = require('../models/User');

const findSponsor = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/ivamax');
        console.log('Connected to DB');

        const user = await User.findOne();
        if (user) {
            console.log(`FOUND_SPONSOR:${user.userId}`);
        } else {
            console.log('NO_USERS_FOUND');
        }
        process.exit(0);
    } catch (err) {
        console.error(err);
        process.exit(1);
    }
};

findSponsor();
