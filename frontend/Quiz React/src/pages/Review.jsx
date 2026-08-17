import { useLocation, useNavigate } from "react-router-dom";
import "../styles/review.css";

function Review() {

    const location = useLocation();
    const navigate = useNavigate();

    const questions = location.state?.questions || [];
    const selectedAnswers = location.state?.selectedAnswers || {};


    return (

        <div className="review-container">

            <div className="review-card">

                <h1 className="review-title">
                    📖 Review Answers
                </h1>

                <p className="review-subtitle">
                    Check your answers and learn from the explanations.
                </p>


                {questions.map((question, index) => {

                    const userAnswer = selectedAnswers[index];

                    const isCorrect =
                        userAnswer === question.correct_answer;


                    return (

                        <div
                            className="review-question"
                            key={question.id || index}
                        >

                            <h3>
                                {index + 1}. {question.question}
                            </h3>


                            {/* Result */}

                            <p
                                className={
                                    isCorrect
                                        ? "answer-status correct"
                                        : "answer-status wrong"
                                }
                            >

                                {isCorrect
                                    ? "✅ Correct"
                                    : "❌ Wrong"}

                            </p>


                            {/* User Answer */}

                            <div className="answer-box">

                                <strong>
                                    Your Answer:
                                </strong>

                                <p
                                    className={
                                        isCorrect
                                            ? "user-answer correct-text"
                                            : "user-answer wrong-text"
                                    }
                                >
                                    {userAnswer || "Not Answered"}
                                </p>

                            </div>


                            {/* Correct Answer */}

                            <div className="correct-box">

                                <strong>
                                    Correct Answer:
                                </strong>

                                <p className="correct-text">
                                    {question.correct_answer}
                                </p>

                            </div>


                            {/* Explanation */}

                            {question.explanation && (

                                <div className="explanation-box">

                                    <strong>
                                        💡 Explanation
                                    </strong>

                                    <p>
                                        {question.explanation}
                                    </p>

                                </div>

                            )}

                        </div>

                    );

                })}


                <button
                    className="back-home-btn"
                    onClick={() => navigate("/home")}
                >
                    ← Back to Home
                </button>

            </div>

        </div>

    );

}

export default Review;