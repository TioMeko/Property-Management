# Property Management - Setup Guide

## 📋 Overview

This project has been configured to run both the **frontend** (React + Vite) and **backend** (Express.js) with a single command. The setup handles environment variables (`NODE_ENV`) for both development and production modes.

## 🚀 Quick Start

### 1. Install All Dependencies

```bash
npm run install:all
```

This will install dependencies for:
- Root project (concurrently, cross-env)
- Frontend (React, Vite, Chakra UI, etc.)
- Server (Express, JWT, bcryptjs, etc.)

### 2. Configure Environment Variables

Create environment files:

```bash
# Root level .env (optional)
cp .env.example .env

# Server .env (required)
cd server
cp .env.example .env
```

Edit `server/.env` and set your values:
```env
PORT=4000
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
```

### 3. Start Development

Run both services with one command:

```bash
npm start
```

This will:
- ✅ Set `NODE_ENV=development`
- ✅ Start backend on `http://localhost:4000`
- ✅ Start frontend on `http://localhost:5173`
- ✅ Display color-coded logs (blue for server, magenta for frontend)

## 📜 Available Scripts

### Main Commands

| Command | Description |
|---------|-------------|
| `npm start` | Run both frontend & backend in **development** mode |
| `npm run start:prod` | Run both frontend & backend in **production** mode |
| `npm run build` | Build frontend for production |
| `npm run install:all` | Install dependencies for all projects |

### Individual Service Commands

| Command | Description |
|---------|-------------|
| `npm run server:dev` | Run only backend (development) |
| `npm run server:prod` | Run only backend (production) |
| `npm run frontend:dev` | Run only frontend (development) |
| `npm run frontend:prod` | Run only frontend (production/preview) |

## 🏗️ Project Structure

```
Property-Management/
├── package.json           # Root config with concurrent scripts
├── .env.example          # Environment variable template
├── .gitignore            # Git ignore rules
│
├── frontend/             # React + Vite application
│   ├── package.json
│   ├── vite.config.js
│   └── src/
│
├── server/               # Express.js API server
│   ├── package.json
│   ├── .env             # Server environment variables (create from .env.example)
│   └── src/
│       ├── index.js     # Server entry point
│       ├── config/      # Environment configuration
│       ├── middleware/  # Auth & error handling
│       └── routes/      # API routes
│
└── docs/                 # Documentation
```

## 🔧 How It Works

### Concurrently
The root `package.json` uses [concurrently](https://www.npmjs.com/package/concurrently) to run multiple npm scripts simultaneously. This allows both the frontend and backend to run in parallel with:
- Named prefixes (SERVER, FRONTEND)
- Color-coded output for easy debugging
- Automatic process management

### Cross-env
[cross-env](https://www.npmjs.com/package/cross-env) ensures environment variables work across all platforms (Windows, macOS, Linux). It handles the `NODE_ENV` variable setting in a platform-agnostic way.

### Environment Variables
- `NODE_ENV=development`: Enables hot-reloading, detailed error messages, and development features
- `NODE_ENV=production`: Optimizes for performance, minification, and security

## 🌐 Default Ports

- **Frontend**: http://localhost:5173 (Vite dev server)
- **Backend**: http://localhost:4000 (Express API)

You can change the backend port in `server/.env`:
```env
PORT=4000  # Change to any available port
```

## 🐛 Troubleshooting

### Port Already in Use
If you get a port conflict error:
1. Check what's using the port: `netstat -ano | findstr :4000` (Windows) or `lsof -i :4000` (macOS/Linux)
2. Kill the process or change the port in `server/.env`

### Dependencies Not Installed
If you see module errors, run:
```bash
npm run install:all
```

### Environment Variables Not Working
Make sure you've created `.env` files from the `.env.example` templates:
```bash
# In server directory
cp .env.example .env
```

### Hot Reload Not Working
- Frontend: Vite's HMR is enabled by default
- Backend: Uses nodemon for automatic restarts on file changes

## 📝 Notes

- `.env` files are ignored by git (see `.gitignore`)
- Never commit sensitive data like JWT secrets
- The frontend uses ES6 modules and arrow functions (as per coding standards)
- Both frontend and server use `"type": "module"` for ES module support

## 🎯 Next Steps

1. Set up your database (if needed)
2. Configure API endpoints in the frontend
3. Add authentication flow
4. Implement feature endpoints
5. Run tests (when available)

---

For more information, see the main [README.md](README.md) and [PRD](docs/property-mgmt-prd.md).

