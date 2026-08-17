import { Routes, Route, Navigate } from "react-router-dom";

import Home from "./pages/Home";
import Quiz from "./pages/Quiz";
import Result from "./pages/Result";
import Review from "./pages/Review";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import History from "./pages/History";
import Leaderboard from "./pages/Leaderboard";
import Analytics from "./pages/Analytics";

import ProtectedRoute from "./components/ProtectedRoute";


function App() {
    return (
        <Routes>

            {/* =========================
                PUBLIC ROUTES
            ========================= */}

            <Route
                path="/"
                element={<Navigate to="/login" replace />}
            />

            <Route
                path="/login"
                element={<Login />}
            />

            <Route
                path="/signup"
                element={<Signup />}
            />


            {/* =========================
                PROTECTED ROUTES
            ========================= */}

            <Route
                path="/home"
                element={
                    <ProtectedRoute>
                        <Home />
                    </ProtectedRoute>
                }
            />

            <Route
                path="/quiz/:quizId"
                element={
                    <ProtectedRoute>
                        <Quiz />
                    </ProtectedRoute>
                }
            />

            <Route
                path="/result"
                element={
                    <ProtectedRoute>
                        <Result />
                    </ProtectedRoute>
                }
            />

            <Route
                path="/review"
                element={
                    <ProtectedRoute>
                        <Review />
                    </ProtectedRoute>
                }
            />

            <Route
                path="/history"
                element={
                    <ProtectedRoute>
                        <History />
                    </ProtectedRoute>
                }
            />

            <Route
                path="/leaderboard"
                element={
                    <ProtectedRoute>
                        <Leaderboard />
                    </ProtectedRoute>
                }
            />

            <Route
                path="/analytics"
                element={
                    <ProtectedRoute>
                        <Analytics />
                    </ProtectedRoute>
                }
            />

        </Routes>
    );
}


export default App;