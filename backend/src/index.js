require('dotenv').config();
const express = require('express');
const cors = require('express-cors');
const helmet = require('helmet');
const morgan = require('morgan');
const rateLimit = require('express-rate-limit');

const app = express();

// Security Middleware
app.use(helmet());
app.use(cors());
app.use(morgan('dev'));

// Rate Limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
});
app.use(limiter);

// Body Parser
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ limit: '10mb', extended: true }));

// Health Check Route
app.get('/', (req, res) => {
  res.json({
    name: 'BackHome Nepal API',
    version: '1.0.0',
    status: 'running',
  });
});

// Health Check API
app.get('/api/health', (req, res) => {
  res.json({
    status: 'OK',
    message: 'BackHome Nepal API is running',
    timestamp: new Date().toISOString(),
  });
});

// AI Assistant Routes
app.post('/api/ai/chat', (req, res) => {
  try {
    const { message } = req.body;
    // AI chat endpoint to be implemented with OpenAI
    res.json({ 
      response: 'I\'m here to help you adapt to Nepal!',
      status: 'In development'
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Comfort Zone Routes
app.get('/api/comfort-zones', (req, res) => {
  try {
    // Get comfort zones from database
    res.json({ 
      zones: [
        { id: 1, name: 'Coffee day', type: 'cafe', rating: 4.8 },
        { id: 2, name: 'Namaste Yoga Studio', type: 'gym', rating: 4.6 },
        { id: 3, name: 'Phat Momo', type: 'restaurant', rating: 4.5 },
      ],
      total: 3
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Safe Transport Routes
app.get('/api/transport/safe-routes', (req, res) => {
  try {
    res.json({ 
      routes: [],
      message: 'Safe transport routes - in development'
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Safe Food Routes
app.get('/api/food/restaurants', (req, res) => {
  try {
    res.json({ 
      restaurants: [
        { name: 'Moksh', area: 'Thamel', hygiene: 4.8 },
        { name: 'Nirvana Cafe', area: 'Lazimpat', hygiene: 4.7 },
      ],
      total: 2
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Community Routes
app.get('/api/community/events', (req, res) => {
  try {
    res.json({ 
      events: [
        { id: 1, name: 'Football Meetup', date: '2026-05-30', attendees: 12 },
        { id: 2, name: 'Expat Coffee Hangout', date: '2026-05-28', attendees: 8 },
      ],
      total: 2
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Wellness Routes
app.get('/api/wellness/mood-tracker', (req, res) => {
  try {
    res.json({ 
      moods: [],
      message: 'Mood tracking - in development'
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Error Handling Middleware
app.use((err, req, res, next) => {
  console.error('Error:', err);
  res.status(500).json({
    error: 'Internal Server Error',
    message: err.message,
  });
});

// 404 Handler
app.use((req, res) => {
  res.status(404).json({
    error: 'Not Found',
    message: `Route ${req.method} ${req.path} not found`,
  });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 BackHome Nepal API running on port ${PORT}`);
  console.log(`📍 Environment: ${process.env.NODE_ENV || 'development'}`);
  console.log(`📝 Timestamp: ${new Date().toISOString()}`);
});

module.exports = app;