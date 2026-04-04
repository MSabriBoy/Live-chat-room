# 🚀 Live Chat Room — Real-Time Fullstack Application

A production-style **real-time chat application** built using modern web technologies.
This project demonstrates **WebSocket-based communication**, **room isolation**, and **clean UI architecture** similar to platforms like Discord and WhatsApp.

## 🌐 Live Demo

🔗 **Frontend (Vercel):** [UI Live On](https://live-chat-room-pi.vercel.app)
🔗 **Backend (Render):** [Backend Live On](https://live-chat-room-w0fd.onrender.com)


## 🧠 Key Concepts Implemented

* Real-time bidirectional communication using WebSockets
* Event-driven architecture (Socket.io)
* Room-based message isolation
* Client-server synchronization
* State management in React
* Component-based UI structure

## ✨ Features

### 🔹 Core Functionality

* 💬 Real-time chat (instant message delivery)
* 👤 Username-based identity system
* 🏠 Room selection (General / Tech)
* 🔄 Message broadcasting within rooms only

### 🔹 UX Enhancements

* ⌨️ Typing indicator (live feedback)
* 📅 Smart timestamps (time + date grouping)
* 📜 Auto-scroll to latest messages
* 🎯 Enter key to send messages
* 🎨 Clean chat bubble UI (left/right alignment)

### 🔹 System Design

* ⚡ WebSocket connection handling
* 🔁 Event-based message flow
* 🧩 Modular frontend architecture
* 🌐 CORS handling for cross-origin communication

## 🛠️ Tech Stack

### Frontend

* ⚛️ React (Vite)
* 🎨 Tailwind CSS
* 🔌 Socket.io Client

### Backend

* 🟢 Node.js
* 🚀 Express.js
* 🔌 Socket.io


## 📁 Project Structure (Monorepo)

```
live-chat-room/
│
├── client/                 # Frontend (Vite + React)
│   ├── src/
│   │   ├── pages/
│   │   │   └── ChatPage.jsx
│   │   ├── socket/
│   │   │   └── socket.js
│   │   ├── App.jsx
│   │   └── main.jsx
│   │
│   ├── public/
│   ├── index.html
│   ├── package.json
│   └── vite.config.js
│
├── server/                 # Backend (Node + Socket.io)
│   ├── server.js
│   ├── package.json
│   └── node_modules/
│
├── package.json            # Root (concurrently setup)
└── README.md
```

## ⚙️ Installation & Setup

### 1️⃣ Clone Repository

```bash
git clone https://github.com/MSabriBoy/Live-chat-room.git
cd live-chat-room
```

### 2️⃣ Install Dependencies

```bash
cd client
npm install

cd ../server
npm install
```

### 3️⃣ Run Development Server (Monorepo)

```bash
npm run dev
```

This will start:

* Frontend → http://localhost:5173
* Backend → http://localhost:5000

## 🔌 How It Works (Architecture)

```
Client (React)
   ↓
Socket.io Client
   ↓
WebSocket Connection
   ↓
Node.js Server (Socket.io)
   ↓
Broadcast / Room-based Emission
```

### Flow:

1. User joins a room
2. Socket connection established
3. Message emitted from client
4. Server receives & broadcasts to room
5. UI updates instantly

## 🚀 Deployment

### Frontend (Vercel)

* Root Directory: `client`
* Build Command: `npm run build`
* Output: `dist`

### Backend (Render)

* Root Directory: `server`
* Start Command: `node server.js`

## ⚠️ Important Notes

* ⏳ Render free tier may sleep (cold start delay ~5–10 sec)
* 🌐 CORS configured for cross-origin requests
* 🔌 WebSockets used instead of HTTP polling

## 🎥 Demo Instructions

Your demo should include:

* Two browser windows side-by-side
* Real-time messaging between users
* Room isolation (General vs Tech)
* Typing indicator

## 📌 Future Improvements

* 🔐 Authentication (JWT / OAuth)
* 💾 Persistent chat storage (MongoDB)
* 🟢 Online users tracking
* 🌙 Dark mode UI
* 🔔 Sound & push notifications
* 📱 Mobile optimization
