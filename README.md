# AutoServe - Vehicle Service Booking System

A full-stack web application for booking vehicle service appointments.

**Developer:** Sandali Kodithuwakku

## Tech Stack

**Frontend:** React, Vite, Tailwind CSS, React Router  
**Backend:** Node.js, Express, MongoDB, JWT

## Installation

```bash
# Install backend dependencies
cd backend
npm install

# Install frontend dependencies
cd ../frontend
npm install
```

## Environment Setup

Create `.env` in backend folder:
```env
PORT=5000
MONGO_URI=mongodb+srv://autoserve:lOC6WNrbmaw7xoBA@autoserve.iunk1ef.mongodb.net/autoserve?retryWrites=true&w=majority&appName=AutoServe
JWT_SECRET=your_super_secret_key_here_change_this_in_production
# Frontend URL
FRONTEND_URL=http://localhost:5173

# Email Configuration
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=testautoserve@gmail.com
EMAIL_PASS=qpiucermgmwprwlm
```

Create `.env` in frontend folder:
```env
# Cloudinary Configuration
VITE_CLOUDINARY_CLOUD_NAME=ds8hmsirb

# API Configuration
VITE_API_URL=http://localhost:5000/api
```

## Running the App

```bash
# Start backend (from backend folder)
npm run dev

# Start frontend (from frontend folder)
npm run dev
```

Frontend: http://localhost:5173  
Backend: http://localhost:5000

## Links

**Figma:** https://www.figma.com/design/gEIC5NIltHGKsPdJum2kjU/AutoServe---Vehicle-Service-Booking-System?node-id=0-1&t=qD8RBW60MnebKROn-1

**Frontend Repo:** https://github.com/SandaliKodithuwakku/autoserve-frontend.git  
**Backend Repo:** https://github.com/SandaliKodithuwakku/autoserve-backend.git
