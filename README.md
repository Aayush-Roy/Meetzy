


# 🟣 Meetzy

**Meetzy** is a full-stack MERN-based real-time video calling and chat application that enables seamless peer-to-peer video and audio communication with integrated text chat functionality. Built using **Socket.IO**, **WebRTC**, and **STUN servers**, it delivers low-latency communication with a modern responsive UI powered by **MUI** and **Tailwind CSS**.

## 🚀 Features

- 🔗 Peer-to-peer video calling using **WebRTC**
- 🔊 Real-time audio/video streaming with STUN server support
- 💬 Instant text chat using **Socket.IO**
- 📡 WebSocket-based real-time connection management
- 👤 Authentication & user management 
- 🧑‍💻 Responsive and mobile-friendly UI (MUI + Tailwind)
- 🌐 Deployed on [Render](https://meetzyfe.onrender.com)

## 📸 Demo

> Live: [https://meetzy-hzgc.onrender.com](https://meetzyfe.onrender.com)


<img src="https://drive.google.com/uc?export=view&id=1TDSNqcPHLpZejFho5WdXnVwLAvVvBTEw" alt="Project Screenshot" width="600"/>

---

## 🛠️ Tech Stack

### Frontend

- **React 19**
- **Vite** for fast dev/build
- **Tailwind CSS** & **Material UI (MUI)** for styling
- **Socket.IO Client**
- **React Router v7**

### Backend

- **Node.js** & **Express.js**
- **MongoDB** with **Mongoose**
- **Socket.IO Server**
- **WebRTC** with STUN server integration
- **dotenv**, **http-status**, **bcrypt** for Authentication and other utilities

---

## 📦 Installation

### 1. Clone the repository

```bash
git clone https://github.com/Aayush-Roy/Meetzy.git
cd Meetzy
````

### 2. Setup the backend

```bash
cd backend
npm install
npm run dev
```

Make sure to create a `.env` file with your environment variables (e.g., MongoDB URI, STUN/TURN server config).

### 3. Setup the frontend

```bash
cd frontend
npm install
npm run dev
```

The frontend runs on `http://localhost:5173` (or configured Vite port).

---

## 🌐 STUN / TURN Configuration

Meetzy uses free **STUN** servers to establish direct peer-to-peer connections. You can also integrate **TURN** servers for production use cases where NAT traversal is needed.

Example WebRTC config:

```js
const config = {
  iceServers: [
    { urls: "stun:stun.l.google.com:19302" },
    // TURN servers can be added here
  ],
};
```

---

## ✨ Future Enhancements

* [ ] Add TURN server support for restrictive networks
* [ ] Group video calls
* [ ] Authentication and private rooms
* [ ] File sharing
* [ ] Push notifications

---

## 🙋‍♂️ Author

**Aayush Roy**
Full Stack Developer | MERN | Open Source Contributor
[GitHub](https://github.com/Aayush-Roy) • [LinkedIn](https://www.linkedin.com/in/aayush-sharma-roy-30a354242)

---

## 📜 License

This project is open-source under the [MIT License](LICENSE).

---

## 🫱 Contribute

Pull requests and contributions are welcome! If you'd like to collaborate, feel free to fork and submit a PR or open an issue.

```bash
git checkout -b feature/YourFeature
git commit -m "Add your feature"
git push origin feature/YourFeature
```

---

## 🧠 Learnings

This project was a deep dive into:

* Real-time communication protocols
* Peer-to-peer architecture
* Frontend performance optimization with Vite
* Socket.IO event management
* Handling media streams and signaling

---

```

Let me know if you want:
- Hindi + English mixed version
- Light/dark theme screenshots or badges
- Contribution guideline file (`CONTRIBUTING.md`)
- Deployment section (e.g., Render + Vercel setup)

Once you push this to GitHub, your project will look a lot more polished and professional.
```
