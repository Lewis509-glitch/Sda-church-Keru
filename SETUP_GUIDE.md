# SDA Church Keru - Setup & Development Guide

## Prerequisites

- Node.js (v14 or higher)
- MongoDB (local or MongoDB Atlas account)
- npm or yarn

## Installation & Setup

### 1. Install Dependencies

```bash
npm install
```

### 2. Configure MongoDB

**Option A: Local MongoDB**
- Install MongoDB locally
- Ensure MongoDB service is running
- Update `.env`: `MONGO_URI=mongodb://127.0.0.1:27017/sdaChurch`

**Option B: MongoDB Atlas (Cloud)**
- Create an account at https://www.mongodb.com/cloud/atlas
- Create a cluster and database user
- Get connection string and update `.env`:
  ```
  MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/sdaChurch
  ```

### 3. Environment Variables

Create/update `.env` file with:

```env
MONGO_URI=mongodb://127.0.0.1:27017/sdaChurch
JWT_SECRET=supersecretkey123
ADMIN_EMAIL=admin@keru-sda.local
ADMIN_PASSWORD=Admin123!
PORT=3000
HOST=0.0.0.0
FRONTEND_URL=http://localhost:3000
```

## Running the Application

### Development Mode (with auto-reload)

```bash
npm run devStart
```

The server will start at `http://localhost:3000`

### Production Mode

```bash
npm start
```

## Testing the Backend

Use REST Client (VS Code extension) or Postman:

### Login
```
POST http://localhost:3000/api/auth/login
Content-Type: application/json

{
  "name": "Administrator",
  "password": "Admin123!"
}
```

### Get Profile
```
GET http://localhost:3000/api/profile
Authorization: Bearer <token-from-login>
```

### Get Announcements
```
GET http://localhost:3000/api/announcements
```

## API Endpoints

### Authentication
- `POST /api/auth/login` - Login user
- `POST /api/auth/signup` - Register new user

### Profile
- `GET /api/profile` - Get current user profile (protected)
- `PUT /api/profile` - Update current user profile (protected)

### Announcements
- `GET /api/announcements` - Get all announcements
- `POST /api/announcements` - Create announcement (admin only)
- `PUT /api/announcements/:id` - Update announcement (admin only)
- `DELETE /api/announcements/:id` - Delete announcement (admin only)

### Users
- `GET /api/users` - Get all users (admin only)
- `POST /api/users` - Create user (admin only)
- `DELETE /api/users/:id` - Delete user (admin only)

## Frontend Configuration

The frontend automatically configures the API base URL:
- **Development**: Uses `http://localhost:3000`
- **Production**: Uses the current origin

Frontend files use the `/api/` endpoints directly since the backend serves static files.

## Troubleshooting

### MongoDB Connection Error
- Ensure MongoDB is running
- Check `MONGO_URI` in `.env` file
- Verify database credentials

### Port Already in Use
```bash
# Windows
netstat -ano | findstr :3000
taskkill /PID <PID> /F

# macOS/Linux
lsof -i :3000
kill -9 <PID>
```

### Token Errors
- Clear browser localStorage: `localStorage.clear()`
- Log in again to get a new token

### CORS Errors
- Check that backend CORS headers are set correctly
- Verify `FRONTEND_URL` in `.env`

## Deployment

### Vercel (Recommended)

1. Push code to GitHub
2. Import project in Vercel
3. Add environment variables in Vercel dashboard:
   - `MONGO_URI`
   - `JWT_SECRET`
   - `ADMIN_EMAIL`
   - `ADMIN_PASSWORD`
4. Deploy!

The `vercel.json` is already configured for serverless deployment.

## Project Structure

```
.
├── src/
│   ├── app.js              # Express app setup
│   ├── index.js            # Server entry point
│   ├── db.js               # MongoDB connection
│   ├── middleware/
│   │   └── auth.js         # JWT authentication
│   ├── models/
│   │   ├── User.js         # User schema
│   │   └── Announcement.js # Announcement schema
│   └── routes/
│       ├── auth.js         # Auth endpoints
│       ├── profile.js      # Profile endpoints
│       ├── announcements.js # Announcement endpoints
│       └── users.js        # User management endpoints
├── api/
│   └── [...]slug.js        # Vercel serverless handler
├── api-config.js           # Frontend API configuration
├── *.html                  # Frontend pages
├── *.js                    # Frontend scripts
├── *.css                   # Styling
├── .env                    # Environment variables
├── package.json            # Dependencies
└── vercel.json            # Vercel deployment config
```
