# 🎨 AI Quiz Generator — Frontend

The frontend of the AI Quiz Generator is built using **React.js**. It provides the user interface for authentication, quiz generation, quiz participation, results, review, history, leaderboard, and analytics.

---

## 🛠️ Tech Stack

- React.js
- JavaScript
- React Router
- Axios
- Supabase
- CSS
- Vite

---

## ✨ Features

- 🔐 Login & Signup
- 🏠 User Dashboard
- 🤖 AI Quiz Generation
- 🎯 Topic & Difficulty Selection
- 🔢 Custom Question Count
- 📝 Interactive Quiz
- 📊 Score & Result
- 📖 Answer Review
- 📚 Quiz History
- 🏆 Leaderboard
- 📈 Performance Analytics
- 🔒 Protected Routes

---

## 📁 Project Structure

```text
Quiz React/
│
├── public/
│
├── src/
│   ├── components/
│   ├── pages/
│   ├── services/
│   ├── lib/
│   ├── styles/
│   ├── App.jsx
│   └── main.jsx
│
├── package.json
├── package-lock.json
└── README.md
````

---

## 🔄 Application Flow

```text
Login / Signup
      ↓
Home Dashboard
      ↓
Select Topic + Difficulty + Questions
      ↓
Generate Quiz
      ↓
n8n Webhook
      ↓
Quiz Page
      ↓
Submit Quiz
      ↓
Result
      ↓
Review / History / Analytics
```

---

## 🌐 API Integration

The frontend communicates with the n8n workflows using Axios.

### Generate Quiz

```text
POST /webhook-test/generate-quiz
```

Example request:

```json
{
  "topic": "Java",
  "difficulty": "Easy",
  "number_of_questions": 10
}
```

Example response:

```json
{
  "success": true,
  "message": "Quiz generated successfully",
  "quiz_id": 511
}
```

### Get Quiz

```text
GET /webhook-test/get-quiz?id=511
```

The quiz ID is used to retrieve the corresponding questions from Supabase through the n8n workflow.

---

## 🚀 Setup

### 1. Install Dependencies

```bash
npm install
```

### 2. Configure Environment Variables

Create a `.env` file:

```env
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
VITE_N8N_BASE_URL=your_n8n_base_url
```

### 3. Start the Application

```bash
npm run dev
```

The application runs on the Vite development server, usually:

```text
http://localhost:5173
```

---

## 🔗 Dependencies

The frontend requires:

* **Supabase** - Authentication and database access
* **n8n** - Quiz generation and retrieval workflows
* **Mistral AI** - AI question generation

For workflow setup, see:

```text
../../workflows/README.md
```

For the complete project overview, see:

```text
../../README.md
```

---

## 👨‍💻 Author

**Jeswin Madona**

Computer Science Engineering Student

[GitHub](https://github.com/Jeswin-Madona)

[LinkedIn](https://www.linkedin.com/in/jeswinmadona)


