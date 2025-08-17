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
- REST API (Express) and MongoDB (Mongoose) integration

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
├── backend/ # Express API (server)
│ ├── Models/ # Mongoose models (User, Product, Category, Order)
│ ├── Routes/ # Express routes (users, products, categories, orders, auth)
│ ├── Controllers/ # (optional) controllers / request handlers
│ ├── Middleware/ # auth & error handlers
│ ├── data/ # (optional) seed JSON files
│ ├── app.js # Backend entry point
│ ├── seeder.js # (optional) data import script
│ ├── package.json
│ └── .env # Backend env (MONGO_URL, JWT_SECRET, PORT)
│
├── client/ # React frontend (user-facing)
│ ├── src/
│ │ ├── components/
│ │ ├── pages/
│ │ ├── Redux/
│ │ ├── App.jsx # main React component / routing
│ │ └── index.js
│ ├── package.json
│ ├── .env.local # Frontend env (REACT_APP_SERVER_URL)
│ └── setupProxy.js # dev proxy to backend
│
├── admin/ # React admin dashboard (optional, separate app)
│ ├── src/
│ ├── package.json
│ └── .env.local # Admin front-end env (REACT_APP_SERVER_URL)
│
└── README.md # this file


---

## 🔧 Environment & important files

### Backend env (file)
**Path:** `backend/.env`  
**Required variables (example):**
```
MONGO_URL=mongodb://127.0.0.1:27017/xyz_store
JWT_SECRET=your_jwt_secret_here
PORT=5000
```
-    MONGO_URL — MongoDB connection string (local or Atlas).

-    JWT_SECRET — secret used to sign JWT tokens.

-    PORT — backend port (default 5000).

-    Note: Your server code uses process.env.MONGO_URL — keep that exact name.

Client env (file)

Path: client/.env.local
Example:
```
REACT_APP_SERVER_URL=http://localhost:5000/api
```
-    REACT_APP_SERVER_URL — base URL the frontend uses to call the API (used by axios or other HTTP helpers).

-    After changing this file, restart npm start.

Admin env (optional)

Path: admin/.env.local
```
REACT_APP_SERVER_URL=http://localhost:5000/api
```
Proxy (dev)

Path: client/setupProxy.js
Example:
```
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
```
-    Proxy forwards /api/* requests from React dev server to the backend to avoid CORS and simplify calls.

Other places that may contain the server URL

-    client/src/Redux/Url.js (or similar): update export const URL = "http://localhost:5000" or use process.env.REACT_APP_SERVER_URL.

-    Any axios instances or API helpers in client/src/ that hardcode a URL — change them to use process.env.REACT_APP_SERVER_URL or the URL constant.

⚙️ Installation & run (local development)
1. Clone repo
```
git clone https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git
cd YOUR_REPO_NAME
```
2. Install dependencies

Backend
```
cd backend
npm install
```
Client
```
cd ../client
npm install
```
Admin (optional)
```
cd ../admin
npm install
```
3. Configure environment files

-    Create backend/.env (see example above).

-    Create client/.env.local and admin/.env.local (if using admin) and set REACT_APP_SERVER_URL.

4. Start services (in separate terminals)

Start MongoDB (if local):

-    If MongoDB installed as a service: it may already be running.

-    Or start manually: mongod (or use your OS service manager).

Start backend
```
cd backend
npm run server   # starts nodemon (auto restarts on change)
# or: node app.js
```
Start client
```
cd ../client
npm start
```
Start admin (optional)
```
cd ../admin
npm start
```
-    Frontend (client) default: http://localhost:3000

-    Admin (if used): http://localhost:4000 (if your admin script sets PORT=4000)

-    Backend API: http://localhost:5000/api

🔁 Example API endpoints & Postman usage

-    Use Postman or the frontend to test API routes. Include Authorization: Bearer <token> for admin/protected routes.

Auth / Users

-    POST /api/users — register user
    Body:
```
{ "name":"Admin", "email":"admin@test.com", "password":"123456", "isCompany":false, "acceptRegulations":true }
```
-    POST /api/users/login — login
Body:
```
    { "email":"admin@test.com", "password":"123456" }
```
Response includes token.

Categories

-    POST /api/categories — create category (admin only)
    Headers: Authorization: Bearer <admin_token>
    Body:
```
    { "name":"Electronics", "permalink":"electronics", "desc":"Phones, computers" }
```
Products

-    POST /api/products — create product (admin only)
    Headers: Authorization: Bearer <admin_token>
    Body example:
```
    {
      "name":"Smartphone XYZ",
      "image":"/images/phone.jpg",
      "description":"A phone",
      "categories":["Electronics"],
      "price":999,
      "countInStock":10,
      "isActive":true
    }
```
Other

-    GET /api/products — list products

-    GET /api/categories — list categories

✅ Tips

-    If you register a user but need admin rights, you can set isAdmin: true directly in the users collection using MongoDB Compass or use a protected admin route to promote a user.

-    Keep .env files out of Git (add them to .gitignore).

-    Use seeder.js (optional) to bulk import test data from JSON files (data/products.json, etc.).

🧩 Troubleshooting

-    404 on route: check that the route file is imported in app.js (e.g., app.use("/api/users", userRouter)).

-    DB connection error: verify MONGO_URL and that MongoDB is running on the specified host/port.

-    CORS issues: using setupProxy.js in client or enable cors() in Express (already included in server code).
