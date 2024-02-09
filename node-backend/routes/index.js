var express = require('express');
var router = express.Router();
var Meme = require('../models/meme'); // Import Meme model (assuming you have a model for memes)

const mongoose = require('mongoose');

// MongoDB connection URI
const mongoURI = 'mongodb+srv://theHugo:3edcvfr4@omm.uijcdfg.mongodb.net/?retryWrites=true&w=majority';

// Connect to MongoDB
mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((error) => {
    console.error('Error connecting to MongoDB:', error);
  });


// GET all memes
router.get('/memes', async function(req, res, next) {
  try {
    const memes = await Meme.find();
    res.json(memes);
  } catch (error) {
    console.error('Error fetching memes:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// POST vote for a meme
router.post('/memes/:id/vote', async function(req, res, next) {
  const { id } = req.params;
  const { voteType } = req.body;

  try {
    const meme = await Meme.findById(id);

    if (!meme) {
      return res.status(404).json({ error: 'Meme not found' });
    }

    if (voteType === 'upvote') {
      meme.votes++;
    } else if (voteType === 'downvote') {
      meme.votes--;
    } else {
      return res.status(400).json({ error: 'Invalid vote type' });
    }

    await meme.save();

    return res.status(200).json({ message: 'Vote recorded successfully', meme });
  } catch (error) {
    console.error('Error voting:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;
