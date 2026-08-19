# 🤖 AI Quiz Generator

An AI-powered quiz generation platform that creates multiple-choice quizzes dynamically using **Mistral AI**, **n8n**, **Supabase**, and **React**.

Users can select a topic, difficulty level, and number of questions. The system generates questions using AI, stores them in Supabase, and provides an interactive quiz experience with result and answer-review features.

![Cover Image](https://github.com/Jeswin-Madona/AI-Quiz-Generator/blob/cc963f71c464fd518bb0ec47cc95448aa201766c/screenshots/cover%20page.png)

---

## ✨ Features

- 🔐 User Login & Signup
- 🤖 AI-powered quiz generation
- 🎯 Topic and difficulty selection
- 📝 Custom number of questions
- ⚙️ n8n workflow automation
- 🗄️ Supabase PostgreSQL database
- 📊 Automatic score calculation
- 📖 Answer review
- 📚 Quiz history
- 🏆 Leaderboard
- 📈 Performance analytics
- 📱 Responsive React interface

---

## 🛠️ Tech Stack

| Technology | Purpose |
|---|---|
| React.js | Frontend application |
| JavaScript | Application logic |
| React Router | Client-side routing |
| Axios | API communication |
| CSS | UI styling |
| n8n | Workflow automation |
| Mistral AI | AI question generation |
| Supabase | Authentication & database |
| PostgreSQL | Data storage |

---

## 🏗️ System Architecture

```text
                    ┌─────────────────┐
                    │      User       │
                    └────────┬────────┘
                             │
                             ▼
                    ┌─────────────────┐
                    │ React Frontend  │
                    └────────┬────────┘
                             │
                         Axios API
                             │
                             ▼
                    ┌─────────────────┐
                    │   n8n Webhook   │
                    └────────┬────────┘
                             │
                             ▼
                    ┌─────────────────┐
                    │   Mistral AI    │
                    └────────┬────────┘
                             │
                             ▼
                    ┌─────────────────┐
                    │    Supabase     │
                    │   PostgreSQL    │
                    └────────┬────────┘
                             │
                             ▼
                    ┌─────────────────┐
                    │   Quiz UI /     │
                    │ Results / Review│
                    └─────────────────┘
````

![Architecture](https://github.com/Jeswin-Madona/AI-Quiz-Generator/blob/c04193be2e4f09393510a26a7ddd2761eb78b2da/screenshots/architecture.png)

---

## ⚙️ How It Works

### Quiz Generation

```text
User selects:
Topic + Difficulty + Number of Questions
              ↓
       React Frontend
              ↓
         n8n Webhook
              ↓
          Mistral AI
              ↓
     Generate Questions
              ↓
        Supabase DB
              ↓
          Quiz ID
              ↓
        React Quiz Page
```

### Quiz Retrieval

```text
React requests Quiz ID
          ↓
     n8n Webhook
          ↓
   Supabase Database
          ↓
     Quiz Questions
          ↓
      React Quiz UI
```

After completing the quiz, the frontend calculates the score and displays the result. Users can also review their answers and track previous quiz attempts.

---

## 📁 Repository Structure

```text
AI-Quiz-Generator/
│
├── frontend/
│   └── Quiz React/
│       ├── public/
│       ├── src/
│       ├── package.json
│       └── README.md
│
├── workflows/
│   ├── Generate Quiz.json
│   ├── Get Quiz.json
│   └── README.md
│
├── screenshots/
│
├── README.md
└── LICENSE
```

The project contains separate documentation for the **React frontend** and **n8n workflows**.

---

## 📷 Application Screenshots

### Login

![Login](screenshots/login%20page.png)

### Home

![Home](screenshots/home%20page.png)

### Quiz

![Quiz](screenshots/quiz%20page.png)

### Result

![Result](screenshots/result%20page.png)

### Review

![Review](screenshots/review%20page.png)

### Quiz History

![History]([screenshots/history%20page.png](https://github.com/Jeswin-Madona/AI-Quiz-Generator/blob/f41aebc9f7fb9d5e3717cfa521edc8a4c4e75ac6/screenshots/quiz%20history%20page.png))

### Leaderboard

![Leaderboard](screenshots/leaderboard%20page.png)

### Analytics

![Analytics](screenshots/analytics%20page.png)

---

## ⚙️ n8n Workflows

The project uses two main n8n workflows:

### 1. Generate Quiz

Responsible for:

* Receiving quiz configuration from React
* Sending the prompt to Mistral AI
* Processing AI-generated questions
* Creating the quiz record
* Storing individual questions in Supabase
* Returning the generated `quiz_id`

### 2. Get Quiz

Responsible for:

* Receiving a `quiz_id`
* Retrieving the corresponding quiz questions from Supabase
* Returning the questions to the React application

Detailed workflow documentation is available in:

```text
workflows/README.md
```

---

## 🚀 Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/Jeswin-Madona/AI-Quiz-Generator.git
```

```bash
cd AI-Quiz-Generator
```

### 2. Setup Frontend

```bash
cd frontend/Quiz\ React
```

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

The React application will run on the Vite development server.

### 3. Setup n8n

Import the workflow JSON files from:

```text
workflows/
```

Configure the required credentials:

* Mistral AI
* Supabase

Make sure the webhook URLs used by the React frontend match the URLs configured in n8n.

### 4. Setup Supabase

Create the required Supabase project and database tables for:

* User profiles
* Quizzes
* Quiz questions
* Quiz attempts

Configure Supabase authentication for user login and signup.

---

## 🔑 Environment Configuration

Create the required environment variables for the React application.

Example:

```env
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
VITE_N8N_BASE_URL=your_n8n_webhook_url
```

Do **not** commit private API keys, service-role keys, passwords, or other sensitive credentials to GitHub.

---

## 📚 Project Learning

This project provided practical experience with:

* React application development
* REST API integration
* n8n workflow automation
* AI integration using Mistral AI
* Supabase authentication
* PostgreSQL database operations
* React routing and protected routes
* Frontend-backend integration
* Debugging API and workflow issues
* Building an end-to-end AI application

---

## 🔮 Future Improvements

* 🎨 Improved UI/UX
* 🌙 Dark mode
* 📄 PDF quiz reports
* 👨‍🏫 Admin dashboard
* ⏱️ Quiz timer
* 🎯 More question categories
* 📱 Improved mobile experience

---

## 👨‍💻 Author

### Jeswin Madona

Computer Science Engineering Student

**GitHub:**
[https://github.com/Jeswin-Madona](https://github.com/Jeswin-Madona)

**LinkedIn:**
[https://www.linkedin.com/in/jeswinmadona](https://www.linkedin.com/in/jeswinmadona)

---

## ⭐ Support

If you find this project useful or interesting, consider giving the repository a ⭐ Star.
