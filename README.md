# Chat

Web application for real-time chat between authenticated users.

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
  [![Ask DeepWiki](https://deepwiki.com/badge.svg)](https://deepwiki.com/AndresOrozcoDev/chat)
</p>

---

## Deepwiki Documentation

You can see the DeepWiki oficial documentacion here:

[DeepWiki](https://deepwiki.com/AndresOrozcoDev/chat)

---

## Live Demo

You can see the chat app running in production here:

[Chat](https://chat-ochre-alpha-83.vercel.app)

---

## Features

- Sign up and sign in with Firebase Auth.
- User profile creation in Firestore on registration.
- User list to start conversations.
- Direct messages between users stored in Firestore.
- Profile updates (name and avatar).
- Password change.
- Light/dark theme.
- Toast notifications.

## Requirements

- Node.js 20+
- npm 10+
- Configured Firebase account/project

## Local Setup

1. Clone the repository

```bash
git clone https://github.com/AndresOrozcoDev/chat.git
cd chat
```

2. Install dependencies

```bash
npm install
```

3. Create a `.env` file with Firebase variables

```bash
VITE_FIREBASE_API_KEY=...
VITE_FIREBASE_AUTH_DOMAIN=...
VITE_FIREBASE_PROJECT_ID=...
VITE_FIREBASE_STORAGE_BUCKET=...
VITE_FIREBASE_MESSAGING_SENDER_ID=...
VITE_FIREBASE_APP_ID=...
VITE_FIREBASE_MEASUREMENT_ID=...
```

4. Start the development environment

```bash
npm run dev
```

## Scripts

- `npm run dev`: starts Vite in development mode.
- `npm run build`: compiles TypeScript and generates a production build.
- `npm run preview`: serves the build locally.
- `npm run lint`: runs ESLint.
- `npm run test`: runs Vitest in watch mode.
- `npm run test:coverage`: runs tests with coverage.

## App Routes

- `/`: login
- `/register`: registration
- `/dashboard`: main chat
- `/account`: account and profile settings

## Project Structure

```text
.
|- functions/
|  \- src/
|     \- index.ts
|- public/
|- src/
|  |- context/
|  |  |- auth.context.tsx
|  |  |- notify.context.tsx
|  |  \- theme.context.tsx
|  |- features/
|  |  |- auth/
|  |  |- chat/
|  |  \- profile/
|  |- shared/
|  |  |- components/
|  |  \- pages/
|  |- App.tsx
|  |- firebase-config.ts
|  \- main.tsx
|- vercel.json
\- package.json
```

---

## Data Model (Firestore)

Main collections:

- `users/{uid}`: basic public user data.
- `users/{uid}/chats/{otherUid}`: conversation reference with another user.
- `users/{uid}/chats/{otherUid}/messages/{messageId}`: chat messages.

Each message stores:
- `text`
- `senderId`
- `createdAt` (server timestamp)

## Deployment

The project is prepared for Vercel:
- `vercel.json` rewrites all routes to `index.html` to support SPA routing.

## Current Status

- Functional app for authentication, messaging, and profile management.
- Test coverage is focused on main routing (`src/App.test.tsx`).
- There is a Cloud Function scaffold in `functions/src/index.ts`, currently commented out.

## Tests

Run tests in watch mode with fast feedback (development mode):
```bash
npm run test
```

Run tests with coverage:
```bash
npm run test:coverage
```

Run tests with UI:
```bash
npm run test:ui
```

## Maintenance Checklist

Review production package vulnerabilities:
```bash
npm audit fix
```

## Builds

Generate a production build:
```bash
npm run build
```

---

## License

MIT (`LICENSE`).

## Author

Developed by [Andres Orozco](https://github.com/AndresOrozcoDev)

- [andresorozcodev@gmail.com](mailto:andresorozcodev@gmail.com)
- [LinkedIn](https://www.linkedin.com/in/andresorozcodev)

---
