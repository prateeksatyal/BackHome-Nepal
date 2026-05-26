# 🚀 BackHome Nepal - Deployment Guide

## iOS Deployment

### Prerequisites
- Apple Developer Account
- Mac with Xcode
- Certificates and Provisioning Profiles

### Steps

1. **Update Version Number**
```bash
cd mobile/ios
# Edit pubspec.yaml
version: 1.0.0+1
```

2. **Build for iOS**
```bash
flutter build ios --release
```

3. **Archive App**
```bash
open ios/Runner.xcworkspace
# In Xcode: Product → Archive
```

4. **Upload to App Store**
```bash
# Use Xcode Organizer to upload
```

## Android Deployment

### Prerequisites
- Google Play Developer Account
- Signing key (keystore file)

### Steps

1. **Generate Signing Key** (if not exists)
```bash
keytool -genkey -v -keystore ~/backhome_nepal.keystore -keyalg RSA -keysize 2048 -validity 10000 -alias backhome
```

2. **Create key.properties**
```bash
cd mobile/android
cat > key.properties << EOF
storePassword=YOUR_PASSWORD
keyPassword=YOUR_PASSWORD
keyAlias=backhome
storeFile=/path/to/backhome_nepal.keystore
EOF
```

3. **Build APK**
```bash
flutter build apk --release
```

4. **Build App Bundle**
```bash
flutter build appbundle --release
```

5. **Upload to Google Play**
```bash
# Use Google Play Console to upload build/app/outputs/bundle/release/app-release.aab
```

## Backend Deployment

### Deploy to Firebase Cloud Functions

1. **Install Firebase CLI**
```bash
npm install -g firebase-tools
```

2. **Initialize Firebase**
```bash
cd backend
firebase init functions
```

3. **Deploy**
```bash
firebase deploy
```

### Deploy to Heroku

1. **Create Procfile**
```
web: node src/index.js
```

2. **Deploy**
```bash
heroku login
heroku create backhome-nepal-api
git push heroku main
```

### Deploy to AWS EC2

1. **SSH into Instance**
```bash
ssh -i your-key.pem ec2-user@your-instance-ip
```

2. **Install Node.js**
```bash
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs
```

3. **Clone and Setup**
```bash
git clone your-repo.git
cd BackHome-Nepal/backend
npm install
```

4. **Run with PM2**
```bash
sudo npm install -g pm2
pm2 start src/index.js --name "backhome-api"
pm2 startup
pm2 save
```

## Environment Setup

### Production .env
```
NODE_ENV=production
PORT=8080
OPENAI_API_KEY=<production_key>
FIREBASE_PROJECT_ID=<production_id>
```

## Continuous Deployment

### GitHub Actions

Create `.github/workflows/deploy.yml`:

```yaml
name: Deploy

on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - name: Deploy to Firebase
        run: |
          npm install -g firebase-tools
          firebase deploy --token ${{ secrets.FIREBASE_TOKEN }}
```

## Monitoring

### Firebase Console
- Monitor API calls
- Check database performance
- Review security rules

### Application Performance
- Response times
- Error rates
- User sessions

## Rollback Procedure

```bash
# Firebase
firebase functions:delete functionName

# Heroku
heroku releases:rollback

# AWS
cd BackHome-Nepal/backend
git revert <commit-sha>
git push origin main
```

## Performance Optimization

- Enable caching on Maps API
- Compress API responses
- Optimize database queries
- Use CDN for static assets
- Enable gzip compression

## Security Checklist

- [ ] All API keys in environment variables
- [ ] HTTPS enabled
- [ ] Firebase security rules set
- [ ] Rate limiting enabled
- [ ] CORS configured
- [ ] Input validation active
- [ ] Error messages sanitized
- [ ] Dependencies updated
