import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../lib/supabase";
import "../styles/analytics.css";

function Analytics() {

    const navigate = useNavigate();

    const [attempts, setAttempts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {

        const fetchAnalytics = async () => {

            try {

                const {
                    data: { user },
                    error: userError
                } = await supabase.auth.getUser();

                if (userError || !user) {
                    navigate("/login");
                    return;
                }

                const { data, error } = await supabase
                    .from("quiz_attempts")
                    .select(
                        "score, total_questions, topic, difficulty, completed_at"
                    )
                    .eq("user_id", user.id)
                    .order("completed_at", {
                        ascending: true
                    });

                if (error) {

                    console.error(
                        "Analytics fetch error:",
                        error
                    );

                    return;
                }

                setAttempts(data || []);

            } catch (error) {

                console.error(
                    "Unexpected analytics error:",
                    error
                );

            } finally {

                setLoading(false);

            }
        };

        fetchAnalytics();

    }, [navigate]);


    if (loading) {

        return (
            <div className="analytics-container">

                <div className="analytics-card">

                    <h2>
                        Loading Performance Analytics...
                    </h2>

                </div>

            </div>
        );
    }


    /*
     * Calculate overall statistics
     */

    const percentages = attempts.map((attempt) => {

        if (!attempt.total_questions) {
            return 0;
        }

        return Math.round(
            (attempt.score / attempt.total_questions) * 100
        );

    });


    const totalQuizzes = attempts.length;


    const averageScore =
        percentages.length > 0
            ? Math.round(
                percentages.reduce(
                    (sum, value) => sum + value,
                    0
                ) / percentages.length
            )
            : 0;


    const bestScore =
        percentages.length > 0
            ? Math.max(...percentages)
            : 0;


    /*
     * Calculate topic performance
     */

    const topicData = {};

    attempts.forEach((attempt) => {

        if (!topicData[attempt.topic]) {

            topicData[attempt.topic] = {
                total: 0,
                count: 0
            };

        }

        const percentage =
            attempt.total_questions > 0
                ? (attempt.score / attempt.total_questions) * 100
                : 0;

        topicData[attempt.topic].total += percentage;
        topicData[attempt.topic].count++;

    });


    const topicPerformance = Object.entries(
        topicData
    ).map(([topic, data]) => {

        return {
            topic,
            average: Math.round(
                data.total / data.count
            )
        };

    });


    return (

        <div className="analytics-container">

            <div className="analytics-card">

                {/* Header */}

                <div className="analytics-header">

                    <div>

                        <h1>
                            📊 Performance Analytics
                        </h1>

                        <p>
                            Track your quiz performance and
                            identify areas for improvement.
                        </p>

                    </div>

                    <button
                        className="back-btn"
                        onClick={() => navigate("/home")}
                    >
                        ← Back to Home
                    </button>

                </div>


                {/* Overall Statistics */}

                <div className="analytics-stats">

                    <div className="analytics-stat-card">

                        <span>
                            📝 Quizzes Taken
                        </span>

                        <strong>
                            {totalQuizzes}
                        </strong>

                    </div>


                    <div className="analytics-stat-card">

                        <span>
                            📊 Average Score
                        </span>

                        <strong>
                            {averageScore}%
                        </strong>

                    </div>


                    <div className="analytics-stat-card">

                        <span>
                            🏆 Best Score
                        </span>

                        <strong>
                            {bestScore}%
                        </strong>

                    </div>

                </div>


                {/* Topic Performance */}

                <div className="analytics-section">

                    <h2>
                        📚 Performance by Topic
                    </h2>


                    {topicPerformance.length === 0 ? (

                        <div className="empty-analytics">

                            <h3>
                                📭 No Quiz Data Yet
                            </h3>

                            <p>
                                Complete a quiz to see your
                                performance analytics.
                            </p>

                            <button
                                onClick={() =>
                                    navigate("/home")
                                }
                            >
                                Take a Quiz
                            </button>

                        </div>

                    ) : (

                        <div className="topic-list">

                            {topicPerformance.map((item) => (

                                <div
                                    className="topic-row"
                                    key={item.topic}
                                >

                                    <div className="topic-name">
                                        <strong>
                                            {item.topic}
                                        </strong>
                                    </div>


                                    <div className="progress-container">

                                        <div
                                            className="progress-bar"
                                            style={{
                                                width:
                                                    `${item.average}%`
                                            }}
                                        />

                                    </div>


                                    <div className="topic-score">
                                        {item.average}%
                                    </div>

                                </div>

                            ))}

                        </div>

                    )}

                </div>


                {/* Recent Attempts */}

                {attempts.length > 0 && (

                    <div className="analytics-section">

                        <h2>
                            📈 Recent Performance
                        </h2>

                        <div className="recent-attempts">

                            {attempts
                                .slice(-5)
                                .reverse()
                                .map((attempt, index) => {

                                    const percentage =
                                        attempt.total_questions > 0
                                            ? Math.round(
                                                (
                                                    attempt.score /
                                                    attempt.total_questions
                                                ) * 100
                                            )
                                            : 0;

                                    return (

                                        <div
                                            className="recent-item"
                                            key={`${attempt.completed_at}-${index}`}
                                        >

                                            <div>
                                                <strong>
                                                    {attempt.topic}
                                                </strong>

                                                <span>
                                                    {attempt.difficulty}
                                                </span>
                                            </div>

                                            <strong>
                                                {percentage}%
                                            </strong>

                                        </div>

                                    );

                                })}

                        </div>

                    </div>

                )}

            </div>

        </div>
    );
}

export default Analytics;