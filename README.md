# 🤖 AI Quiz Generator

An AI-powered Quiz Generator that creates multiple-choice quizzes instantly using **Mistral AI**, **n8n Workflow Automation**, **Supabase**, and **React**.

The application allows users to select a topic and difficulty level, generates AI-based quiz questions, stores them in a PostgreSQL database, and displays the quiz through a modern React interface.

---

## 🚀 Features

- 🔐 Simple Login UI
- 🤖 AI-generated quiz questions using Mistral AI
- ⚙️ Workflow automation using n8n
- 🗄️ Stores quizzes and questions in Supabase
- 🎯 Dynamic quiz generation
- 📊 Quiz evaluation and score calculation
- 📖 Review answers after completion
- 📱 Clean and responsive React interface

---

# 🛠 Tech Stack

### Frontend
- React.js
- JavaScript
- React Router
- Axios
- CSS

### Backend & Automation
- n8n
- REST APIs

### AI
- Mistral AI

### Database
- Supabase
- PostgreSQL

---

# 🏗 System Architecture

```
User
   │
   ▼
React Frontend
   │
   ▼
Axios API Request
   │
   ▼
n8n Webhook
   │
   ▼
Mistral AI
   │
   ▼
Supabase Database
   │
   ▼
React Quiz Interface
```
![Architecture](https://github.com/Jeswin-Madona/AI-Quiz-Generator/blob/c04193be2e4f09393510a26a7ddd2761eb78b2da/screenshots/architecture.png)
---

# ⚙ Workflow Overview

## Quiz Generation Workflow

1. User selects Topic & Difficulty
2. React sends request to n8n
3. n8n calls Mistral AI
4. AI generates quiz questions
5. Questions are stored in Supabase
6. Quiz ID is returned to React
7. Quiz page loads automatically

---

## Quiz Retrieval Workflow

1. React sends Quiz ID
2. n8n retrieves questions from Supabase
3. Questions are returned to React
4. User answers the quiz
5. Score is calculated and displayed

---

# 📁 Project Structure

```
AI-Quiz-Generator
│
├── frontend/
│   ├── src/
│   ├── public/
│   └── package.json
│
├── workflows/
│   ├── Generate Quiz.json
│   └── Get Quiz.json
│
├── screenshots/
│
├── documentation/
│
├── README.md
└── LICENSE
```

---

# 📷 Screenshots

### Login Page

(Add Screenshot)

---

### Home Page

(Add Screenshot)

---

### Quiz Page

(Add Screenshot)

---

### Result Page

(Add Screenshot)

---

### n8n Workflow

(Add Workflow Screenshot)

---

# 🚀 Getting Started

## Clone Repository

```bash
git clone https://github.com/YOUR_USERNAME/AI-Quiz-Generator.git
```

---

## Navigate to Frontend

```bash
cd frontend
```

---

## Install Dependencies

```bash
npm install
```

---

## Run React Application

```bash
npm run dev
```

---

## Import n8n Workflows

Import the following workflow files into your n8n instance.

- Generate Quiz.json
- Get Quiz.json

---

## Configure

Create and configure:

- Mistral AI Credentials
- Supabase Credentials

Update the webhook URLs inside the React application if required.

---

# 📚 What I Learned

This project helped me gain practical experience in:

- React Application Development
- Workflow Automation using n8n
- REST API Integration
- AI Integration using Mistral AI
- PostgreSQL Database Design
- Supabase
- State Management
- Debugging Real-world Workflow Issues
- Building End-to-End Applications

---

# 🚧 Challenges Faced

Some challenges during development included:

- Passing Quiz IDs between workflows
- React routing issues
- Webhook registration errors
- Database filtering
- Mapping AI responses correctly
- Connecting multiple technologies seamlessly

Solving these problems greatly improved my debugging and problem-solving skills.

---

# 🔮 Future Improvements

- ✅ User Authentication
- 👨‍🎓 Student Profiles
- 🏆 Leaderboard
- 📊 Performance Analytics
- 📜 Quiz History
- 🌙 Dark Mode
- 📄 PDF Report Generation
- 👨‍🏫 Admin Dashboard

---

# 👨‍💻 Author

**Jeswin Madona**

Computer Science Engineering Student

Passionate about

- Java Backend Development
- Workflow Automation
- Artificial Intelligence
- Full Stack Development

GitHub:
https://github.com/Jeswin-Madona

LinkedIn:
https://www.linkedin.com/in/jeswinmadona

---

⭐ If you found this project helpful, consider giving this repository a Star!
