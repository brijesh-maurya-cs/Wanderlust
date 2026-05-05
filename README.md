# 🏕️ Wanderlust

A full-stack Airbnb-inspired web application where users can create, explore, and review travel listings — complete with map integration, image uploads, and secure authentication.

🔗 **Live Demo:** [wanderlust-9qfn.onrender.com](https://wanderlust-9qfn.onrender.com)

---

## 📋 Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [NPM Packages](#npm-packages)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
- [Environment Variables](#environment-variables)
- [API / Routes](#api--routes)
- [Contributing](#contributing)

---

## ✨ Features

- 🔐 **User Authentication** — Register, login, logout using Passport.js
- 🏠 **Listings CRUD** — Create, read, update, delete property listings
- 🖼️ **Image Uploads** — Upload listing images via Cloudinary
- 🗺️ **Interactive Map** — Each listing shows location on a Leaflet map using OpenStreetMap + Nominatim geocoding
- ⭐ **Reviews System** — Logged-in users can leave star ratings and comments
- 🔍 **Search** — Search listings by country or location
- 🗂️ **Category Filter** — Browse listings by category
- 💬 **Flash Messages** — Success/error notifications on all actions
- 📱 **Responsive Design** — Mobile-friendly UI with Bootstrap 5

---

## 🛠️ Tech Stack

| Layer | Technology |
|-------|------------|
| **Frontend** | EJS, EJS-Mate, HTML, CSS, JavaScript, Bootstrap 5 |
| **Backend** | Node.js, Express.js |
| **Database** | MongoDB, Mongoose |
| **Authentication** | Passport.js, passport-local, passport-local-mongoose |
| **Image Storage** | Cloudinary, Multer |
| **Maps** | Leaflet.js, OpenStreetMap, Nominatim API |
| **Session** | express-session, connect-mongo |
| **Validation** | Joi |
| **Deployment** | Render |

---

## 📦 NPM Packages

| Package | Purpose |
|---------|---------|
| `express` | Web framework |
| `mongoose` | MongoDB ODM |
| `ejs` | Templating engine |
| `ejs-mate` | EJS layout support |
| `passport` | Authentication middleware |
| `passport-local` | Local strategy for passport |
| `passport-local-mongoose` | Mongoose plugin for passport |
| `cloudinary` | Cloud image storage |
| `multer` | File upload handling |
| `multer-storage-cloudinary` | Multer + Cloudinary integration |
| `connect-mongo` | MongoDB session store |
| `express-session` | Session management |
| `connect-flash` | Flash messages |
| `method-override` | PUT/DELETE from HTML forms |
| `joi` | Schema validation |
| `dotenv` | Environment variable management |
| `cookie-parser` | Cookie parsing |
| `nodemon` | Auto-restart in development |

---

## 📁 Project Structure

```
wanderlust/
├── controllers/
│   ├── listingController.js   # Listing CRUD logic
│   ├── reviewController.js    # Review logic
│   └── userController.js      # Auth logic
├── models/
│   ├── listing.js             # Listing schema
│   ├── review.js              # Review schema
│   └── user.js                # User schema
├── routes/
│   ├── listing.js             # Listing routes
│   ├── review.js              # Review routes
│   └── user.js                # Auth routes
├── views/
│   ├── layouts/               # EJS boilerplate layout
│   ├── listings/              # Listing pages (index, show, new, edit)
│   └── users/                 # Login / register pages
├── public/
│   ├── css/                   # Stylesheets
│   └── js/
│       └── map.js             # Leaflet map logic
├── middleware.js              # Auth & validation middleware
├── cloudConfig.js             # Cloudinary configuration
├── schema.js                  # Joi validation schemas
├── app.js                     # Main Express app
└── .env                       # Environment variables (not committed)
```

---

## 🚀 Getting Started

### Prerequisites

- Node.js v18+
- MongoDB (local or Atlas)
- Cloudinary account

### Installation

1. **Clone the repository**
```bash
git clone https://github.com/brijesh-maurya-cs/wanderlust.git
cd wanderlust
```

2. **Install dependencies**
```bash
npm install
```

3. **Set up environment variables**

Create a `.env` file in the root directory (see [Environment Variables](#environment-variables) below)

4. **Run the app**
```bash
# Development (with nodemon)
nodemon app.js

# Production
node app.js
```

5. **Open in browser**
```
http://localhost:8080
```

---

## 🔑 Environment Variables

Create a `.env` file in the root with these variables:

```env
# MongoDB
ATLASDB_URL=your_mongodb_atlas_connection_string

# Cloudinary
CLOUD_NAME=your_cloudinary_cloud_name
CLOUD_API_KEY=your_cloudinary_api_key
CLOUD_API_SECRET=your_cloudinary_api_secret

# Session
SECRET=your_session_secret_key
```


---
