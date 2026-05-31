const express = require('express');
const Announcement = require('../models/Announcement');
const { authenticate, requireAdmin } = require('../middleware/auth');

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const announcements = await Announcement.find().sort({ createdAt: -1 });
    return res.json({ announcements });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Unable to load announcements.' });
  }
});

router.post('/', authenticate, requireAdmin, async (req, res) => {
  try {
    const { title, message } = req.body;
    if (!title || !message) {
      return res.status(400).json({ message: 'Title and message are required.' });
    }

    const announcement = await Announcement.create({
      title: title.trim(),
      message: message.trim(),
      author: req.user._id,
    });

    return res.status(201).json({ announcement });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Unable to create announcement.' });
  }
});

router.put('/:id', authenticate, requireAdmin, async (req, res) => {
  try {
    const { title, message } = req.body;
    const announcement = await Announcement.findById(req.params.id);
    if (!announcement) {
      return res.status(404).json({ message: 'Announcement not found.' });
    }

    announcement.title = title?.trim() || announcement.title;
    announcement.message = message?.trim() || announcement.message;
    await announcement.save();

    return res.json({ announcement });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Unable to update announcement.' });
  }
});

router.delete('/:id', authenticate, requireAdmin, async (req, res) => {
  try {
    const announcement = await Announcement.findById(req.params.id);
    if (!announcement) {
      return res.status(404).json({ message: 'Announcement not found.' });
    }

    await announcement.deleteOne();
    return res.json({ message: 'Announcement removed.' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Unable to delete announcement.' });
  }
});

module.exports = router;
