import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { supabase } from "../lib/supabase";
import { FcGoogle } from "react-icons/fc";
import { Eye, EyeOff, Lock, Mail } from "lucide-react";
import "../styles/login.css";

function Login() {
    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const [googleLoading, setGoogleLoading] = useState(false);

    const [error, setError] = useState("");
    const [message, setMessage] = useState("");

    // ==============================
    // EMAIL + PASSWORD LOGIN
    // ==============================

    const handleLogin = async (event) => {
        event.preventDefault();

        setError("");
        setMessage("");

        if (!email || !password) {
            setError("Please enter your email and password.");
            return;
        }

        setLoading(true);

        const { error } = await supabase.auth.signInWithPassword({
            email,
            password
        });

        if (error) {
            setError(error.message);
            setLoading(false);
            return;
        }

        setLoading(false);

        navigate("/home");
    };


    // ==============================
    // GOOGLE LOGIN
    // ==============================

    const handleGoogleLogin = async () => {
        setError("");
        setMessage("");
        setGoogleLoading(true);

        const { error } = await supabase.auth.signInWithOAuth({
            provider: "google",
            options: {
                redirectTo: `${window.location.origin}/home`
            }
        });

        if (error) {
            console.error("Google login error:", error);
            setError("Unable to sign in with Google. Please try again.");
            setGoogleLoading(false);
        }
    };


    // ==============================
    // FORGOT PASSWORD
    // ==============================

    const handleForgotPassword = async () => {
        setError("");
        setMessage("");

        if (!email) {
            setError("Please enter your email address first.");
            return;
        }

        const { error } = await supabase.auth.resetPasswordForEmail(
            email,
            {
                redirectTo: `${window.location.origin}/reset-password`
            }
        );

        if (error) {
            setError(error.message);
            return;
        }

        setMessage(
            "Password reset link has been sent to your email."
        );
    };


    return (
        <div className="login-page">

            <div className="login-card">

                {/* ==============================
                    LOGO
                ============================== */}

                <div className="login-logo">
                    🤖
                </div>


                {/* ==============================
                    HEADER
                ============================== */}

                <h1 className="login-title">
                    AI Quiz Generator
                </h1>

                <p className="login-subtitle">
                    Learn • Practice • Improve
                </p>


                {/* ==============================
                    LOGIN CONTENT
                ============================== */}

                <div className="login-content">

                    <h2>
                        Welcome Back 👋
                    </h2>

                    <p className="login-description">
                        Sign in to continue to your account
                    </p>


                    {/* ERROR */}

                    {error && (
                        <div className="login-error">
                            {error}
                        </div>
                    )}


                    {/* SUCCESS MESSAGE */}

                    {message && (
                        <div className="login-success">
                            {message}
                        </div>
                    )}


                    {/* ==============================
                        LOGIN FORM
                    ============================== */}

                    <form onSubmit={handleLogin}>

                        {/* EMAIL */}

                        <div className="input-group">

                            <label htmlFor="email">
                                Email address
                            </label>

                            <div className="input-wrapper">

                                <Mail className="input-icon" size={19} />

                                <input
                                    id="email"
                                    type="email"
                                    placeholder="Enter your email"
                                    value={email}
                                    onChange={(event) =>
                                        setEmail(event.target.value)
                                    }
                                    autoComplete="email"
                                />

                            </div>

                        </div>


                        {/* PASSWORD */}

                        <div className="input-group">

                            <div className="password-label">

                                <label htmlFor="password">
                                    Password
                                </label>

                            </div>


                            <div className="input-wrapper">

                                <Lock className="input-icon" size={19} />

                                <input
                                    id="password"
                                    type={
                                        showPassword
                                            ? "text"
                                            : "password"
                                    }
                                    placeholder="Enter your password"
                                    value={password}
                                    onChange={(event) =>
                                        setPassword(event.target.value)
                                    }
                                    autoComplete="current-password"
                                />


                                <button
                                    type="button"
                                    className="password-toggle"
                                    onClick={() =>
                                        setShowPassword(!showPassword)
                                    }
                                >
                                    {showPassword ? (
                                        <EyeOff size={19} />
                                    ) : (
                                        <Eye size={19} />
                                    )}
                                </button>

                            </div>

                        </div>


                        {/* FORGOT PASSWORD */}

                        <div className="forgot-container">

                            <button
                                type="button"
                                className="forgot-btn"
                                onClick={handleForgotPassword}
                            >
                                Forgot password?
                            </button>

                        </div>


                        {/* LOGIN BUTTON */}

                        <button
                            type="submit"
                            className="login-btn"
                            disabled={loading}
                        >
                            {loading
                                ? "Signing in..."
                                : "Sign In"}
                        </button>

                    </form>


                    {/* ==============================
                        DIVIDER
                    ============================== */}

                    <div className="divider">

                        <span></span>

                        <p>OR</p>

                        <span></span>

                    </div>


                    {/* ==============================
                        GOOGLE LOGIN
                    ============================== */}

                    <button
                        type="button"
                        className="google-login-btn"
                        onClick={handleGoogleLogin}
                        disabled={googleLoading}
                    >

                        <FcGoogle size={22} />

                        <span>
                            {googleLoading
                                ? "Connecting..."
                                : "Continue with Google"}
                        </span>

                    </button>


                    {/* ==============================
                        SIGN UP
                    ============================== */}

                    <p className="signup-text">

                        Don't have an account?

                        <Link to="/signup">
                            Sign Up
                        </Link>

                    </p>

                </div>


                {/* ==============================
                    FOOTER
                ============================== */}

                <p className="login-footer">
                    🔒 Your account and quiz progress are securely stored.
                </p>

            </div>

        </div>
    );
}

export default Login;