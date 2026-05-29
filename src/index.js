const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const dotenv = require('dotenv');

dotenv.config();

const authRoutes = require('./routes/auth');
const announcementRoutes = require('./routes/announcements');
const profileRoutes = require('./routes/profile');
const userRoutes = require('./routes/users');
const User = require('./models/User');

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const publicPath = path.join(__dirname, '..');
console.log('Serving frontend from:', publicPath);
app.use(express.static(publicPath));

app.use('/api/auth', authRoutes);
app.use('/api/announcements', announcementRoutes);
app.use('/api/profile', profileRoutes);
app.use('/api/users', userRoutes);

app.get('/health', (req, res) => {
  res.json({ status: 'ok' });
});

app.get('/', (req, res) => {
  res.sendFile(path.join(publicPath, 'index.html'));
});

app.use((req, res) => {
  if (req.path.startsWith('/api') || path.extname(req.path)) {
    return res.status(404).send('Not Found');
  }

  return res.sendFile(path.join(publicPath, 'index.html'));
});

const PORT = process.env.PORT || 3000;
const MONGO_URI = process.env.MONGO_URI || 'mongodb+srv://gichigolewis51_db_user:<db_password>@cluster0.4kgpmqd.mongodb.net/sdaChurch';

mongoose.connect(MONGO_URI)
  .then(async () => {
    console.log('Connected to MongoDB');

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

    const HOST = process.env.HOST || '0.0.0.0';
    app.listen(PORT, HOST, () => {
      console.log(`Server is running on https://sda-church-keru.vercel.app/`);
    });
  })
  .catch((err) => {
    console.error('MongoDB connection error:', err);
    process.exit(1);
  });
