# Full-Stack Delivery Application

A comprehensive full-stack delivery platform built using the MERN stack. This application is divided into three main components: a customer-facing frontend, a robust backend API server, and a specialized admin dashboard for managing orders and inventory.

##  Key Features

*   **Secure Authentication**: User login and registration powered by JSON Web Tokens (JWT) and encrypted passwords (Bcrypt).
*   **Product & Menu Management**: Browse, search, and view available items for delivery.
*   **Cart & Checkout System**: State-of-the-art shopping cart with secure online payment processing via Stripe integration.
*   **Admin Dashboard**: A secure control panel for store owners to manage items, categories, and monitor ongoing delivery orders.
*   **Media Uploads**: Built-in support for uploading and storing product images using Multer.
*   **High Performance**: Blazing fast frontend built with React and Vite for optimal user experience.

##  Tech Used

### Frontend (Client-Side)
*   **React.js (v19)**: The core library for building the user interface.
*   **Vite**: A modern, extremely fast build tool and development server.
*   **React Router DOM**: Handles navigational routing across the application seamlessly.
*   **Axios**: A promise-based HTTP client to fetch data from the backend API.

### Backend (Server-Side)
*   **Node.js**: The JavaScript runtime environment executing the server.
*   **Express.js**: A minimal and flexible Node.js web application framework.
*   **MongoDB**: A NoSQL, document-oriented database for storing user, product, and order data.
*   **Mongoose**: Object Data Modeling (ODM) library for MongoDB and Node.js.
*   **JSON Web Token (JWT)**: Used to securely transmit information between parties as a JSON object, ideal for authentication.
*   **Bcrypt**: A password-hashing function used to secure user credentials.

### Admin Interface
*   **React.js & Vite**: Fast development ecosystem tailored for building the dashboard.
*   **React Toastify**: Provides elegant and customizable toast notifications for admin actions.
*   **Axios**: Manages administrative API requests securely.

### Third-Party Services & Utilities
*   **Cloudinary**: Permanent cloud media hosting for user-uploaded product images.
*   **Stripe**: Payment gateway integration to handle credit card transactions safely.
*   **Multer**: Node.js middleware for parsing `multipart/form-data` uploads.
*   **Dotenv**: Loads environment variables from a `.env` file securely.
*   **CORS**: Handles Cross-Origin Resource Sharing to allow the frontend and admin panel to communicate with the backend.

## 📂 Project Architecture

*   `/frontend` - Contains the source code for the public-facing React application.
*   `/admin` - Contains the source code for the restricted administrative portal.
*   `/backend` - Contains the Express server, database models, middleware, and API routes.

## 🚦 Cloud Deployment & Hosting
This project is configured natively to run beautifully in the cloud:
*   **Vercel (Frontend & Admin Panel)**: Auto-deployed efficiently directly from GitHub using native Vite build presets.
*   **Vercel / Render (Backend API)**: Can be securely hosted as a Web Service.
*   **MongoDB Atlas (Database)**: Remote cluster integration.

To get the application up and running locally on your machine, you must initialize and run the Backend, Frontend, and Admin servers. (' - ')

### Prerequisites
*   Node.js installed on your machine.
*   A MongoDB database (either locally installed or a MongoDB Atlas URI string).
*   A Stripe account and its developer API keys.

### 1. Backend Setup
1.  Navigate into the backend directory: `cd backend`
2.  Install all required dependencies: `npm install`
3.  Set up your environment variables by creating a `.env` file (you will need a `MONGO_URI`, `JWT_SECRET`, and `STRIPE_SECRET_KEY`).
4.  Run the server: `npm run server` (Runs continuously using Nodemon).

### 2. Frontend Setup
1.  Navigate into the frontend directory: `cd frontend`
2.  Install dependencies: `npm install`
3.  Start the local development server: `npm run dev`

### 3. Admin Panel Setup
1.  Navigate into the admin directory: `cd admin`
2.  Install dependencies: `npm install`
3.  Start the admin development server: `npm run dev`
