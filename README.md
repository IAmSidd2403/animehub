# 🎌 Anime Search & Trending App

A modern anime search web application that allows users to search for anime and automatically tracks **trending anime searches** using **Appwrite Database**.

The app intelligently stores search terms, increments search counts, and displays trending anime based on real user interactions.

---

## 🚀 Features

- 🔍 Search anime in real-time
- 📈 Track trending anime based on search frequency
- 🧠 Intelligent search count increment logic
- ⏱️ Debounced search to avoid wrong/incomplete search terms
- ☁️ Appwrite backend for database storage
- ⚡ Fast frontend built with Vite + React
- 🔐 Secure environment variable configuration

---

## 🛠️ Tech Stack

### Frontend
- React
- Vite
- JavaScript
- CSS / Tailwind 

### Backend / Services
- Appwrite (Cloud)
- Appwrite Database
- Appwrite SDK

---

## 📂 Project Structure

```bash
anime-search-app/
├── src/
│   ├── components/
│   ├── services/
│   │   └── appwrite.js
│   ├── App.jsx
│   └── main.jsx
├── public/
├── .env
├── package.json
├── vite.config.js
└── README.md
```

## 🖼️ Screenshots

### 🏠 Home Page
![Home Page](screenshots/home.png)

---

### 🔍 Anime Search Results
![Search Results](screenshots/search.png)

---

### 📈 Trending Anime Section
![Trending Anime](screenshots/trending.png)