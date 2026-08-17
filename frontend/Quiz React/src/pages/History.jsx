import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../lib/supabase";
import "../styles/history.css";

function History() {
      const navigate = useNavigate();
    const [attempts, setAttempts] = useState([]);
    const [loading, setLoading] = useState(true);

  

    useEffect(() => {
        const fetchHistory = async () => {
            const {
                data: { user },
                error: userError,
            } = await supabase.auth.getUser();

            if (userError || !user) {
                console.error("User not found:", userError);
                navigate("/login");
                return;
            }

            const { data, error } = await supabase
                .from("quiz_attempts")
                .select("*")
                .eq("user_id", user.id)
                .order("completed_at", { ascending: false });

            if (error) {
                console.error("History fetch error:", error);
            } else {
                setAttempts(data || []);
            }

            setLoading(false);
        };

        fetchHistory();
    }, [navigate]);

    if (loading) {
        return (
            <div className="history-container">
                <div className="history-card">
                    <h2>Loading Quiz History...</h2>
                </div>
            </div>
        );
    }

    return (
        <div className="history-container">

            <div className="history-card">

                <div className="history-header">

                    <div>
                        <h1>📚 Quiz History</h1>
                        <p>View your previous quiz attempts</p>
                    </div>

                    <button
                        className="back-btn"
                        onClick={() => navigate("/home")}
                    >
                        ← Back to Home
                    </button>

                </div>

                {attempts.length === 0 ? (

                    <div className="empty-history">
                        <h2>📭 No Quiz Attempts Yet</h2>
                        <p>
                            Generate your first quiz and your results
                            will appear here.
                        </p>

                        <button
                            onClick={() => navigate("/home")}
                        >
                            Generate Quiz
                        </button>
                    </div>

                ) : (

                    <div className="history-list">

                        {attempts.map((attempt) => {

                            const percentage =
                                attempt.total_questions === 0
                                    ? 0
                                    : Math.round(
                                        (attempt.score /
                                            attempt.total_questions) *
                                        100
                                    );

                            return (
                                <div
                                    className="history-item"
                                    key={attempt.id}
                                >

                                    <div className="quiz-info">

                                        <h3>
                                            {attempt.topic}
                                        </h3>

                                        <span>
                                            {attempt.difficulty}
                                        </span>

                                    </div>

                                    <div className="quiz-score">

                                        <strong>
                                            {attempt.score}/
                                            {attempt.total_questions}
                                        </strong>

                                        <p>
                                            {percentage}%
                                        </p>

                                    </div>

                                    <div className="quiz-date">

                                        {attempt.completed_at
                                            ? new Date(
                                                attempt.completed_at
                                            ).toLocaleDateString()
                                            : "Date unavailable"}

                                    </div>

                                </div>
                            );
                        })}

                    </div>

                )}

            </div>

        </div>
    );
}

export default History;