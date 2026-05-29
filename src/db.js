const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const User = require('./models/User');

let connectionPromise;

const connectDB = async () => {
  if (mongoose.connection.readyState === 1) {
    return mongoose.connection;
  }
  if (connectionPromise) {
    return connectionPromise;
  }

  const MONGO_URI = process.env.MONGO_URI || 'mongodb+srv://gichigolewis51_db_user:<db_password>@cluster0.4kgpmqd.mongodb.net/sdaChurch';
  connectionPromise = mongoose.connect(MONGO_URI);

  await connectionPromise;

  const adminEmail = process.env.ADMIN_EMAIL?.toLowerCase().trim();
  const adminPassword = process.env.ADMIN_PASSWORD;

  if (adminEmail && adminPassword) {
    const existingAdmin = await User.findOne({ email: adminEmail });
    if (!existingAdmin) {
      const passwordHash = await bcrypt.hash(adminPassword, 10);
      await User.create({
        name: 'Administrator',
        email: adminEmail,
        phone: '',
        status: 'member',
        role: 'admin',
        passwordHash,
      });
      console.log('Default admin user created.');
    }
  }

  return mongoose.connection;
};

module.exports = connectDB;
