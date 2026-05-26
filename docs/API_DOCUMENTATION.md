# 📚 BackHome Nepal API Documentation

## Base URL

```
http://localhost:5000
Production: https://api.backhomenepal.com
```

## Authentication

All endpoints (except health check) require Firebase authentication.

## Endpoints

### Health Check

```http
GET /api/health
```

**Response:**
```json
{
  "status": "OK",
  "message": "BackHome Nepal API is running",
  "timestamp": "2026-05-26T16:30:00Z"
}
```

### AI Chat

```http
POST /api/ai/chat
Content-Type: application/json
Authorization: Bearer <token>
```

**Request Body:**
```json
{
  "message": "Is this area safe at night?",
  "context": "Thamel, Kathmandu"
}
```

**Response:**
```json
{
  "response": "Thamel is generally safe...",
  "confidence": 0.95,
  "sources": ["local_experts", "user_reviews"]
}
```

### Get Comfort Zones

```http
GET /api/comfort-zones?area=Thamel&type=cafe
Authorization: Bearer <token>
```

**Response:**
```json
{
  "zones": [
    {
      "id": 1,
      "name": "Coffee Day",
      "type": "cafe",
      "location": {
        "lat": 27.7172,
        "lng": 85.3240
      },
      "ratings": {
        "overall": 4.8,
        "hygiene": 4.9,
        "wifi": 4.7,
        "feels_like_london": 4.5
      },
      "hours": "7:00 AM - 10:00 PM",
      "price_range": "₹100-300"
    }
  ],
  "total": 1
}
```

### Safe Restaurants

```http
GET /api/food/restaurants?area=Thamel&diet=vegetarian
Authorization: Bearer <token>
```

**Response:**
```json
{
  "restaurants": [
    {
      "id": 1,
      "name": "Moksh",
      "area": "Thamel",
      "cuisine": "Nepali",
      "ratings": {
        "hygiene": 4.8,
        "taste": 4.7,
        "safety": 4.9
      },
      "menu_highlights": ["Dal Bhat", "Momos"],
      "water_source": "Filtered"
    }
  ],
  "total": 1
}
```

### Community Events

```http
GET /api/community/events?date=2026-05-30
Authorization: Bearer <token>
```

**Response:**
```json
{
  "events": [
    {
      "id": 1,
      "name": "Football Meetup",
      "date": "2026-05-30",
      "time": "5:00 PM",
      "location": "TU Stadium",
      "attendees": 12,
      "category": "sports",
      "description": "Weekly football game for expats"
    }
  ],
  "total": 1
}
```

### Mood Tracker

```http
POST /api/wellness/mood-tracker
Content-Type: application/json
Authorization: Bearer <token>
```

**Request Body:**
```json
{
  "mood": "happy",
  "stress_level": 3,
  "energy": 7,
  "notes": "Had a good day"
}
```

**Response:**
```json
{
  "id": "mood_123",
  "created_at": "2026-05-26T16:30:00Z",
  "status": "recorded"
}
```

## Error Responses

### 400 Bad Request
```json
{
  "error": "Bad Request",
  "message": "Missing required fields"
}
```

### 401 Unauthorized
```json
{
  "error": "Unauthorized",
  "message": "Invalid or expired token"
}
```

### 404 Not Found
```json
{
  "error": "Not Found",
  "message": "Resource not found"
}
```

### 500 Internal Server Error
```json
{
  "error": "Internal Server Error",
  "message": "Something went wrong"
}
```

## Rate Limiting

- **100 requests per 15 minutes** per IP address
- Returns 429 status when limit exceeded

## Response Headers

```
Content-Type: application/json
X-RateLimit-Limit: 100
X-RateLimit-Remaining: 95
X-RateLimit-Reset: 1234567890
```
