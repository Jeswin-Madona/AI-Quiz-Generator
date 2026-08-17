import { useNavigate } from "react-router-dom";
import { useState } from "react";
import api from "../services/api";
import Loading from "./Loading";
import "../styles/quiz.css";

function QuizForm() {

    const [topic, setTopic] = useState("");
    const [difficulty, setDifficulty] = useState("Easy");
    const [numberOfQuestions, setNumberOfQuestions] = useState(10);
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();

    async function handleGenerateQuiz() {

        if (!topic) {
            alert("Please select a topic");
            return;
        }

        setLoading(true);

        const requestBody = {
            topic,
            difficulty,
            number_of_questions: numberOfQuestions
        };

        try {

            const response = await api.post(
                "/webhook-test/generate-quiz",
                requestBody
            );

            const quizId = response.data.quiz_id;

            setLoading(false);

            navigate(`/quiz/${quizId}`);

        } catch (error) {

            setLoading(false);

            console.error("Quiz generation error:", error);

            alert("Failed to generate quiz. Please try again.");

        }
    }

    if (loading) {
        return <Loading />;
    }

    return (
        <div className="quiz-form">

            {/* Topic */}
            <div className="form-group">

                <label htmlFor="topic">
                    Topic
                </label>

                <select
                    id="topic"
                    value={topic}
                    onChange={(event) =>
                        setTopic(event.target.value)
                    }
                >
                    <option value="">
                        Select Topic
                    </option>

                    <option value="Java">
                        Java
                    </option>

                    <option value="Python">
                        Python
                    </option>

                    <option value="SQL">
                        SQL
                    </option>

                    <option value="JavaScript">
                        JavaScript
                    </option>

                </select>

            </div>


            {/* Difficulty */}
            <div className="form-group">

                <label htmlFor="difficulty">
                    Difficulty
                </label>

                <select
                    id="difficulty"
                    value={difficulty}
                    onChange={(event) =>
                        setDifficulty(event.target.value)
                    }
                >
                    <option value="Easy">
                        Easy
                    </option>

                    <option value="Medium">
                        Medium
                    </option>

                    <option value="Hard">
                        Hard
                    </option>

                </select>

            </div>


            {/* Number of Questions */}
            <div className="form-group">

                <label htmlFor="numberOfQuestions">
                    Number of Questions
                </label>

                <select
                    id="numberOfQuestions"
                    value={numberOfQuestions}
                    onChange={(event) =>
                        setNumberOfQuestions(
                            Number(event.target.value)
                        )
                    }
                >
                    <option value={5}>
                        5 Questions
                    </option>

                    <option value={10}>
                        10 Questions
                    </option>

                    <option value={15}>
                        15 Questions
                    </option>

                </select>

            </div>


            {/* Generate Button */}
            <button
                className="generate-btn"
                onClick={handleGenerateQuiz}
                disabled={loading}
            >
                Generate Quiz
            </button>

        </div>
    );
}

export default QuizForm;