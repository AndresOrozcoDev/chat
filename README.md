# Chat

<p align="center">
  <img src="https://img.shields.io/badge/React-19.1.0-20232a?logo=react&logoColor=%2361DAFB" />
  <img src="https://img.shields.io/badge/React_Router-7.6.3-CA4245?logo=react-router&logoColor=white" />
  <img src="https://img.shields.io/badge/Vite-7.0.3-646CFF?logo=vite&logoColor=white" />
  <img src="https://img.shields.io/badge/Tailwind_CSS-4.1.11-38B2AC?logo=tailwind-css&logoColor=white" />
  <img src="https://img.shields.io/badge/Lucide_React-0.525.0-000000?logo=react&logoColor=white" />
  <img src="https://img.shields.io/badge/TypeScript-5.8.3-007ACC?logo=typescript&logoColor=white" />
  <img src="https://img.shields.io/badge/ESLint-9.30.1-4B32C3?logo=eslint&logoColor=white" />
  <img src="https://img.shields.io/badge/Node.js-20.11.1-6DA55F?logo=node.js&logoColor=white" />
  <img src="https://img.shields.io/badge/Firebase-11.6.1-FFCA28?logo=firebase&logoColor=black" />
  <img src="https://img.shields.io/badge/Firebase_Auth-integrated-FFCA28?logo=firebase&logoColor=black" />
  <img src="https://img.shields.io/badge/Firestore-Realtime_DB-FFCA28?logo=firebase&logoColor=black" />
  <img src="https://img.shields.io/badge/Deployed%20on-Vercel-black?logo=vercel" />
  <img src="https://img.shields.io/badge/status-in%20development-yellow" />
  <img src="https://img.shields.io/badge/license-MIT-blue" />
</p>

A web application that simulates a chat built with React for managing users and their messages across different real-time chats.

---

## 🔗 Live Demo

You can see the chat running in production here:

👉 [Chat](chat-ochre-alpha-83.vercel.app)

Automatically deployed with [Vercel](https://vercel.com), using serverless functions for API endpoints.

---

## 🛠️ Requirements

- [Node](https://nodejs.org/)
- [Git](https://git-scm.com/)

---

## 💻 Local Setup

Clone the repository
```bash
    git clone https://github.com/AndresOrozcoDev/chat.git
    cd chat
```

Install dependencies
```bash
    npm install
```

Run the development server
```bash
    npm run dev
```

## 📁 Structure

```bash
├── index.html
├── package.json
├── .env
├── vercel.json
├── vitest.config.ts
├── public/
├── src/
│   ├── test/
│   │   ├── setup.ts
│   ├── assets/
│   │   ├── fonts/
│   │   ├── images/
│   │   └── icons/
│   ├── context/
│   │   ├── auth.context.ts
│   │   └── theme.context.ts
│   ├── shared/
│   │   ├── components/
│   │   └── pages/
│   ├── features/
│   │   ├── auth/
│   │   │   ├── components/
│   │   │   ├── pages/
│   │   │   ├── services/
│   │   │   ├── utils/
│   │   │   │  └── types.ts
│   │   ├── profile/
│   │   │   ├── components/
│   │   │   ├── pages/
│   │   │   └── services/
│   │   └── chat/
│   │       ├── components/
│   │       ├── pages/
│   │       ├── services/
│   │       ├── utils/
│   │       │  └── types.ts
│   ├── App.css
│   ├── App.tsx
│   ├── index.css
│   ├── firebase-config.ts.css
│   └── main.tsx
```

## Tests
Runs tests in watch mode with fast feedback (development mode).
```bash
    npm run test
```

Run tests with coverage
```bash
    npm run test:coverage
```

Run tests with UI
```bash
    npm run test:ui
```

## Maintenance Checklist
Review package vulnerabilities in production
```bash
    npm audit fix
```

## Deployments
Generate the production build
```bash
    npm run build
```

---

## 👨‍💻 Author

Developed with 💙 by [Andrés Orozco](https://github.com/AndresOrozcoDev)

- 📬 [andresorozcodev@gmail.com](mailto:andresorozcodev@gmail.com)
- 🌐 [LinkedIn](https://www.linkedin.com/in/andresorozcodev)

---
