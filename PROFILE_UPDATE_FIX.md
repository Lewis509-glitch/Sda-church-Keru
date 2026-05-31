# Profile Update Fix - Troubleshooting Guide

## 🐛 Issues Fixed

### 1. Backend Email Uniqueness Check
**Problem**: The email uniqueness check was not excluding the current user, causing updates to fail if user kept the same email.

**Fix**: Updated the query to exclude the current user's ID:
```javascript
// Before
const existingEmail = await User.findOne({ email: normalizedEmail });

// After
const existingUser = await User.findOne({ 
  email: normalizedEmail,
  _id: { $ne: req.user._id }  // Exclude current user
});
```

### 2. Email Normalization
**Problem**: Email comparison might fail due to inconsistent casing.

**Fix**: Consistently normalize both the incoming email and current email to lowercase:
```javascript
const normalizedEmail = email.toLowerCase().trim();
const currentEmail = req.user.email.toLowerCase().trim();
```

### 3. Phone Field Default
**Problem**: Phone field was not set to empty string consistently.

**Fix**: Ensure phone is always set to empty string if not provided:
```javascript
// Before
req.user.phone = phone?.trim() || req.user.phone;

// After
req.user.phone = phone?.trim() || '';
```

### 4. Frontend Error Handling
**Problem**: Errors were not being properly logged or displayed to users.

**Fix**: Added detailed error logging and validation:
```javascript
// Check response data exists
if (data.user) {
  localStorage.setItem('userName', data.user.name);
  localStorage.setItem('userEmail', data.user.email);
  localStorage.setItem('userPhone', data.user.phone || '');
}

// Log errors for debugging
console.error('Profile update error:', data);
```

## ✅ How to Test Profile Updates

### Method 1: Use the Profile Update Test Page (Recommended)

1. **Login first**:
   - Go to http://localhost:3000/login.html
   - Use admin account: admin@keru-sda.local / Admin123!

2. **Open test page**:
   - Visit http://localhost:3000/profile-update-test.html

3. **Run tests in order**:
   - Click "Check Auth Token"
   - Click "Load Profile"
   - Modify form fields (name, email, phone)
   - Click "Update Profile"
   - Click "Verify Changes"

### Method 2: Use the Dashboard Directly

1. **Login**: http://localhost:3000/login.html
2. **Go to dashboard**: http://localhost:3000/dashboard.html
3. **Click "Edit Profile"**
4. **Modify fields and click "Save Changes"**
5. **Check browser console for any errors** (Press F12)

### Method 3: Use REST Client

In VS Code, open `request.rest` and test:

```
### Get Current Profile
GET http://localhost:3000/api/profile
Authorization: Bearer YOUR_TOKEN_HERE

### Update Profile
PUT http://localhost:3000/api/profile
Content-Type: application/json
Authorization: Bearer YOUR_TOKEN_HERE

{
  "name": "New Name",
  "email": "newemail@example.com",
  "phone": "0712345678"
}
```

## 🔍 Debugging Tips

### Check Browser Console
Press **F12** to open developer tools and check console for errors.

### Enable Detailed Logging
Add this to dashboard.js temporarily:
```javascript
// In saveProfile function
console.log('Sending:', { name, email, phone });
console.log('Response status:', response.status);
console.log('Response data:', data);
```

### Check MongoDB Directly
```bash
# Connect to MongoDB
mongo

# Check database
use sdaChurch

# View user data
db.users.find().pretty()

# Check specific user
db.users.findOne({ email: "admin@keru-sda.local" })
```

### Clear Browser Data
If testing multiple times, clear localStorage:
```javascript
// In browser console
localStorage.clear()
// Then reload page
location.reload()
```

## 📝 Checklist for Profile Update

- [x] Backend profile route fixed
- [x] Email uniqueness check excludes current user
- [x] Email normalization is consistent
- [x] Phone field defaults to empty string
- [x] Frontend error handling improved
- [x] Error messages logged to console
- [x] Test page created for debugging
- [x] Server auto-restarts with nodemon

## 🚀 Expected Behavior

After fixes:

1. **User can update profile with same email** ✅
2. **User can change email to new email** ✅
3. **System prevents duplicate emails** ✅
4. **Phone field is optional** ✅
5. **Updates save to MongoDB** ✅
6. **localStorage is updated** ✅
7. **Dashboard shows new values** ✅
8. **Error messages are clear and helpful** ✅

## 🎯 If Updates Still Fail

### Check 1: Is the Server Running?
```bash
# Test health check
curl http://localhost:3000/health

# Should return: {"status":"ok"}
```

### Check 2: Is MongoDB Running?
```bash
# Try connecting
mongo

# If it fails, start MongoDB service
```

### Check 3: Is Auth Token Valid?
```javascript
// In browser console
localStorage.getItem('authToken')
// Should return a long JWT token (starts with 'eyJ...')
```

### Check 4: Does User Exist in Database?
```bash
# In MongoDB
db.users.find({ email: "admin@keru-sda.local" })
```

### Check 5: Check Server Logs
Look at terminal output for error messages when attempting to update profile.

## 📞 Common Error Messages

**"Name and email are required"**
- Check form fields are filled in
- Check for leading/trailing spaces

**"Email is already in use"**
- Try different email
- Check if another user has that email

**"Unable to update profile"**
- Check server is running
- Check MongoDB is running
- Check auth token is valid (F12 console)

**"401 Authentication failed"**
- Token expired or invalid
- Log in again
- Clear localStorage and refresh

## 🔧 Files Modified

- `src/routes/profile.js` - Fixed email check logic
- `dashboard.js` - Improved error handling
- `profile-update-test.html` - New test page
- `.env` - Configuration with docs

## ✨ Server Auto-Restart

Thanks to **nodemon**, the server automatically restarts when you save file changes. Look for:
```
[nodemon] restarting due to changes...
[nodemon] starting `node src/index.js`
Server is running on http://0.0.0.0:3000
```

This means your changes are active!
