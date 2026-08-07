import { useLocation, useNavigate } from "react-router-dom";

function Review() {

    const location = useLocation();
    const navigate = useNavigate();

    const questions = location.state?.questions || [];
    const selectedAnswers = location.state?.selectedAnswers || {};

   return (

    <div className="quiz-container">

        <div className="quiz-card">

            <h1 className="quiz-title">
                Review Answers
            </h1>

            {questions.map((question, index) => (
                 
                <div
                    key={question.id}
                    style={{
                        marginBottom: "35px",
                        borderBottom: "1px solid #ddd",
                        paddingBottom: "20px"
                    }}
                >

                    <h3>
                        {index + 1}. {question.question}
                    </h3>

                    <p
                        style={{
                            color:
                                selectedAnswers[index] === question.correct_answer
                                    ? "green"
                                    : "red",
                            fontWeight: "bold",
                            fontSize: "18px"
                        }}
>
                        {selectedAnswers[index] === question.correct_answer
                            ? "✅ Correct"
                            : "❌ Wrong"}
                    </p>

                    <p
                        style={{
                            color:
                                selectedAnswers[index] === question.correct_answer
                                    ? "green"
                                    : "red",
                            fontWeight: "bold"
                        }}
>
                        <strong>Your Answer: </strong>

                        {selectedAnswers[index] || "Not Answered"}

                    </p>

                    <p
                        style={{
                            color: "green",
                            fontWeight: "bold"
                        }}
>
                        <strong>Correct Answer: </strong>

                        {question.correct_answer}

                    </p>

                </div>

            ))}

            <button
                className="nav-btn"
                onClick={() => navigate("/")}
            >
                Back Home
            </button>

        </div>

    </div>

);

}

export default Review;