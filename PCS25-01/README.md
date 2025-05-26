# 🧠 Quiz Platform

A full-stack quiz platform built using **React** for the frontend and **Node.js** with **Express** for the backend. This application allows users to register, login, participate in quizzes, and solve coding problems interactively.

---

## 🚀 Features

- 🔐 User authentication (register & login)
- 📋 Multiple-choice quizzes
- 💻 Coding questions with evaluation
- ⏲️ Timed quizzes
- 📊 Score tracking and leaderboard
- 💡 Responsive and modern UI

---

## 🛠️ Tech Stack

### Frontend:
- React.js
- React Router
- Axios
- Tailwind CSS (or any CSS framework)

### Backend:
- Node.js
- Express.js
- MongoDB & Mongoose
- JWT Authentication
- Bcrypt (for password hashing)

---

## 📦 Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/quiz-platform.git
cd quiz-platform
```

### 2. Setup Backend

```bash
cd server
npm install
```

#### Create a `.env` file in the `server/` directory:

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
```

Start the backend server:

```bash
npm start
```

---

### 3. Setup Frontend

```bash
cd ../client
npm install
```

Start the frontend server:

```bash
npm start
```

> By default, frontend runs on port 3000 and backend on port 5000.

---

## 📁 Folder Structure

```
quiz-platform/
├── client/         # React frontend
│   └── src/
├── server/         # Node.js backend
│   ├── routes/
│   ├── models/
│   ├── controllers/
│   ├── utils/
│   └── config/
└── README.md
```

---


## 📌 API Endpoints

### Auth:
- `POST /api/register` – Register a new user
- `POST /api/login` – Login and receive JWT

### Quiz:
- `GET /api/quiz` – Fetch quiz questions
- `POST /api/quiz/submit` – Submit answers

### Coding:
- `POST /api/code/submit` – Submit and evaluate code

---

## 🙌 Contributing

Contributions and suggestions are welcome!  
Feel free to open an issue or pull request.

---

## 📄 License

This project is licensed under the MIT License.  
See the [LICENSE](LICENSE) file for details.

---

## 👨‍💻 Author

**Kushagra Varshney**  
📧 kushagra.2125cs1206@kiet.edu 

---

## ⭐ Show Your Support

If you like this project, give it a ⭐ on [GitHub](https://github.com/your-username/quiz-platform)!
