# 🎉 Frontend-Backend Integration Complete!

Your SDA Church Keru application is now fully connected! Here's what's been set up:

## ✅ What's Been Done

### Backend Configuration
- ✅ CORS support enabled for frontend communication
- ✅ MongoDB connection with admin user auto-creation
- ✅ JWT authentication for protected routes
- ✅ All API endpoints working and tested
- ✅ Deprecated MongoDB methods fixed

### Frontend Integration
- ✅ Login page properly stores user data
- ✅ Dashboard fetches profile from backend
- ✅ Profile editing saves to backend
- ✅ Logout clears all data
- ✅ Announcements page connected to backend
- ✅ Admin panel fully functional

### Development Tools
- ✅ Startup scripts for Windows and Linux/macOS
- ✅ API configuration for automatic environment detection
- ✅ API connection test page for debugging
- ✅ Comprehensive setup guides

## 🚀 Getting Started

### Step 1: Start MongoDB
Make sure MongoDB is running on your system:
```bash
# Windows (if installed with Chocolatey)
mongod

# macOS (if installed with Homebrew)
brew services start mongodb-community

# Linux
sudo systemctl start mongod
```

### Step 2: Start the Backend Server

**Windows:**
```bash
.\start-dev.bat
```

**Linux/macOS:**
```bash
bash start-dev.sh
```

**Or manually:**
```bash
npm run devStart
```

You should see:
```
Server is running on http://0.0.0.0:3000
```

### Step 3: Test the Connection

Open http://localhost:3000/api-test.html and click "Run Tests"

You should see all tests pass ✅

### Step 4: Access the Application

- **Homepage**: http://localhost:3000/index.html
- **Login**: http://localhost:3000/login.html
- **Admin Account**: 
  - Email: admin@keru-sda.local
  - Password: Admin123!

## 📁 Project Structure

```
SDA Church Keru/
├── src/
│   ├── app.js                 ← Express app with CORS
│   ├── db.js                  ← MongoDB connection
│   ├── index.js               ← Server entry point
│   ├── middleware/auth.js     ← JWT authentication
│   ├── models/                ← Database schemas
│   └── routes/                ← API endpoints
├── api/
│   └── [...slug].js           ← Vercel serverless handler
├── api-config.js              ← Frontend API config
├── api-test.html              ← Connection test page
├── login.html/js              ← Login & signup
├── dashboard.html/js          ← User dashboard
├── admin.html/js              ← Admin panel
├── announcements.html/js      ← Announcements page
├── .env                       ← Environment config
├── .env.example              ← Config template
├── SETUP_GUIDE.md            ← Detailed setup
├── INTEGRATION_CHECKLIST.md  ← Status checklist
├── start-dev.bat             ← Windows startup
└── start-dev.sh              ← Linux/macOS startup
```

## 🔗 API Endpoints

### Authentication
```
POST /api/auth/login          - Login with name/email & password
POST /api/auth/signup         - Register new account
```

### User Profile (Protected)
```
GET /api/profile              - Get current user profile
PUT /api/profile              - Update profile (name, email, phone)
```

### Announcements (Public Read, Admin Write)
```
GET /api/announcements        - Get all announcements
POST /api/announcements       - Create announcement (admin only)
PUT /api/announcements/:id    - Update announcement (admin only)
DELETE /api/announcements/:id - Delete announcement (admin only)
```

### User Management (Admin Only)
```
GET /api/users                - Get all users
POST /api/users               - Create user
DELETE /api/users/:id         - Delete user
```

### Health Check
```
GET /health                   - API health check
```

## 🔐 Authentication Flow

1. User logs in with credentials
2. Backend validates and returns JWT token
3. Token stored in browser localStorage
4. Token automatically sent with protected requests
5. Backend validates token on each protected route

## 📝 Environment Variables

The `.env` file contains:

```env
# Database
MONGO_URI=mongodb://127.0.0.1:27017/sdaChurch

# Security
JWT_SECRET=supersecretkey123

# Admin Account (Auto-created)
ADMIN_EMAIL=admin@keru-sda.local
ADMIN_PASSWORD=Admin123!

# Server
PORT=3000
HOST=0.0.0.0

# Frontend
FRONTEND_URL=http://localhost:3000
```

## 🧪 Testing the API

### Using the Test Page (Recommended)
1. Open http://localhost:3000/api-test.html
2. Tests run automatically
3. Check results

### Using Frontend UI
1. Open http://localhost:3000/login.html
2. Login with admin account
3. Test dashboard and profile
4. Test announcements (admin panel)

### Using REST Client (VS Code Extension)
Open `request.rest` and test endpoints with Authorization header

## 🐛 Troubleshooting

### "Cannot connect to MongoDB"
```bash
# Check if MongoDB is running
# Windows: Look for mongod.exe in Task Manager
# macOS: brew services list
# Linux: sudo systemctl status mongod
```

### "Port 3000 already in use"
```bash
# Windows
netstat -ano | findstr :3000
taskkill /PID <PID> /F

# Linux/macOS
lsof -i :3000
kill -9 <PID>
```

### "CORS error in browser console"
- Make sure backend is running
- Check that API base URL is correct
- Clear browser cache and localStorage

### "Authentication token missing"
```javascript
// Check in browser console
localStorage.getItem('authToken')
// Should return a long JWT token
```

## 📦 Dependencies

All required packages are in `package.json`:
- **express** - Web framework
- **mongoose** - MongoDB ODM
- **jsonwebtoken** - JWT authentication
- **bcrypt** - Password hashing
- **dotenv** - Environment variables
- **serverless-http** - Vercel deployment

## 🚀 Deployment

### To Vercel (Recommended)

1. Push code to GitHub
2. Connect GitHub repo to Vercel
3. Add environment variables:
   - `MONGO_URI` (MongoDB Atlas)
   - `JWT_SECRET`
   - `ADMIN_EMAIL`
   - `ADMIN_PASSWORD`
4. Deploy!

### To Heroku

```bash
heroku login
heroku create your-app-name
git push heroku main
```

Add Config Vars in Heroku dashboard with same environment variables

## 📚 Documentation Files

- **SETUP_GUIDE.md** - Complete setup instructions
- **INTEGRATION_CHECKLIST.md** - Integration status & checklist
- **This file (README)** - Quick reference guide

## ✨ Key Features

✅ User Authentication (Login/Signup)
✅ JWT Token-based Security
✅ User Profiles & Editing
✅ Admin Dashboard
✅ Announcements Management
✅ User Management (Admin)
✅ MongoDB Database
✅ API Documentation
✅ Deployment Ready
✅ CORS Enabled

## 🎯 Next Steps

1. **Test**: Run api-test.html to verify all endpoints
2. **Login**: Test user login with admin account
3. **Explore**: Try all features (profile, announcements, admin)
4. **Customize**: Add your church details & branding
5. **Deploy**: Push to Vercel for production

## 💡 Pro Tips

- Use `api-test.html` regularly to debug issues
- Check browser console (F12) for detailed error messages
- Keep `.env` file secure and never commit to GitHub
- Update `JWT_SECRET` before deploying to production
- Enable HTTPS in production environment

## 📞 Common Commands

```bash
# Start development
npm run devStart

# Start production
npm start

# Check API health
curl http://localhost:3000/health

# Clear browser cache
localStorage.clear()

# View MongoDB
use sdaChurch
db.users.find()
db.announcements.find()
```

---

**Your frontend and backend are now fully integrated and ready to use!** 🎉

For detailed information, see:
- Setup: `SETUP_GUIDE.md`
- Checklist: `INTEGRATION_CHECKLIST.md`
- Test Page: `api-test.html`
