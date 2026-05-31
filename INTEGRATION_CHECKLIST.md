# Frontend-Backend Integration Checklist

## ✅ Backend Setup

- [x] Express server configured with CORS support
- [x] MongoDB connection setup with admin user initialization
- [x] JWT authentication middleware implemented
- [x] API routes created:
  - [x] `/api/auth/login` - User login
  - [x] `/api/auth/signup` - User registration
  - [x] `/api/profile` - Get/update user profile
  - [x] `/api/announcements` - Get/create/update/delete announcements
  - [x] `/api/users` - Admin user management
- [x] Database models:
  - [x] User schema with proper fields
  - [x] Announcement schema with timestamps
- [x] Error handling and validation
- [x] Deprecated MongoDB methods fixed (`deleteOne()` instead of `remove()`)

## ✅ Frontend Configuration

- [x] API configuration file (`api-config.js`) created
- [x] Automatic API base URL detection (localhost vs production)
- [x] Login page stores user data to localStorage
- [x] Dashboard page fetches profile from backend
- [x] Profile edit functionality implemented
- [x] Logout functionality clears all data
- [x] Announcements page fetches from backend
- [x] Admin panel for managing announcements and users

## ✅ Development Tools

- [x] Environment configuration (`.env` file)
- [x] Development startup scripts created:
  - [x] `start-dev.bat` (Windows)
  - [x] `start-dev.sh` (Linux/macOS)
- [x] Setup guide (`SETUP_GUIDE.md`) with instructions
- [x] API connection test page (`api-test.html`)

## 🔍 Quick Start

### To Start Development:

**Windows:**
```bash
.\start-dev.bat
```

**Linux/macOS:**
```bash
bash start-dev.sh
```

**Manual Start:**
```bash
npm run devStart
```

### To Test Backend Connection:

1. Ensure MongoDB is running
2. Start the backend server (port 3000)
3. Open http://localhost:3000/api-test.html
4. Click "Run Tests" button

### To Login:

1. Go to http://localhost:3000/login.html
2. Use default admin account:
   - **Name/Email**: admin@keru-sda.local
   - **Password**: Admin123!
3. Or create a new account via Sign Up

## 📋 API Endpoints Reference

### Auth Endpoints
```
POST /api/auth/login
POST /api/auth/signup
```

### Profile Endpoints (Protected)
```
GET /api/profile
PUT /api/profile
```

### Announcements Endpoints
```
GET /api/announcements (Public)
POST /api/announcements (Admin)
PUT /api/announcements/:id (Admin)
DELETE /api/announcements/:id (Admin)
```

### Users Endpoints (Admin Only)
```
GET /api/users (Admin)
POST /api/users (Admin)
DELETE /api/users/:id (Admin)
```

### Health Check
```
GET /health
```

## 🔐 Authentication Flow

1. User submits login form
2. Frontend sends credentials to `/api/auth/login`
3. Backend validates and returns JWT token + user data
4. Frontend stores token in localStorage
5. Frontend automatically includes token in Authorization header
6. Backend validates token on protected routes
7. User can access dashboard and profile

## 🚀 Deployment Options

### Vercel (Recommended)
- Already configured in `vercel.json`
- Just connect GitHub repo to Vercel
- Add environment variables
- Auto-deploys on push

### Heroku
- Update `package.json` scripts if needed
- Add Procfile with: `web: npm start`
- Deploy using Heroku CLI

### Self-Hosted
- Install Node.js and MongoDB
- Set environment variables
- Run `npm install && npm start`

## 📝 Environment Variables

Required in `.env`:
```env
MONGO_URI=mongodb://127.0.0.1:27017/sdaChurch
JWT_SECRET=supersecretkey123
ADMIN_EMAIL=admin@keru-sda.local
ADMIN_PASSWORD=Admin123!
PORT=3000
HOST=0.0.0.0
FRONTEND_URL=http://localhost:3000
```

## 🐛 Troubleshooting

### Issue: "Cannot GET /api/..."
**Solution**: 
- Check backend is running on port 3000
- Verify API routes are correctly defined
- Check CORS headers are set

### Issue: "Authentication token missing"
**Solution**:
- Clear localStorage: `localStorage.clear()`
- Login again
- Check token is stored: `localStorage.getItem('authToken')`

### Issue: MongoDB connection error
**Solution**:
- Ensure MongoDB service is running
- Check MONGO_URI in .env
- Verify database credentials

### Issue: "Port 3000 already in use"
**Solution**:
```bash
# Windows
netstat -ano | findstr :3000
taskkill /PID <PID> /F

# Linux/macOS
lsof -i :3000
kill -9 <PID>
```

## ✨ Next Steps

1. [ ] Test all API endpoints using api-test.html
2. [ ] Test login/signup functionality
3. [ ] Test profile update
4. [ ] Test announcements (admin)
5. [ ] Test user management (admin)
6. [ ] Set up MongoDB backup strategy
7. [ ] Configure HTTPS for production
8. [ ] Set up monitoring and logging
9. [ ] Deploy to production

## 📞 Support Files

- **Setup Guide**: `SETUP_GUIDE.md`
- **Integration Checklist**: This file
- **API Test Page**: `api-test.html`
- **Configuration**: `api-config.js`
- **Environment Template**: `.env.example`
