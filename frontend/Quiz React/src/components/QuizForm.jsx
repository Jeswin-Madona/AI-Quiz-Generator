import { useNavigate } from "react-router-dom";
import { useState } from "react";
import api from "../services/api";
import Loading from "./Loading";
import "../styles/Quiz.css";


function QuizForm() {
    const [topic, setTopic] = useState("");

  const [difficulty, setDifficulty] = useState("Easy");

  const [numberOfQuestions, setNumberOfQuestions] = useState(5);

  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

async function handleGenerateQuiz() {

  setLoading(true);

    const requestBody = {
    topic,
    difficulty,
    number_of_questions: 10
};

    try {

       const response = await api.post("/webhook-test/generate-quiz", requestBody);



const quizId = response.data.quiz_id;






setLoading(false);
 navigate(`/quiz/${quizId}`);




    } catch (error) {
        setLoading(false);
        console.error(error);

    }

}
if (loading) {
    return <Loading />;
}

  return (
    <div>

      <label>Topic</label>

      <select
    value={topic}
    onChange={(event) => setTopic(event.target.value)}
>
    <option value="">Select Topic</option>
    <option value="Java">Java</option>
    <option value="Python">Python</option>
    <option value="SQL">SQL</option>
    <option value="JavaScript">JavaScript</option>
</select>

      <label>Difficulty</label>

      <select
  value={difficulty}
  onChange={(event) => setDifficulty(event.target.value)}
>
  <option>Easy</option>
  <option>Medium</option>
  <option>Hard</option>
</select>
      

      <button
    className="generate-btn"
    onClick={handleGenerateQuiz}
    disabled={loading}
>
    {loading ? "Generating..." : "Generate Quiz"}
</button>

      <hr />




    </div>
  );
}

export default QuizForm;