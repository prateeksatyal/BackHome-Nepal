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

// Routes
app.get('/api/health', (req, res) => {
  res.json({
    status: 'OK',
    message: 'BackHome Nepal API is running',
    timestamp: new Date().toISOString(),
  });
});

// AI Assistant Routes
app.post('/api/ai/chat', (req, res) => {
  // AI chat endpoint to be implemented
  res.json({ message: 'AI chat endpoint', status: 'coming soon' });
});

// Comfort Zone Routes
app.get('/api/comfort-zones', (req, res) => {
  // Get comfort zones
  res.json({ zones: [], status: 'coming soon' });
});

// Safe Transport Routes
app.get('/api/transport/safe-routes', (req, res) => {
  // Get safe routes
  res.json({ routes: [], status: 'coming soon' });
});

// Safe Food Routes
app.get('/api/food/restaurants', (req, res) => {
  // Get safe restaurants
  res.json({ restaurants: [], status: 'coming soon' });
});

// Community Routes
app.get('/api/community/events', (req, res) => {
  // Get community events
  res.json({ events: [], status: 'coming soon' });
});

// Wellness Routes
app.get('/api/wellness/mood-tracker', (req, res) => {
  // Get mood tracking
  res.json({ moods: [], status: 'coming soon' });
});

// Health Check Route
app.get('/', (req, res) => {
  res.json({
    name: 'BackHome Nepal API',
    version: '1.0.0',
    status: 'running',
  });
});

// Error Handling Middleware
app.use((err, req, res, next) => {
  console.error(err);
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
});

module.exports = app;
