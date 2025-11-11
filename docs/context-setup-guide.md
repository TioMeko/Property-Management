# Context Provider Setup Guide

## Quick Start

The React Context API has been successfully implemented! Follow these steps to get started.

## Prerequisites

- Node.js and npm installed
- Backend API running (or mock data for testing)

## Environment Setup

1. **Create Environment File**

In the `frontend` directory, create a `.env` file:

```bash
cd frontend
touch .env
```

2. **Add Environment Variables**

Add the following to your `.env` file:

```env
VITE_API_URL=http://localhost:5000/api
```

Change the URL to match your backend API endpoint.

## Backend API Requirements

Your backend API should implement these endpoints:

### Authentication
- `POST /api/auth/login` - User login
- `POST /api/auth/signup` - User registration
- `POST /api/auth/logout` - User logout
- `GET /api/auth/verify-token` - Verify JWT token

### Dashboard Data
- `GET /api/tenant/dashboard` - Tenant dashboard data
- `GET /api/landlord/dashboard` - Landlord dashboard data

### Expected Response Formats

**Login/Signup Response:**
```json
{
  "token": "jwt_token_here",
  "user": {
    "id": "user_id",
    "name": "John Doe",
    "email": "john@example.com",
    "role": "tenant" // or "landlord"
  }
}
```

**Verify Token Response:**
```json
{
  "user": {
    "id": "user_id",
    "name": "John Doe",
    "email": "john@example.com",
    "role": "tenant"
  }
}
```

**Dashboard Response:**
See `docs/frontend-data-schema.md` for complete schema.

## Testing Without Backend

If you don't have a backend yet, you can:

1. **Use Mock Data**
   - Check `docs/mock-dashboard-data.md` for reference data
   - Temporarily modify dashboard pages to use mock data

2. **Mock API Service**
   - Create a `frontend/src/services/mockApi.js`
   - Return promise-wrapped mock data
   - Swap imports in context provider

## Running the Application

```bash
# Install dependencies (if not already done)
cd frontend
npm install

# Start development server
npm run dev
```

## Testing the Context Provider

### Test Authentication Flow

1. Open the application
2. Click "Login" or "Sign Up"
3. Enter credentials
4. Verify:
   - ✓ Token stored in localStorage
   - ✓ User data appears in UserMenu
   - ✓ Redirected to appropriate dashboard
   - ✓ Dashboard displays loading state
   - ✓ Dashboard shows data or error

### Test Logout Flow

1. Click on user avatar/name
2. Click "Logout"
3. Verify:
   - ✓ Token removed from localStorage
   - ✓ Redirected to landing page
   - ✓ Success toast appears

### Test Protected Routes

1. Try accessing `/tenant/dashboard` or `/landlord/dashboard` without login
2. Verify:
   - ✓ Should remain accessible but show loading/no data state
   - ✓ Error handling works if not authenticated

## Common Issues

### Issue: API calls return 404
**Solution:** Check that `VITE_API_URL` in `.env` is correct and backend is running.

### Issue: CORS errors
**Solution:** Configure CORS on your backend to allow requests from `http://localhost:5173` (or your frontend URL).

Example Express.js CORS setup:
```javascript
const cors = require('cors');
app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true
}));
```

### Issue: Token not persisting
**Solution:** Check browser console for localStorage errors. Ensure you're not in incognito mode.

### Issue: Dashboard shows "No data available"
**Solution:** 
- Check network tab for API errors
- Verify backend response matches expected schema
- Check console for any JavaScript errors

## Integration Checklist

- [ ] Backend API endpoints implemented
- [ ] JWT authentication working
- [ ] CORS configured
- [ ] Environment variables set
- [ ] Test login flow
- [ ] Test logout flow
- [ ] Test dashboard data loading
- [ ] Test error handling
- [ ] Test token persistence

## Useful Commands

```bash
# Check localStorage (in browser console)
localStorage.getItem('authToken')

# Clear localStorage (in browser console)
localStorage.clear()

# Check environment variables (in terminal)
echo $VITE_API_URL

# View network requests (in browser DevTools)
# Network tab -> Filter by XHR/Fetch
```

## Context Provider Usage

### In any component:

```jsx
import { useApp } from '../context/AppContext';

const MyComponent = () => {
  const { 
    user, 
    isAuthenticated, 
    loading, 
    error,
    login,
    logout,
    fetchDashboardData 
  } = useApp();

  // Use the context values and functions
  return (
    <div>
      {isAuthenticated ? (
        <p>Welcome, {user.name}!</p>
      ) : (
        <button onClick={() => login({ email, password })}>
          Login
        </button>
      )}
    </div>
  );
};
```

## Available Context Values

| Value | Type | Description |
|-------|------|-------------|
| `user` | Object \| null | Current user data |
| `isAuthenticated` | Boolean | Authentication status |
| `loading` | Boolean | Loading state |
| `error` | String \| null | Error message |
| `dashboardData` | Object \| null | Dashboard data |
| `login(credentials)` | Function | Login user |
| `signup(userData)` | Function | Register user |
| `logout()` | Function | Logout user |
| `fetchDashboardData()` | Function | Fetch dashboard data |
| `updateUserProfile(data)` | Function | Update user profile |
| `clearError()` | Function | Clear error state |

## Directory Structure

```
frontend/
├── src/
│   ├── context/
│   │   └── AppContext.jsx          # Main context provider
│   ├── services/
│   │   └── api.js                  # API service layer
│   ├── pages/
│   │   ├── TenantDashboard.jsx     # Uses context
│   │   └── LandlordDashboard.jsx   # Uses context
│   ├── components/
│   │   ├── AuthModal.jsx           # Login/Signup
│   │   └── layout/
│   │       ├── UserMenu.jsx        # User dropdown
│   │       ├── DashboardHeader.jsx
│   │       └── Sidebar.jsx
│   └── main.jsx                    # AppProvider wrapper
└── .env                            # Environment variables
```

## Next Steps

1. ✅ Context provider implemented
2. ⏳ Implement backend API endpoints
3. ⏳ Test authentication flow
4. ⏳ Add protected route wrapper
5. ⏳ Implement additional features (password reset, etc.)

## Need Help?

- Check the browser console for errors
- Review `docs/context-provider-implementation.md` for detailed architecture
- Review `docs/frontend-data-schema.md` for API response formats
- Check network tab to see actual API requests/responses

## Resources

- [React Context API Documentation](https://react.dev/reference/react/useContext)
- [Axios Documentation](https://axios-http.com/docs/intro)
- [Vite Environment Variables](https://vitejs.dev/guide/env-and-mode.html)

