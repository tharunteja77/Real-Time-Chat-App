# Realtime Chat Application

A modern full-stack realtime chat application built using the MERN stack and WebSockets with a premium glassmorphism UI.

This project supports:
- realtime private messaging
- JWT authentication
- typing indicators
- online user tracking
- unread message notifications
- seen/delivered message status
- smart timestamps
- modern glass UI

---

# Preview

## Features Included

✅ User Authentication  
✅ JWT Protected Routes  
✅ Realtime Messaging  
✅ Online/Offline User Status  
✅ Typing Indicators  
✅ Auto Scroll Chat  
✅ Smart Timestamps  
✅ Date Separators  
✅ Unread Message Notifications  
✅ Delivered & Seen Status  
✅ Glassmorphism Modern UI  
✅ Responsive Chat Layout  
✅ Tailwind CSS Design  
✅ Socket.IO Realtime Events  

---

# Tech Stack

## Frontend
- React.js
- Vite
- Tailwind CSS
- Socket.IO Client
- Axios
- React Router DOM

## Backend
- Node.js
- Express.js
- Socket.IO
- MongoDB
- Mongoose
- JWT Authentication
- bcryptjs

## Database
- MongoDB Atlas

---

# Realtime Features

## Realtime Messaging
Messages are instantly synced between users using Socket.IO.

## Typing Indicators
Displays:
```text
typing...
```

when another user is typing.

## Online Users
Tracks active users in realtime.

## Unread Notifications
Displays unread message count beside chats.

## Seen / Delivered Status
Supports:
```text
✓ Sent
✓✓ Delivered
✓✓ Seen
```

## Smart Timestamps
Displays:
```text
Just now
2 min ago
45 min ago
09:32 PM
```

## Date Separators
Messages are grouped using:
```text
Today
Yesterday
Date
```

---

# UI Features

- Modern Glassmorphism Design
- Gradient Backgrounds
- Neon Effects
- Responsive Sidebar
- Animated Hover Effects
- Gradient Message Bubbles
- Dark Premium Theme

---

# Folder Structure

```bash
Realtime-Chat-App/
│
├── frontend/
│   ├── src/
│   │   ├── api/
│   │   ├── components/
│   │   ├── context/
│   │   ├── pages/
│   │   ├── socket/
│   │   ├── utils/
│   │   └── main.jsx
│
├── backend/
│   ├── config/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── socket/
│   └── server.js
```

---

# Installation

## Clone Repository

```bash
git clone <your-repo-url>
```

---

# Backend Setup

```bash
cd server
npm install
```

Create `.env`

```env
PORT=5000
MONGO_URI=your_mongodb_uri
JWT_SECRET=your_secret_key
```

Run backend:

```bash
npm run dev
```

---

# Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

---

# Environment Variables

## Backend `.env`

```env
PORT=5000
MONGO_URI=
JWT_SECRET=
```

---

# Authentication

Authentication is handled using JWT.

Protected APIs:
- `/api/users`
- `/api/messages`

---

# Socket Events

## Connection Events
- `connection`
- `disconnect`

## Messaging Events
- `send_message`
- `receive_message`

## Typing Events
- `typing`
- `stop_typing`

## Message Status Events
- `message_delivered`
- `messages_seen`

## User Presence Events
- `register_user`
- `get_online_users`

---

# Future Improvements

## Planned Features

- Group Chat
- Image/File Sharing
- Emoji Picker
- Voice Messages
- Video Calling
- Message Search
- Reactions
- Pinned Messages
- Edit/Delete Messages
- Theme Switching
- Push Notifications
- Mobile Responsive Improvements
- Redis Socket Scaling
- Docker Deployment
- Kubernetes Deployment
- Socket Authentication Middleware
- End-to-End Encryption

---

# Learning Outcomes

This project helped in understanding:

- Realtime System Architecture
- Socket.IO Event Flow
- MERN Stack Development
- JWT Authentication
- Protected APIs
- Realtime State Management
- Frontend UI Architecture
- Tailwind CSS Design Systems
- Message Lifecycle Management
- Scalable Chat Application Design

---

# Author

Developed by Tharun

---

# License

This project is licensed under the MIT License.
