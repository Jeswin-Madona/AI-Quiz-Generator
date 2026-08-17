import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../lib/supabase";
import QuizForm from "../components/QuizForm";
import "../styles/home.css";

function Home() {

    const navigate = useNavigate();

    const [username, setUsername] = useState("");

    const [stats, setStats] = useState({
        totalQuizzes: 0,
        averageScore: 0,
        bestScore: 0
    });


    // Fetch quiz statistics
    const fetchStats = async (userId) => {

        const { data, error } = await supabase
            .from("quiz_attempts")
            .select("score, total_questions")
            .eq("user_id", userId);


        if (error) {

            console.error(
                "Stats fetch error:",
                error
            );

            return;
        }


        // No quiz attempts yet
        if (!data || data.length === 0) {

            setStats({
                totalQuizzes: 0,
                averageScore: 0,
                bestScore: 0
            });

            return;
        }


        // Calculate percentage for every quiz
        const percentages = data.map((attempt) => {

            if (!attempt.total_questions) {
                return 0;
            }

            return (
                (attempt.score /
                    attempt.total_questions) *
                100
            );

        });


        // Total quizzes
        const totalQuizzes = data.length;


        // Average percentage
        const averageScore = Math.round(
            percentages.reduce(
                (sum, score) => sum + score,
                0
            ) / percentages.length
        );


        // Highest percentage
        const bestScore = Math.round(
            Math.max(...percentages)
        );


        setStats({
            totalQuizzes,
            averageScore,
            bestScore
        });

    };


    // Get logged-in user
    useEffect(() => {

        const getUser = async () => {

            try {

                const {
                    data,
                    error
                } = await supabase.auth.getUser();


                // User is not logged in
                if (error || !data.user) {

                    navigate("/login");
                    return;

                }


                const user = data.user;


                // Get user's name
                const name =
                    user.user_metadata?.full_name ||
                    user.user_metadata?.name ||
                    user.email;


                setUsername(name);


                // Fetch quiz statistics
                await fetchStats(user.id);


                // Create or update student profile
                const {
                    error: profileError
                } = await supabase
                    .from("profiles")
                    .upsert({

                        id: user.id,

                        full_name: name,

                        email: user.email

                    });


                if (profileError) {

                    console.error(
                        "Profile creation error:",
                        profileError
                    );

                }

            } catch (error) {

                console.error(
                    "Home page error:",
                    error
                );

            }

        };


        getUser();

    }, [navigate]);


    // Logout
    const handleLogout = async () => {

        await supabase.auth.signOut();

        navigate("/login");

    };


    return (

        <div className="home-container">


            {/* Logout */}

            <button
                className="logout-btn"
                onClick={handleLogout}
            >
                Logout
            </button>


            <div className="home-card">


                {/* History */}

                <button
                    className="history-btn"
                    onClick={() => navigate("/history")}
                >
                    📚 Quiz History
                </button>

                <button
      className="leaderboard-btn"
       onClick={() => navigate("/leaderboard")}
>
      🏆 Leaderboard
</button>
<button
    className="analytics-btn"
    onClick={() => navigate("/analytics")}
>
    📊 Analytics
</button>


                {/* Welcome */}

                <div className="welcome-section">

                    <h2>
                        Welcome, {username} 👋
                    </h2>

                    <p>
                        Track your quiz performance
                        and keep improving.
                    </p>

                </div>


                {/* Statistics */}

                <div className="stats-container">


                    {/* Total quizzes */}

                    <div className="stat-card">

                        <div className="stat-icon">
                            📝
                        </div>

                        <div className="stat-info">

                            <span>
                                Quizzes Taken
                            </span>

                            <strong>
                                {stats.totalQuizzes}
                            </strong>

                        </div>

                    </div>


                    {/* Average score */}

                    <div className="stat-card">

                        <div className="stat-icon">
                            📊
                        </div>

                        <div className="stat-info">

                            <span>
                                Average Score
                            </span>

                            <strong>
                                {stats.averageScore}%
                            </strong>

                        </div>

                    </div>


                    {/* Best score */}

                    <div className="stat-card">

                        <div className="stat-icon">
                            🏆
                        </div>

                        <div className="stat-info">

                            <span>
                                Best Score
                            </span>

                            <strong>
                                {stats.bestScore}%
                            </strong>

                        </div>

                    </div>


                </div>


                {/* Quiz Generator */}

                <div className="generator-section">

                    <h1>
                        🤖 AI Quiz Generator
                    </h1>

                    <p>
                        Generate AI-powered quizzes.
                    </p>

                    <QuizForm />

                </div>


            </div>

        </div>

    );

}

export default Home;