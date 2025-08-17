# 🛒 XYZ Store — Fullstack E-Commerce Platform

A modern fullstack e-commerce application with separate **frontend (client)**, **backend (server)** and **admin dashboard**.  
Frontend is built with React + Redux; backend is Node.js + Express; data is stored in MongoDB (Mongoose).

# 🌟 Features
- 🛒 Full e-commerce functionality (Products, Cart, Checkout)  
- 🛠 Admin dashboard for managing products, orders, and users  
- 🔐 User authentication with JWT  
- 💬 Real-time updates for orders and reviews  
- 📦 Modular architecture (Admin, Client, Server)  
- 🌍 Responsive design for mobile & desktop  
- ⚡ Fast frontend with React & Redux  
- 🧪 Easy development with hot-reloading and nodemon  

# 🛠 Tech Stack
- **Backend:** Node.js, Express, MongoDB, Mongoose, JWT, bcryptjs  
- **Frontend:** React, Redux, React Router, Styled Components  
- **Admin Panel:** React, Redux, React Router, Styled Components  
- **Utilities:** Axios, Moment.js, Web Vitals  
- **Dev Tools:** nodemon, concurrently, ESLint  
- **Deployment Ready:** Production build scripts for client and admin  

**NewProjectShop** is a **fullstack e-commerce application** consisting of three main parts:  

- 🛠 **admin** – Admin dashboard  
- 🛒 **client** – Frontend for users  
- 🔗 **server** – Backend API  

Each folder has its own `package.json` and environment configuration (`.env` or `.env.local`).  

---

## 📁 Project Structure

```
NewProjectShop/
├─ admin/          # Admin dashboard
├─ client/         # Client frontend
└─ server/         # Backend (Node.js + Express + MongoDB)
````

---

## ⚙️ Requirements

- Node.js >= 16  
- npm >= 8  
- MongoDB (local or Atlas)  
- Git (optional)  

---

## 🔧 Installation

1. **Clone the repository:**

```bash
git clone https://github.com/your-username/NewProjectShop.git
cd NewProjectShop
```

2. **Install dependencies for each part:**

```bash
# Backend
cd server
npm install

# Admin dashboard
cd ../admin
npm install

# Client frontend
cd ../client
npm install
```

---

## 📝 Environment Configuration

### 1. Backend (`server/.env`)

Create a `.env` file inside the `server` folder:

```env
PORT=5000
MONGO_URI=mongodb://localhost:27017/newprojectshop
JWT_SECRET=YourSuperSecretKey
```

* `PORT` – backend server port
* `MONGO_URI` – MongoDB connection string
* `JWT_SECRET` – secret key for JWT tokens

---

### 2. Admin (`admin/.env.local`) and Client (`client/.env.local`)

```env
REACT_APP_API_URL=http://localhost:5000
```

* Update the URL to point to your backend server
* Restart React server after modifying `.env.local`

---

## 🚀 Running the Project

### Backend

```bash
cd server
npm run server
```

* Runs backend on the port defined in `.env` (default: `5000`)

### Admin Dashboard

```bash
cd ../admin
npm start
```

* Opens admin dashboard at `http://localhost:4000`

### Client Frontend

```bash
cd ../client
npm start
```

* Opens client frontend at `http://localhost:3000`

---

## 🔗 Changing URLs and Environment Variables

1. **Backend URL:**
   Update `.env.local` in both `admin` and `client`:

```env
REACT_APP_API_URL=http://your-server:5000
```

2. **Backend credentials or DB:**
   Update `server/.env`:

```env
MONGO_URI=new_mongodb_address
JWT_SECRET=new_secret_key
```

3. **Restart servers after changes:**

* Backend: `npm run server`
* Frontend: `npm start`

---

## 📦 NPM Scripts

| Folder | Script           | Description                  |
| ------ | ---------------- | ---------------------------- |
| server | `npm start`      | Runs backend server          |
| server | `npm run server` | Runs backend with nodemon    |
| admin  | `npm start`      | Runs admin dashboard         |
| admin  | `npm run build`  | Builds admin for production  |
| client | `npm start`      | Runs client frontend         |
| client | `npm run build`  | Builds client for production |

---

## 🛠 Technologies

* **Backend:** Node.js, Express, MongoDB, JWT, bcryptjs
* **Frontend:** React, Redux, Styled Components
* **Admin:** React, Redux, React Router

---

## 💡 Tips & Best Practices

* Use `npm run build` in `client` and `admin` to generate production-ready builds
* Ensure MongoDB is running before starting the backend
* Use a strong `JWT_SECRET` in production
* Do not commit `.env` or `.env.local` files to GitHub

---

## ❓ FAQ / Troubleshooting

**Q1:** The frontend cannot connect to backend.

* Make sure `REACT_APP_API_URL` points to the correct backend URL.
* Restart the frontend server after changing `.env.local`.

**Q2:** MongoDB connection fails.

* Verify that MongoDB is running locally or the Atlas connection string is correct.

**Q3:** Admin dashboard or client frontend not loading.

* Check console for errors, ensure all dependencies are installed (`npm install`).

**Q4:** Want to change ports?

* Backend: `server/.env` → `PORT`
* Admin: `admin/package.json` → `start` script (`set PORT=XXXX`)
* Client: `client/package.json` → `start` script (`PORT=XXXX react-scripts start`)

---
