# AI Quiz Generator - n8n Workflows

## Overview

This folder contains the two final **n8n workflows** used by the AI Quiz Generator application.

The workflows connect the React frontend with **Mistral AI** and **Supabase** to generate quizzes, store questions, retrieve existing quizzes, and return structured data to the frontend.

### Workflows

1. **AI Quiz Generation** - Creates and stores a new quiz.
2. **Quiz Retrieval** - Retrieves a previously generated quiz and its questions using `quiz_id`.

---

# 1. AI Quiz Generation Workflow

![Quiz Generator Workflow](https://github.com/Jeswin-Madona/AI-Quiz-Generator/blob/258c1f962cba8b820a031b04b6ddc6492e095ba0/screenshots/workflow1.png)


### Purpose

This workflow receives quiz details from the React frontend, generates questions using Mistral AI, stores the quiz and questions in Supabase, and returns the generated `quiz_id`.

### Flow

```text
React Frontend
      ↓
Webhook
      ↓
Create Quiz
      ↓
Mistral AI
      ↓
Code in JavaScript
      ↓
IF
   ↓       ↓
Limit   Failure Response
   ↓
Loop Over Items
      ↓
Create Question
      ↓
Respond to Webhook
```

### Node Explanation

| Node                    | Purpose                                                                              |
| ----------------------- | ------------------------------------------------------------------------------------ |
| **Webhook1**            | Receives topic, difficulty, and question count from React.                           |
| **Create Quiz**         | Creates the main quiz record in the Supabase `quizzes` table.                        |
| **Basic LLM Chain**     | Sends the quiz requirements to Mistral AI and generates questions.                   |
| **Code in JavaScript**  | Parses and prepares the AI-generated JSON for processing.                            |
| **IF**                  | Checks whether the generated quiz data is valid.                                     |
| **Limit**               | Ensures only the requested number of questions is processed.                         |
| **Loop Over Items**     | Processes each question individually.                                                |
| **Create Question**     | Stores each question in the Supabase `questions` table with the generated `quiz_id`. |
| **Respond to Webhook2** | Returns the final success response and `quiz_id` to React.                           |
| **Respond to Webhook1** | Returns a failure response when the generated quiz data is invalid.                  |

### Request

```json
{
  "topic": "Java",
  "difficulty": "Easy",
  "number_of_questions": 10
}
```

### Response

```json
{
  "success": true,
  "message": "Quiz generated successfully",
  "quiz_id": 511
}
```

### Simple Flow

```text
Receive Request
      ↓
Create Quiz ID
      ↓
Generate Questions with Mistral AI
      ↓
Validate & Limit Questions
      ↓
Store Questions in Supabase
      ↓
Return Quiz ID
```

---

# 2. Quiz Retrieval Workflow


![Get Quiz By ID](https://github.com/Jeswin-Madona/AI-Quiz-Generator/blob/5a6c3e7351e403f0659f6ab34bc6d3e09e8573bf/screenshots/workflow2.png)


### Purpose

This workflow receives a `quiz_id`, retrieves the corresponding quiz and its questions from Supabase, combines the data, and sends it back to the React application.

### Flow

```text
React Frontend
      ↓
Webhook
      ↓
Get a Row
      ↓
Get Many Rows
      ↓
Code in JavaScript
      ↓
Respond to Webhook
```

### Node Explanation

| Node                   | Purpose                                                           |
| ---------------------- | ----------------------------------------------------------------- |
| **Webhook**            | Receives the `quiz_id` from the React application.                |
| **Get a Row**          | Retrieves the main quiz information from the `quizzes` table.     |
| **Get Many Rows**      | Retrieves all questions associated with the selected `quiz_id`.   |
| **Code in JavaScript** | Combines quiz details and questions into one structured response. |
| **Respond to Webhook** | Sends the complete quiz data back to React.                       |

### Simple Flow

```text
Receive Quiz ID
      ↓
Get Quiz Details
      ↓
Get Related Questions
      ↓
Combine Data
      ↓
Return Quiz
```

---

# Database Structure

The workflows use **Supabase PostgreSQL**.

### `quizzes`

Stores the main information about each generated quiz.

```text
id
topic
difficulty
number_of_questions
created_at
```

### `questions`

Stores individual questions belonging to a quiz.

```text
id
quiz_id
question
option_a
option_b
option_c
option_d
correct_answer
explanation
created_at
```

The relationship is:

```text
quizzes.id
    │
    └── questions.quiz_id
```

---

# Complete Application Flow

```text
                React Frontend
                      │
             Generate Quiz Request
                      │
                      ▼
              Quiz Generation
                  Webhook
                      │
                      ▼
                 Mistral AI
                      │
                      ▼
              Supabase Database
                      │
                  quiz_id
                      │
                      ▼
               React Quiz Page
                      │
                Request quiz_id
                      │
                      ▼
              Quiz Retrieval
                  Webhook
                      │
                      ▼
              Supabase Database
                      │
                      ▼
              Quiz + Questions
                      │
                      ▼
                 React UI
```

---

# Required Configuration

Before running the workflows, configure:

* **Mistral AI credentials** for the Basic LLM Chain.
* **Supabase credentials** for database operations.
* Required `quizzes` and `questions` tables in Supabase.
* Correct webhook URLs in the React frontend.

> Keep API keys, database credentials, and private webhook URLs outside the GitHub repository.

---

# Setup

1. Open your n8n instance.
2. Import the workflow JSON files from this folder.
3. Configure Mistral AI credentials.
4. Configure Supabase credentials.
5. Verify the `quizzes` and `questions` table mappings.
6. Copy the production webhook URLs into the React frontend.
7. Test quiz generation.
8. Test quiz retrieval using the returned `quiz_id`.

---

# Important Notes

* The **Generate Quiz** workflow creates the quiz record before storing its individual questions.
* The `quiz_id` is used to connect every generated question with its parent quiz.
* The **Limit** node ensures the workflow processes the requested number of questions.
* The **Quiz Retrieval** workflow uses the same `quiz_id` to fetch the correct quiz and its questions.
* Both workflows communicate with the React frontend through n8n webhooks.

---

## Technologies

* **n8n** — Workflow automation
* **Mistral AI** — AI quiz generation
* **Supabase / PostgreSQL** — Quiz and question storage
* **React.js** — Frontend application
* **REST Webhooks** — Frontend ↔ n8n communication

---

## Related Documentation

* **Main Project:** `../README.md`
* **Frontend:** `../frontend/Quiz React/README.md`
* **Workflow Files:** This folder
