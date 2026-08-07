# 🔥 Streakr

**Streakr** is a full-stack MERN productivity platform that transforms task management into a gamified experience. Users can create and organize tasks, maintain daily streaks, earn XP, compete with friends on leaderboards, and visualize their productivity through analytics.

🌐 **Live Demo:** https://streakr-frontend.onrender.com

---

## ✨ Features

### 🔐 Authentication
- User Registration & Login
- JWT Authentication
- Password hashing using bcrypt
- Protected Routes
- Persistent Login

### ✅ Task Management
- Create, edit and delete tasks
- Mark tasks as completed
- Pin important tasks
- Set priorities
- Due dates
- Recurring tasks

### 🔥 Gamification
- Daily streak tracking
- XP reward system
- Productivity-focused habit building

### 📊 Analytics
- Productivity dashboard
- Task completion statistics
- Priority distribution
- Interactive charts using Recharts

### 👥 Social Features
- Search users
- Send friend requests
- Accept/Reject requests
- Friends list
- Public profiles
- Leaderboard rankings

### 🔔 Notifications
- Notification summary
- Task reminders
- Friend request updates

---

# 🛠 Tech Stack

### Frontend
- React.js
- Vite
- Tailwind CSS
- React Router
- React Context API
- React Hot Toast
- Recharts

### Backend
- Node.js
- Express.js
- REST APIs
- JWT Authentication
- bcrypt

### Database
- MongoDB Atlas
- Mongoose

### Deployment
- Render
- GitHub

---

# 📂 Project Structure

```
streakr
│
├── client/
│   ├── src/
│   │   ├── components/
│   │   ├── context/
│   │   ├── pages/
│   │   ├── services/
│   │   └── styles/
│   └── package.json
│
├── backend/
│   ├── config/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── server.js
│   └── package.json
│
└── README.md
```

---

# 🚀 Installation

## Clone the repository

```bash
git clone https://github.com/vedashreeraut/streakr.git

cd streakr
```

---

## Backend Setup

```bash
cd backend

npm install
```

Create a `.env` file.

```env
PORT=3001

MONGO_URI=your_mongodb_connection_string

JWT_SECRET=your_secret_key
```

Start the backend

```bash
npm start
```

---

## Frontend Setup

```bash
cd client

npm install
```

Create a `.env` file.

```env
VITE_API_URL=http://localhost:3001
```

Run the frontend

```bash
npm run dev
```

---

# 🌍 Deployment

Frontend:
- Render Static Site

Backend:
- Render Web Service

Database:
- MongoDB Atlas

---

# 📸 Screenshots

> Add screenshots of:
- Login Page
- Dashboard
- Tasks
- Analytics
- Friends
- Leaderboard
- Notifications

---

# 🔮 Future Enhancements

- Email reminders
- Calendar integration
- Dark mode improvements
- Team workspaces
- AI-powered productivity insights
- Mobile application
- Push notifications

---

# 👩‍💻 Author

**Vedashree Raut**

GitHub:
https://github.com/vedashreeraut

LinkedIn:
(https://www.linkedin.com/in/vedashreeraut/)

---

# 📄 License

This project is licensed under the MIT License.