# Task Tracker

A full-stack task management application built with React, Redux, Node.js,
Express, and MongoDB.

## Live Demo

- **Frontend:** https://task-tracker-roan-nu.vercel.app
- **Backend:** https://task-tracker-gu0s.onrender.com

## Features

- User registration and authentication
- Create, read, update, and delete tasks
- Assign tasks to users via email
- Filter tasks by assignee or status
- Update task status (To Do, In Progress, Done)

## Tech Stack

**Frontend:**

- React 18
- Redux Toolkit
- React Router
- Axios
- Tailwind CSS
- Vite

**Backend:**

- Node.js
- Express.js
- MongoDB with Mongoose
- JWT Authentication
- bcrypt.js

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- MongoDB (local or Atlas connection string)

### Installation

1. **Clone the repository**

```bash
git clone <repository-url>
cd task-tracker
```

2. **Setup Backend**

```bash
cd server
npm install
```

Create a `.env` file in the `server` directory:

```env
PORT=5001
MONGODB_URI=your_mongodb_connection_string
CORS_ORIGINS=http://localhost:5173,http://localhost:5174
```

Start the server:

```bash
node src/index.js
```

3. **Setup Frontend**

```bash
cd client
npm install
```

Create a `.env` file in the `client` directory:

```env
VITE_API_URL=http://localhost:5001
```

Start the development server:

```bash
npm run dev
```

4. **Open the app**

Navigate to `http://localhost:5173` in your browser.

## API Endpoints

### Auth

| Method | Endpoint             | Description         |
| ------ | -------------------- | ------------------- |
| POST   | `/api/auth/register` | Register a new user |
| POST   | `/api/auth/login`    | Login user          |
| GET    | `/api/auth/users`    | Get all users       |

### Tasks

| Method | Endpoint         | Description       |
| ------ | ---------------- | ----------------- |
| GET    | `/api/tasks`     | Get all tasks     |
| POST   | `/api/tasks`     | Create a new task |
| GET    | `/api/tasks/:id` | Get a single task |
| PATCH  | `/api/tasks/:id` | Update a task     |
| DELETE | `/api/tasks/:id` | Delete a task     |

## Project Structure

```
task-tracker/
├── client/                 # React frontend
│   ├── src/
│   │   ├── components/     # Reusable components
│   │   ├── pages/          # Page components
│   │   ├── redux/          # Redux slices and store
│   │   └── main.jsx        # Entry point
│   └── package.json
├── server/                 # Express backend
│   ├── src/
│   │   ├── config/         # Database configuration
│   │   ├── controllers/    # Route controllers
│   │   ├── models/         # Mongoose models
│   │   ├── routes/         # API routes
│   │   └── index.js        # Entry point
│   └── package.json
└── README.md
```

## License

MIT
