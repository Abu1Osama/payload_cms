// Import necessary modules
import express from 'express';
import payload from 'payload';
import cors from 'cors';

// Import your collection configurations
import Media from './collections/Media';
import Posts from './collections/Posts';

// Load environment variables
require('dotenv').config();

// Create Express app
const app = express();
app.use(cors());

// Redirect root to Admin panel
app.get('/', (_, res) => {
  res.redirect('/admin');
});

// Initialize Payload
const start = async () => {
  await payload.init({
    secret: process.env.PAYLOAD_SECRET,
    express: app,
    onInit: async () => {
      payload.logger.info(`Payload Admin URL: ${payload.getAdminURL()}`);
    },
  });

  // Define custom route for fetching short videos
  app.get('/posts/videos/stream', async (req, res) => {
    try {
      const shortVideos = await payload.find({
        collection: Posts.slug,
        depth: 2,
        where: {
          type: { equals: 'short_video' },
        },
      });
  
      res.json(shortVideos);
    } catch (error) {
      console.error('Error fetching short videos:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });
  
  app.get('/media', async (req, res) => {
    try {
      const allMedia = await payload.find({
        collection: Media.slug,
      });

      res.json(allMedia);
    } catch (error) {
      console.error('Error fetching media items:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });

  // Start Express server
  app.listen(3000, () => {
    console.log('Server is running on port 3000');
  });
};

start();