# 🛒 Fullstack E-Commerce Platform

A modern **fullstack e-commerce platform** with separate **frontend, backend, and admin dashboard**.  
The project uses **React/Redux** for the client and admin panels, **Node.js/Express** for the backend, and **MongoDB** as the database.

---

## 🚀 Features

- 🔑 User authentication (JWT + bcrypt)  
- 👨‍💼 Admin dashboard (manage users, products, and orders)  
- 🛍️ Product listing, categories, and product details  
- 📦 Shopping cart and order flow  
- 📱 Responsive UI using Styled Components  
- ⚡ REST API powered by Express.js  
- 🗄️ MongoDB database integration  

---

## 🛠️ Tech Stack

- **Backend:** Node.js, Express.js, MongoDB (Mongoose)  
- **Frontend:** React.js, Redux, Styled Components, React Router  
- **Admin Panel:** React.js, Redux, Styled Components, React Router  
- **Authentication:** JWT, bcryptjs  
- **Dev Tools:** nodemon, concurrently, redux-devtools-extension  

---

## 📂 Project Structure

.
├── backend/ # Express API
│ ├── Models/ # MongoDB Models (User, Product, Category, Order)
│ ├── Routes/ # Express routes (auth, users, products, orders, categories)
│ ├── Middleware/ # Auth & error handling middleware
│ ├── app.js # Backend entry point
│ └── package.json
│
├── client/ # React frontend (user-facing)
│ ├── components/ # Reusable UI components
│ ├── pages/ # Pages (Home, Products, Cart, Checkout, Profile)
│ ├── Redux/ # Redux slices & actions
│ └── package.json
│
├── admin/ # React admin dashboard
│ ├── components/ # Admin components
│ ├── pages/ # Admin pages (Users, Products, Orders)
│ ├── Redux/ # Admin Redux slices & actions
│ └── package.json
│
└── README.md # Project documentation


---

## ⚙️ Installation

### 1. Clone the repository
```bash
git clone https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git
cd YOUR_REPO_NAME
```
2. Install dependencies

Backend:
```bash
cd backend
npm install
```
Frontend (Client):
```bash
cd ../client
npm install
```
Frontend (Admin):
```bash
cd ../admin
npm install
```
3. Configure environment variables

Create a .env file in backend/:
```bash
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
PORT=5000
```
▶️ Running the application

Backend:
```bash
cd backend
npm run server   # uses nodemon for live reload
```
Frontend (Client):
```bash
cd ../client
npm start
```
Frontend (Admin):
```bash
cd ../admin
npm start
```
-   Client app: http://localhost:3000

-    Admin dashboard: http://localhost:4000

-    Backend API: http://localhost:5000/api

🧪 API Testing

Use Postman to test routes:

-    POST /api/users/login → login user

-    POST /api/users → register new user

-    GET /api/products → get products

-    GET /api/categories → get categories
