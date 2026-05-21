# TeamTask — Full Stack Team Collaboration Platform

TeamTask is a full-stack project management and collaboration platform developed using the MERN stack.  
The application is designed to streamline team workflows by providing centralized project management, task tracking, and productivity monitoring within a modern web interface.

---

# Overview

The platform enables users to manage projects, assign tasks, monitor task progress, and analyze workflow productivity through an integrated dashboard system.

The application follows a scalable client-server architecture with secure authentication and RESTful API communication.

---

# Core Features

## Authentication & Authorization
- JWT-based authentication
- Protected routes and secure API access
- Password encryption and validation
- Role-based access management

## Project Management
- Create and manage projects
- Team member collaboration
- Centralized workspace management

## Task Management
- Create, update, and delete tasks
- Task status workflow management
- Priority-based organization
- Due date tracking

## Dashboard Analytics
- Task distribution analytics
- Completed and pending task tracking
- Overdue task monitoring
- Productivity overview metrics

## User Interface
- Responsive dashboard design
- Modern dark-themed interface
- Interactive navigation layout
- Dynamic frontend rendering

---

# Technology Stack

## Frontend
- React.js
- Vite
- Tailwind CSS
- Axios
- React Router DOM

## Backend
- Node.js
- Express.js
- MongoDB Atlas
- Mongoose
- JSON Web Token (JWT)

---

# System Architecture

```bash
team-task-manager/
│
├── client/          # Frontend Application
│
├── server/          # Backend API & Database Logic
│
└── README.md
```

---

# Environment Configuration

Create a `.env` file inside the `server` directory.

```env
PORT=5000
MONGO_URI=YOUR_MONGODB_URI
JWT_SECRET=YOUR_SECRET_KEY
```

---

# Application Modules

## Landing Page
Provides an overview of the platform and navigation to authentication modules.

## Dashboard
Displays productivity metrics, task analytics, and workflow summaries.

## Projects Module
Handles project creation and collaborative project management.

## Tasks Module
Supports task creation, status updates, priority handling, and workflow tracking.

---

# Technical Highlights

- Full MERN stack implementation
- RESTful API architecture
- Secure authentication workflow
- MongoDB Atlas cloud database integration
- Responsive frontend architecture
- Modular backend structure
- Dynamic dashboard analytics

---

# Author

Manoj D S

GitHub:  
https://github.com/Manoj16ds
