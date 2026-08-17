import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { supabase } from "../lib/supabase";
import "../styles/result.css";

function Result() {

    const location = useLocation();
    const navigate = useNavigate();

    const score = location.state?.score || 0;
    const total = location.state?.total || 0;
    const questions = location.state?.questions || [];
    const selectedAnswers = location.state?.selectedAnswers || {};

    const topic = location.state?.topic || "Unknown";
    const difficulty = location.state?.difficulty || "Unknown";

    const [saving, setSaving] = useState(true);
    const [saved, setSaved] = useState(false);

    const percentage =
        total === 0
            ? 0
            : Math.round((score / total) * 100);

    const wrongAnswers = total - score;

    let performanceMessage = "";

    if (percentage >= 90) {
        performanceMessage = "🌟 Excellent Work!";
    } else if (percentage >= 75) {
        performanceMessage = "👏 Great Job!";
    } else if (percentage >= 50) {
        performanceMessage = "👍 Good Effort!";
    } else {
        performanceMessage = "📚 Keep Practicing!";
    }


   useEffect(() => {

    if (saved) {
        return;
    }

    const saveQuizAttempt = async () => {

        try {

            const {
                data: { user },
                error: userError
            } = await supabase.auth.getUser();

            if (userError || !user) {

                console.error(
                    "User not found:",
                    userError
                );

                setSaving(false);
                return;
            }

            console.log("Quiz attempt data:");
            console.log("Topic:", topic);
            console.log("Difficulty:", difficulty);
            console.log("Score:", score);
            console.log("Total:", total);


            const { error } = await supabase
                .from("quiz_attempts")
                .insert({
                    user_id: user.id,
                    score: score,
                    total_questions: total,
                    topic: topic,
                    difficulty: difficulty
                });


            if (error) {

                console.error(
                    "Quiz attempt save error:",
                    error
                );

            } else {

                console.log(
                    "Quiz attempt saved successfully"
                );

                setSaved(true);
            }

        } catch (error) {

            console.error(
                "Unexpected error:",
                error
            );

        } finally {

            setSaving(false);
        }

    };

    saveQuizAttempt();

}, [score, total, topic, difficulty, saved]);

    return (

        <div className="result-container">

            <div className="result-card">

                <h1>
                    🎉 Quiz Completed
                </h1>


                <h2>
                    {performanceMessage}
                </h2>


                <p>
                    Topic: <strong>{topic}</strong>
                </p>


                <p>
                    Difficulty: <strong>{difficulty}</strong>
                </p>


                <div className="score-section">

                    <h2>
                        Score
                    </h2>

                    <h1>
                        {score} / {total}
                    </h1>

                    <p>
                        {percentage}%
                    </p>

                </div>


                <div className="result-summary">

                    <p>
                        ✅ Correct Answers: {score}
                    </p>

                    <p>
                        ❌ Wrong Answers: {wrongAnswers}
                    </p>

                </div>


                {saving && (
                    <p>
                        Saving your quiz result...
                    </p>
                )}


                {!saving && (
                    <p>
                        ✅ Quiz result saved
                    </p>
                )}


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
                    onClick={() => navigate("/home")}
                >
                    Generate Another Quiz
                </button>

            </div>

        </div>

    );
}

export default Result;