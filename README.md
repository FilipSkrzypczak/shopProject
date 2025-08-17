
# 🛒 XYZ Store — Fullstack E-Commerce Platform

A modern fullstack e-commerce application with separate **frontend (client)**, **backend (server)** and an optional **admin dashboard**.  
Frontend is built with React + Redux; backend is Node.js + Express; data is stored in MongoDB (Mongoose).

---

## 🚀 Features

- JWT authentication (bcrypt password hashing)  
- Admin functions (manage users, products, orders)  
- Product listing, categories and product details  
- Shopping cart and order flow (orders collection)  
- Responsive UI (Styled Components)  
- REST API (Express) + MongoDB (Mongoose)

---

## 🛠 Tech stack

- **Backend:** Node.js, Express, Mongoose (MongoDB)  
- **Frontend (client):** React, Redux, react-router, styled-components  
- **Admin (optional):** React, Redux (separate app)  
- **Auth:** JWT (jsonwebtoken), bcryptjs  
- **Dev tools:** nodemon, concurrently, redux-devtools-extension, http-proxy-middleware

---

## 📂 Project structure

.
├── server/             # Express API (server)
│   ├── Models/          # Mongoose models (User, Product, Category, Order)
│   ├── Routes/          # Express routes (users, products, categories, orders, auth)
│   ├── Controllers/     # (optional) controllers / request handlers
│   ├── Middleware/      # auth & error handlers
│   ├── data/            # (optional) seed JSON files
│   ├── app.js           # Backend entry point
│   ├── seeder.js        # (optional) data import script
│   ├── package.json
│   └── .env             # Backend environment variables
│
├── client/              # React frontend (user-facing)
│   ├── src/
│   │  ├── components/
│   │  ├── pages/
│   │  ├── Redux/
│   │  ├── App.jsx       # main React component / routing (or App.tsx)
│   │  └── index.js
│   ├── package.json
│   ├── .env.local       # Frontend env (REACT_APP_SERVER_URL)
│   └── setupProxy.js    # dev proxy to backend
│
├── admin/               # React admin dashboard (optional, separate app)
│   ├── src/
│   ├── package.json
│   └── .env.local       # Admin frontend env (REACT_APP_SERVER_URL)
│
└── README.md            # this file

---

## 🔧 Environment files & important locations

### 1) Backend environment
**File:** `server/.env`  
**Example content:**
MONGO_URL=mongodb://127.0.0.1:27017/xyz_store
JWT_SECRET=your_jwt_secret_here
PORT=5000

- `MONGO_URL` — MongoDB connection string (local or Atlas).  
- `JWT_SECRET` — secret used to sign JWT tokens.  
- `PORT` — backend port (default `5000`).  

> **Note:** Some projects use the name `MONGO_URI` instead of `MONGO_URL`. Check your server code for the exact variable name (e.g., `process.env.MONGO_URL` or `process.env.MONGO_URI`) and use that same name in your `.env`.

---

### 2) Client environment
**File:** `client/.env.local`  
**Example content:**
REACT_APP_SERVER_URL=http://localhost:5000/api

- `REACT_APP_SERVER_URL` — base URL the frontend uses to call the API (used by axios or other HTTP helpers).  
- After changing `.env.local`, restart the React dev server (`npm start`).

---

### 3) Admin environment (optional)
**File:** `admin/.env.local`  
**Example content:**
REACT_APP_SERVER_URL=http://localhost:5000/api

- Same purpose as client env: admin app calls the same backend.

---

### 4) Proxy during development
**File:** `client/setupProxy.js`  
**Example content:**
const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = function (app) {
  app.use(
    "/api",
    createProxyMiddleware({
      target: "http://localhost:5000",
      changeOrigin: true,
    })
  );
};

- The proxy forwards `/api/*` requests from the React dev server to the backend so you can write `fetch('/api/…')` or use `REACT_APP_SERVER_URL` without CORS issues.

---

### 5) Other files that may contain server URL
- `client/src/Redux/Url.js` — if present, update `export const URL = "http://localhost:5000"` or switch to `process.env.REACT_APP_SERVER_URL`.
- Any axios instances or API helper files (e.g., `client/src/utils/api.js`) — replace hard-coded URLs with the env variable.
- `admin/src/...` — same changes for the admin app if it exists.

---

## ⚙️ Installation & running locally

1. Clone repo
git clone https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git
cd YOUR_REPO_NAME

2. Install dependencies

Backend:
cd server
npm install

Client:
cd ../client
npm install

Admin (optional):
cd ../admin
npm install

3. Create environment files (see examples above)
- `server/.env`
- `client/.env.local`
- `admin/.env.local` (optional)

4. Start MongoDB (local)
- If you installed MongoDB as a service it may be running automatically.
- Or run `mongod` manually (or use Docker / Atlas).

5. Start backend
cd server
npm run server   # nodemon

6. Start client
cd ../client
npm start

7. Start admin (optional)
cd ../admin
npm start

- Client: http://localhost:3000  
- Admin (if used): http://localhost:4000 (if configured)  
- Backend API: http://localhost:5000/api

---

## 🔁 Example API endpoints (Postman)

**Auth / Users**
- POST /api/users — register user  
  Body:
  { "name":"Admin", "email":"admin@test.com", "password":"123456", "isCompany":false, "acceptRegulations":true }

- POST /api/users/login — login  
  Body:
  { "email":"admin@test.com", "password":"123456" }
  Response includes `token`.

**Categories**
- POST /api/categories — create category (admin only)  
  Headers: Authorization: Bearer <admin_token>  
  Body: { "name":"Electronics", "permalink":"electronics", "desc":"Phones, computers" }

**Products**
- POST /api/products — create product (admin only)  
  Headers: Authorization: Bearer <admin_token>  
  Body example:
  {
    "name":"Smartphone XYZ",
    "image":"/images/phone.jpg",
    "description":"A phone",
    "categories":["Electronics"],
    "price":999,
    "countInStock":10,
    "isActive":true
  }

**Other**
- GET /api/products — list products  
- GET /api/categories — list categories

---

## ✅ Tips & notes

- If you need an admin user, register a user then set `isAdmin: true` in the `users` collection (MongoDB Compass or via a protected route).  
- Keep `.env` files out of source control (`.gitignore`).  
- Use `seeder.js` to bulk import test data into the database (optional).  
- If routes return 404, verify routes are registered in `app.js` (e.g., `app.use("/api/users", userRouter)`).  
- If DB connection fails, check `MONGO_URL` and that MongoDB is running.

---
