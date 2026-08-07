import { useLocation, useNavigate } from "react-router-dom";
import "../styles/result.css";

function Result() {

    const location = useLocation();
    const navigate = useNavigate();

    const score = location.state?.score || 0;
    const total = location.state?.total || 0;
    const questions = location.state?.questions || [];
    const selectedAnswers = location.state?.selectedAnswers || {};

    const percentage =
        total === 0 ? 0 : Math.round((score / total) * 100);
        const wrongAnswers = total - score;

        let performanceMessage = "";

if (percentage >= 90) {

    performanceMessage = "🌟 Excellent Work!";

}
else if (percentage >= 75) {

    performanceMessage = "👏 Great Job!";

}
else if (percentage >= 50) {

    performanceMessage = "👍 Good Effort!";

}
else {

    performanceMessage = "📚 Keep Practicing!";

}

    return (
        <div className="result-container">

            <div className="result-card">

                <h1>🎉 Quiz Completed</h1>

                
<div className="score-circle">
    <span>{score}/{total}</span>
</div>
<h3>
    ✅ Correct Answers : {score}
</h3>

<h3>
    ❌ Wrong Answers : {wrongAnswers}
</h3>

<h3>
    📊 Percentage : {percentage}%
</h3>
                <h2
    className={
        percentage >= 90
            ? "excellent"
            : percentage >= 75
            ? "great"
            : percentage >= 50
            ? "good"
            : "practice"
    }
>
    {performanceMessage}
</h2>
                <div className="result-buttons">

    <button
    onClick={() =>
        navigate("/review", {
            state: {
                questions,
                selectedAnswers
            }
        })
    }
>
    Review Answers
</button>

    <button
        onClick={() => navigate("/")}
    >
        Generate Another Quiz
    </button>

</div>

            </div>

        </div>
    );
}

export default Result;