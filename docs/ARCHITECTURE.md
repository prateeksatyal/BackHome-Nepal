# 🏗️ BackHome Nepal - Architecture

## System Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                     Mobile App (Flutter)                    │
│  ┌────────────────────────────────────────────────────────┐ │
│  │ Screens: Home, Comfort Zone, AI Chat, Wellness, Profile│ │
│  │ State Management: Riverpod                              │ │
│  │ Local Storage: Hive                                     │ │
│  └────────────────────────────────────────────────────────┘ │
└────────────────────┬────────────────────────────────────────┘
                     │
          ┌──────────┴──────────┐
          │                     │
    ┌─────▼─────┐        ┌─────▼────────┐
    │ Firebase  │        │  Backend API │
    │ Services  │        │  (Node.js)   │
    └─────┬─────┘        └─────┬────────┘
          │                     │
    ┌─────┴─────┐        ┌─────┴────────┐
    │  • Auth   │        │  • Express   │
    │  • Store  │        │  • Routes    │
    │  • Real   │        │  • Controllers
    │    time   │        │  • Middleware│
    └───────────┘        └─────┬────────┘
                               │
                ┌──────────────┼──────────────┐
                │              │              │
          ┌─────▼──┐     ┌─────▼──┐   ┌─────▼──┐
          │External │     │Firebase│   │Database│
          │ APIs    │     │ Admin  │   │   DB   │
          │ • Google│     │  SDK   │   │ Postgres
          │ • OpenAI│     │        │   │        │
          │ • AQI   │     │        │   └────────┘
          └─────────┘     └────────┘
```

## Mobile App Architecture

### Folder Structure

```
mobile/lib/
├── main.dart                 # Entry point
├── screens/                  # UI Screens
│   ├── dashboard/
│   ├── comfort_zone/
│   ├── ai_assistant/
│   ├── wellness/
│   └── profile/
├── widgets/                  # Reusable widgets
│   ├── buttons/
│   ├── cards/
│   └── modals/
├── services/                 # API & external services
│   ├── api_service.dart
│   ├── firebase_service.dart
│   ├── ai_service.dart
│   └── maps_service.dart
├── models/                   # Data models
│   ├── user.dart
│   ├── comfort_zone.dart
│   ├── event.dart
│   └── mood.dart
├── providers/                # Riverpod state management
│   ├── auth_provider.dart
│   ├── comfort_zone_provider.dart
│   └── user_provider.dart
├── theme/                    # Design system
│   ├── colors.dart
│   ├── typography.dart
│   └── spacing.dart
└── utils/                    # Utilities
    ├── constants.dart
    ├── extensions.dart
    └── validators.dart
```

### State Management Flow

```
Riverpod Provider
     ↓
State Notifier
     ↓
UI Widget rebuilds
     ↓
User interacts
     ↓
Provider updates
```

## Backend Architecture

### Folder Structure

```
backend/
├── src/
│   ├── index.js              # Server entry
│   ├── routes/               # API routes
│   │   ├── ai.js
│   │   ├── comfort-zones.js
│   │   ├── transport.js
│   │   ├── food.js
│   │   ├── community.js
│   │   └── wellness.js
│   ├── controllers/          # Business logic
│   ├── middleware/           # Express middleware
│   │   ├── auth.js
│   │   ├── validation.js
│   │   └── error.js
│   ├── models/               # Database models
│   └── utils/                # Utilities
│       ├── logger.js
│       ├── validators.js
│       └── helpers.js
├── firebase/                 # Firebase config
│   └── config.js
├── .env.example              # Environment template
├── package.json
└── README.md
```

## Data Flow

### User Authentication

```
1. User enters credentials
2. Flutter app → Firebase Auth
3. Firebase returns ID Token
4. Token stored locally (encrypted)
5. Token sent with every API request
6. Backend verifies via Firebase Admin SDK
```

### API Request Flow

```
1. Mobile app makes API call
2. Add auth token to header
3. Express middleware verifies token
4. Route handler processes request
5. Controller executes business logic
6. Data fetched from Firebase/Database
7. Response sent back
8. Mobile app updates UI
```

## Database Schema

### Firestore Collections

```
- users/
  - {userId}
    - profile: { name, email, location, ... }
    - preferences: { theme, notifications, ... }

- comfort_zones/
  - {zoneId}
    - name, type, location, ratings, hours

- events/
  - {eventId}
    - name, date, location, attendees

- moods/
  - {userId}/logs/{moodId}
    - timestamp, mood, stress_level, notes

- translations/
  - {slang_word}
    - english, meaning, usage, context
```

## API Request Response Cycle

```
Request Headers:
{
  "Authorization": "Bearer <id-token>",
  "Content-Type": "application/json"
}

Response Format:
{
  "status": "success|error",
  "data": { ... },
  "message": "...",
  "timestamp": "ISO-8601"
}
```

## Error Handling

```
Global Error Handler
     ↓
Validate Input
     ↓
Database Error? → Log & Return 500
     ↓
Auth Error? → Return 401
     ↓
Business Logic Error? → Return 400
     ↓
Success → Return 200 with data
```

## Performance Optimization

- **Caching**: Redis for API responses
- **Database**: Firestore indexes
- **CDN**: For static assets
- **Compression**: gzip for responses
- **Pagination**: For large datasets
- **Rate Limiting**: 100 req/15min per IP

## Security Layers

1. **Transport**: HTTPS/TLS
2. **Authentication**: Firebase Auth
3. **Authorization**: Firestore security rules
4. **Validation**: Input validation middleware
5. **Rate Limiting**: Express rate limiter
6. **CORS**: Configured whitelist
7. **Helmet**: Security headers

## Scalability

- **Horizontal**: Multiple backend instances
- **Database**: Firestore auto-scaling
- **Caching**: Redis cluster
- **API Gateway**: Load balancer
- **Monitoring**: Firebase/CloudWatch
