import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getQuizQuestions } from "../services/quizService";
import "../styles/quiz.css";

function Quiz() {

    const [questions, setQuestions] = useState([]);
    const [quizInfo, setQuizInfo] = useState({});
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [selectedAnswers, setSelectedAnswers] = useState({});
    const [quizSubmitted, setQuizSubmitted] = useState(false);

    const { quizId } = useParams();
    const navigate = useNavigate();

    const fetchQuestions = async () => {

        try {

            // Check whether quizId exists
            if (!quizId) {
                console.error("Quiz ID is missing from URL");
                return;
            }

            console.log("Fetching quiz with ID:", quizId);

            const data = await getQuizQuestions(quizId);

            setQuestions(data.questions || []);
            setQuizInfo(data.quiz || {});

        } catch (error) {

            console.error("Error fetching quiz questions:", error);

        }
    };

    useEffect(() => {
        fetchQuestions();
    }, [quizId]);


    const handleAnswerSelect = (answer) => {

        setSelectedAnswers((previousAnswers) => ({
            ...previousAnswers,
            [currentQuestion]: answer
        }));

    };


    const handleSubmitQuiz = () => {

        let score = 0;

        questions.forEach((question, index) => {

            if (selectedAnswers[index] === question.correct_answer) {
                score++;
            }

        });

        setQuizSubmitted(true);

        navigate("/result", {
            state: {
                score,
                total: questions.length,
                questions,
                selectedAnswers,
                topic: quizInfo.topic,
                difficulty: quizInfo.difficulty
            }
        });

    };


    const question = questions[currentQuestion];


    const getOptionClass = (option) => {

        if (!quizSubmitted) {

            return selectedAnswers[currentQuestion] === option
                ? "option-btn selected"
                : "option-btn";

        }

        return "option-btn";

    };


    return (
        <div className="quiz-container">

            {question && (

                <div className="quiz-card">

                    <h1 className="quiz-title">
                        AI Quiz
                    </h1>


                    <div className="quiz-progress-header">

                        <div className="question-count">
                            Question {currentQuestion + 1} of {questions.length}
                        </div>

                        <div className="progress-percentage">
                            {Math.round(
                                ((currentQuestion + 1) / questions.length) * 100
                            )}%
                        </div>

                    </div>


                    <div className="progress-bar-container">

                        <div
                            className="progress-bar"
                            style={{
                                width: `${
                                    ((currentQuestion + 1) / questions.length) * 100
                                }%`
                            }}
                        ></div>

                    </div>


                    <div className="question-number">
                        Question {currentQuestion + 1}
                    </div>


                    <h2 className="question">
                        {question.question}
                    </h2>


                    <button
                        className={getOptionClass(question.option_a)}
                        disabled={quizSubmitted}
                        onClick={() => handleAnswerSelect(question.option_a)}
                    >
                        {question.option_a}
                    </button>


                    <button
                        className={getOptionClass(question.option_b)}
                        disabled={quizSubmitted}
                        onClick={() => handleAnswerSelect(question.option_b)}
                    >
                        {question.option_b}
                    </button>


                    <button
                        className={getOptionClass(question.option_c)}
                        disabled={quizSubmitted}
                        onClick={() => handleAnswerSelect(question.option_c)}
                    >
                        {question.option_c}
                    </button>


                    <button
                        className={getOptionClass(question.option_d)}
                        disabled={quizSubmitted}
                        onClick={() => handleAnswerSelect(question.option_d)}
                    >
                        {question.option_d}
                    </button>


                    <div className="navigation">

                        <button
                            className="nav-btn"
                            disabled={currentQuestion === 0}
                            onClick={() =>
                                setCurrentQuestion(currentQuestion - 1)
                            }
                        >
                            Previous
                        </button>


                        {currentQuestion === questions.length - 1 ? (

                            <button
                                className="nav-btn"
                                onClick={handleSubmitQuiz}
                            >
                                Submit Quiz
                            </button>

                        ) : (

                            <button
                                className="nav-btn"
                                onClick={() =>
                                    setCurrentQuestion(currentQuestion + 1)
                                }
                            >
                                Next
                            </button>

                        )}

                    </div>

                </div>

            )}

        </div>
    );
}

export default Quiz;