# 🔄 n8n Workflows

This folder contains the automation workflows used in the **AI Quiz Generator** project.

The workflows automate quiz generation, database operations, and communication between the React frontend, Mistral AI, and Supabase.

---

# 📁 Workflow Files

## 1. Generate Quiz.json


![Quiz Generator Workflow](https://github.com/Jeswin-Madona/AI-Quiz-Generator/blob/cc963f71c464fd518bb0ec47cc95448aa201766c/screenshots/workflow1.png)



### Purpose

Generates a new AI-powered quiz based on the topic and difficulty selected by the user.

### Workflow Steps

1. Receives a request from the React application through a Webhook.
2. Reads the following inputs:
   - Topic
   - Difficulty
   - Number of Questions
3. Sends the prompt to Mistral AI.
4. Receives AI-generated quiz questions.
5. Parses the AI response.
6. Creates a new Quiz record in Supabase.
7. Stores all generated questions into the Questions table.
8. Returns the generated **Quiz ID** to the React application.

---

## 2. Get Quiz.json

![Get Quiz By ID](https://github.com/Jeswin-Madona/AI-Quiz-Generator/blob/cc963f71c464fd518bb0ec47cc95448aa201766c/screenshots/workflow2.png)

### Purpose

Retrieves all quiz questions for a specific Quiz ID.

### Workflow Steps

1. Receives the Quiz ID from the React frontend.
2. Queries the Questions table in Supabase.
3. Filters questions using the provided Quiz ID.
4. Returns the matching quiz questions as JSON.
5. React displays the questions to the user.

---

# 🏗 Workflow Architecture

```
React Frontend
        │
        ▼
    n8n Webhook
        │
        ▼
    Mistral AI
        │
        ▼
 Parse AI Response
        │
        ▼
 Supabase Database
        │
        ▼
  Return JSON Response
        │
        ▼
 React Quiz Interface
```

---

# 📂 Database Tables

## quizzes

Stores quiz information.

Example fields:

- id
- topic
- difficulty
- created_at

---

## questions

Stores generated quiz questions.

Example fields:

- id
- quiz_id
- question
- option_a
- option_b
- option_c
- option_d
- correct_answer

---

# 🔧 Required Credentials

Before importing these workflows, configure the following credentials inside n8n.

- Supabase
- Mistral AI API
- HTTP Request (if required)

---

# 📥 Import Instructions

1. Open n8n.
2. Click **Import from File**.
3. Select one of the JSON workflow files.
4. Configure the required credentials.
5. Save the workflow.
6. Activate the workflow.
7. Test using the configured webhook.

---

# ⚠ Important Notes

- Ensure the Supabase tables are created before executing the workflows.
- Update API keys before running.
- Verify the webhook URLs match the React frontend configuration.
- Import **Generate Quiz** before testing **Get Quiz**.

---

# 🚀 Future Improvements

Planned enhancements include:

- User Authentication
- Student Profiles
- Leaderboard
- Quiz History
- Performance Analytics
- Admin Dashboard
- Difficulty-based scoring
- AI-generated explanations for answers

---

# 👨‍💻 Author

**Jeswin Madona**

This workflow was created as part of the **AI Quiz Generator** capstone project to demonstrate workflow automation using **n8n**, **Mistral AI**, **Supabase**, and **React**.
