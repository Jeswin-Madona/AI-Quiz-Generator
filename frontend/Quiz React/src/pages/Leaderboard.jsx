import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../lib/supabase";
import "../styles/leaderboard.css";

function Leaderboard() {

    const navigate = useNavigate();

    const [leaders, setLeaders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {

        const fetchLeaderboard = async () => {

            try {

                const { data, error } = await supabase
                    .rpc("get_leaderboard");

                if (error) {
                    console.error(
                        "Leaderboard error:",
                        error
                    );

                    setError(
                        "Unable to load leaderboard."
                    );

                    return;
                }

                setLeaders(data || []);

            } catch (error) {

                console.error(
                    "Unexpected leaderboard error:",
                    error
                );

                setError(
                    "Something went wrong."
                );

            } finally {

                setLoading(false);

            }
        };

        fetchLeaderboard();

    }, []);

    if (loading) {

        return (
            <div className="leaderboard-container">

                <div className="leaderboard-card">

                    <h2>
                        Loading Leaderboard...
                    </h2>

                </div>

            </div>
        );
    }

    return (

        <div className="leaderboard-container">

            <div className="leaderboard-card">

                <div className="leaderboard-header">

                    <div>

                        <h1>
                            🏆 Leaderboard
                        </h1>

                        <p>
                            See how you rank among other quiz participants.
                        </p>

                    </div>

                    <button
                        className="back-btn"
                        onClick={() => navigate("/home")}
                    >
                        ← Back to Home
                    </button>

                </div>

                {error ? (

                    <div className="leaderboard-error">
                        {error}
                    </div>

                ) : leaders.length === 0 ? (

                    <div className="empty-leaderboard">

                        <h2>
                            📭 No Rankings Yet
                        </h2>

                        <p>
                            Complete a quiz to appear on the leaderboard.
                        </p>

                        <button
                            onClick={() => navigate("/home")}
                        >
                            Take a Quiz
                        </button>

                    </div>

                ) : (

                    <div className="leaderboard-list">

                        {leaders.map((leader, index) => {

                            const position = Number(leader.rank);

                            let rankDisplay = position;

                            if (position === 1) {
                                rankDisplay = "🥇";
                            } else if (position === 2) {
                                rankDisplay = "🥈";
                            } else if (position === 3) {
                                rankDisplay = "🥉";
                            }

                            return (

                                <div
                                    className={`leaderboard-row ${
                                        position <= 3
                                            ? "top-rank"
                                            : ""
                                    }`}
                                    key={leader.user_id}
                                >

                                    <div className="rank">
                                        {rankDisplay}
                                    </div>

                                    <div className="leader-user">

                                        <div className="user-avatar">
                                            {leader.full_name
                                                ?.charAt(0)
                                                .toUpperCase() || "U"}
                                        </div>

                                        <div>
                                            <strong>
                                                {leader.full_name}
                                            </strong>

                                            <span>
                                                {leader.quizzes_taken} quiz
                                                {leader.quizzes_taken !== 1
                                                    ? "zes"
                                                    : ""}
                                            </span>
                                        </div>

                                    </div>

                                    <div className="leader-stat">

                                        <span>
                                            Best Score
                                        </span>

                                        <strong>
                                            {leader.best_score}%
                                        </strong>

                                    </div>

                                    <div className="leader-stat">

                                        <span>
                                            Average
                                        </span>

                                        <strong>
                                            {leader.average_score}%
                                        </strong>

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

export default Leaderboard;