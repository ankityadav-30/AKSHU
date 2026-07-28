# AKSHU Technologies V2

AKSHU Technologies V2 is a modern, scalable software agency platform built with a monorepo architecture. It consists of a public website, an admin panel, and a backend API designed for long-term maintainability and growth.

---

## Features

- Responsive Public Website
- Secure Admin Panel
- Blog CMS
- Project Management
- Team Management
- Testimonials
- FAQ Management
- Contact & Quote Management
- REST API
- JWT Authentication
- MongoDB Database
- Role-Based Access Control
- Analytics Dashboard (Planned)

---

## Tech Stack

### Frontend
- React
- Vite
- React Router
- Axios

### Backend
- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT
- bcrypt

### Storage
- Cloudinary

### Deployment
- Vercel (Client)
- Vercel (Admin)
- Render / Railway (API)
- MongoDB Atlas

---

## Project Structure

```
akshu-technologies-v2/

apps/
├── client/
├── admin/
└── server/

packages/
├── ui/
├── utils/
└── config/

docs/
tests/
```

---

## Getting Started

Clone the repository

```bash
git clone <repository-url>
```

Install dependencies

```bash
npm install
```

Run development servers

```bash
npm run dev
```

---

## Development Workflow

1. Create a feature branch
2. Implement the feature
3. Test locally
4. Open a Pull Request
5. Review
6. Merge into `develop`
7. Release to `main`

---

## Branches

- main
- develop
- feature/*
- hotfix/*

---

## Folder Responsibilities

### apps/client
Public website

### apps/admin
Admin dashboard

### apps/server
Backend API

### packages/ui
Reusable UI components

### packages/utils
Shared utility functions

### packages/config
Shared configuration

---

## Environment Variables

The server uses environment variables.

Create a `.env` file inside `apps/server`.

Example:

```
PORT=
MONGODB_URI=
JWT_SECRET=
CLOUDINARY_CLOUD_NAME=
CLOUDINARY_API_KEY=
CLOUDINARY_API_SECRET=
EMAIL_USER=
EMAIL_PASS=
```

---

## License

This project is licensed under the MIT License.

---

## Author

AKSHU Technologies