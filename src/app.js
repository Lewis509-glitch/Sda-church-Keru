const express = require('express');
const authRoutes = require('./routes/auth');
const announcementRoutes = require('./routes/announcements');
const profileRoutes = require('./routes/profile');
const userRoutes = require('./routes/users');

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/auth', authRoutes);
app.use('/api/announcements', announcementRoutes);
app.use('/api/profile', profileRoutes);
app.use('/api/users', userRoutes);

app.get('/health', (req, res) => {
  res.json({ status: 'ok' });
});

module.exports = app;
