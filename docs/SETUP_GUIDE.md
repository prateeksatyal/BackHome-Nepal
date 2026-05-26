# 🚀 BackHome Nepal - Setup Guide

## Prerequisites

- **Flutter SDK**: v3.0 or higher
- **Node.js**: v18 or higher
- **npm** or **yarn**
- **Firebase CLI**
- **Android Studio** (for Android development)
- **Xcode** (for iOS development)
- **Git**

## Mobile App Setup (Flutter)

### 1. Install Flutter

```bash
# Download Flutter
git clone https://github.com/flutter/flutter.git -b stable

# Add Flutter to PATH
export PATH="$PATH:`pwd`/flutter/bin"

# Verify installation
flutter --version
```

### 2. Setup Mobile Project

```bash
# Navigate to mobile directory
cd BackHome-Nepal/mobile

# Get dependencies
flutter pub get

# Run the app
flutter run
```

### 3. Configure Firebase (Flutter)

1. Create a Firebase project at [firebase.google.com](https://firebase.google.com)
2. Add iOS and Android apps to your project
3. Download `google-services.json` (Android)
4. Download `GoogleService-Info.plist` (iOS)
5. Place them in respective directories

## Backend Setup (Node.js)

### 1. Install Node.js

```bash
# Using nvm (recommended)
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.0/install.sh | bash
nvm install 18
nvm use 18
```

### 2. Setup Backend Project

```bash
# Navigate to backend directory
cd BackHome-Nepal/backend

# Install dependencies
npm install

# Create .env file
cp .env.example .env

# Edit .env with your configuration
nano .env
```

### 3. Start Development Server

```bash
# Install nodemon globally (optional)
npm install -g nodemon

# Start server
npm run dev

# Server will run on http://localhost:5000
```

## Firebase Setup

### 1. Initialize Firebase Project

```bash
npm install -g firebase-tools
firebase login
firebase init
```

### 2. Deploy Backend to Firebase

```bash
firebase deploy
```

### 3. Setup Firestore Database

1. Go to Firebase Console
2. Create Firestore Database
3. Set security rules:

```firestore
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /{document=**} {
      allow read, write: if request.auth != null;
    }
  }
}
```

## API Integration

### Get API Keys

1. **Google Maps API**: https://console.cloud.google.com
2. **OpenAI API**: https://platform.openai.com/api-keys
3. **AQI API**: https://aqicn.org/api/

### Add to .env

```bash
GOOGLE_MAPS_API_KEY=your_key
OPENAI_API_KEY=your_key
AQI_API_KEY=your_key
```

## Running Locally

### Terminal 1: Backend Server

```bash
cd backend
npm run dev
```

### Terminal 2: Flutter App

```bash
cd mobile
flutter run
```

## Testing

### Backend Tests

```bash
cd backend
npm run test
```

### Flutter Tests

```bash
cd mobile
flutter test
```

## Common Issues & Solutions

### Issue: Pod install fails (iOS)

```bash
cd mobile/ios
pod repo update
pod install
cd ..
```

### Issue: Android build fails

```bash
flutter clean
flutter pub get
flutter run
```

### Issue: Firebase connection fails

- Verify .env variables are correct
- Check Firebase project ID matches
- Ensure API keys have correct permissions

## Deployment

See [DEPLOYMENT.md](DEPLOYMENT.md) for publishing to App Store and Google Play.
