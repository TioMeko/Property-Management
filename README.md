# Property Management SaaS

A web application for tenants and property managers to handle onboarding, rent visibility, maintenance requests, and lease management.


## Tech Stack

### Frontend
- React 18 (JavaScript)
- Chakra UI v2
- React Router v6
- React Hook Form
- Axios
- Vite

### Backend
- Express.js
- JWT authentication
- bcryptjs

## Project Structure

```
Property-Management/
├── frontend/          # React frontend (to be scaffolded)
├── server/            # Express backend
│   ├── src/
│   │   ├── config/    # Environment configuration
│   │   ├── middleware/ # Auth & error handling
│   │   ├── routes/     # API routes (auth, maintenance, payments, etc.)
|   |   |── controllers/ # API functions
│   │   └── index.js    # Server entry point
│   └── package.json
└── docs/
    └── property-mgmt-prd.md
```

## Getting Started

### Quick Start (Recommended)

Run both frontend and backend with a single command:

```bash
# Install dependencies for root, frontend, and server
npm run install:all

# Start both frontend and backend in development mode
npm start
```

The frontend will run on `http://localhost:5173` and the backend on `http://localhost:4000`.

### Environment Variables

1. Copy `.env.example` to `.env` in the root directory
2. Copy `server/.env.example` to `server/.env` 
3. Update the values in both `.env` files with your configuration

### Individual Setup (Alternative)

If you prefer to run services separately:

#### Backend Setup

```bash
cd server
npm install
npm run dev  # Development mode with nodemon
```

#### Frontend Setup

```bash
cd frontend
npm install
npm run dev  # Development server with Vite (typically runs on http://localhost:5173)
```

### Available Scripts

From the root directory:

- `npm start` - Run both frontend and backend in **development** mode
- `npm run start:prod` - Run both frontend and backend in **production** mode
- `npm run build` - Build the frontend for production
- `npm run server:dev` - Run only the backend in development mode
- `npm run frontend:dev` - Run only the frontend in development mode
- `npm run install:all` - Install dependencies for all projects

## API Endpoints

### Authentication
- `POST /auth/login` - User login
- `POST /auth/register` - User registration
- `POST /auth/forgot-password` - Password reset

### Onboarding
- `POST /onboarding` - Save onboarding step

### Tenant
- `GET /tenant/summary` - Dashboard summary
- `GET /maintenance` - Maintenance requests
- `GET /payments` - Payment history
- `GET /lease` - Lease details

### Admin
- `GET /admin/dashboard` - Admin overview
- `PATCH /maintenance/:id` - Update maintenance status

## Features (MVP)

1. **Authentication** - Email/password login, registration, forgot password
2. **Multi-step Onboarding** - Guided tenant onboarding flow
3. **Tenant Dashboard** - Rent status, maintenance requests, notices
4. **Maintenance Requests** - Submit and track maintenance tickets
5. **Payment History** - View payment records (no live gateway)
6. **Lease Viewer** - View lease summary and full terms
7. **Admin Dashboard** - Overview stats and maintenance management

## Development Milestones

See `docs/property-mgmt-prd.md` for detailed milestone breakdown:

- **Milestone 0** - Project scaffold & theme
- **Milestone 1** - Auth & session
- **Milestone 2** - Onboarding
- **Milestone 3** - Tenant dashboard
- **Milestone 4** - Maintenance
- **Milestone 5** - Payments & lease viewer
- **Milestone 6** - Admin overview

## Roles & Permissions

- **Tenant**: Read own records, submit maintenance, view payments/lease
- **Admin**: Read/write maintenance, read tenant summaries, update statuses

## Documentation

Full product requirements and technical specifications: [`docs/property-mgmt-prd.md`](docs/property-mgmt-prd.md)
