import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { supabase } from "../lib/supabase";
import { FcGoogle } from "react-icons/fc";
import { Eye, EyeOff, Lock, Mail, User } from "lucide-react";
import "../styles/signup.css";

function Signup() {
    const navigate = useNavigate();

    const [fullName, setFullName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const [loading, setLoading] = useState(false);
    const [googleLoading, setGoogleLoading] = useState(false);

    const [error, setError] = useState("");
    const [message, setMessage] = useState("");

    const handleSignup = async (event) => {
        event.preventDefault();

        setError("");
        setMessage("");

        if (!fullName || !email || !password || !confirmPassword) {
            setError("Please fill in all fields.");
            return;
        }

        if (password.length < 6) {
            setError("Password must contain at least 6 characters.");
            return;
        }

        if (password !== confirmPassword) {
            setError("Passwords do not match.");
            return;
        }

        setLoading(true);

        const { data, error } = await supabase.auth.signUp({
            email,
            password,
            options: {
                data: {
                    full_name: fullName
                }
            }
        });

        if (error) {
            console.error("Signup error:", error);
            setError(error.message);
            setLoading(false);
            return;
        }

        setLoading(false);

        // If email confirmation is enabled in Supabase
        if (data.user && !data.session) {
            setMessage(
                "Account created successfully! Please check your email to verify your account."
            );
            return;
        }

        // If email confirmation is disabled
        navigate("/home");
    };


    const handleGoogleSignup = async () => {
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
            console.error("Google signup error:", error);
            setError("Unable to continue with Google. Please try again.");
            setGoogleLoading(false);
        }
    };


    return (
        <div className="signup-page">

            <div className="signup-card">

                {/* Logo */}

                <div className="signup-logo">
                    🤖
                </div>


                {/* Header */}

                <h1 className="signup-title">
                    AI Quiz Generator
                </h1>

                <p className="signup-subtitle">
                    Learn • Practice • Improve
                </p>


                <div className="signup-content">

                    <h2>
                        Create Your Account 🚀
                    </h2>

                    <p className="signup-description">
                        Sign up to start creating and tracking your quizzes.
                    </p>


                    {/* Error */}

                    {error && (
                        <div className="signup-error">
                            {error}
                        </div>
                    )}


                    {/* Success */}

                    {message && (
                        <div className="signup-success">
                            {message}
                        </div>
                    )}


                    {/* Signup Form */}

                    <form onSubmit={handleSignup}>

                        {/* Full Name */}

                        <div className="input-group">

                            <label htmlFor="fullName">
                                Full name
                            </label>

                            <div className="input-wrapper">

                                <User
                                    className="input-icon"
                                    size={19}
                                />

                                <input
                                    id="fullName"
                                    type="text"
                                    placeholder="Enter your full name"
                                    value={fullName}
                                    onChange={(event) =>
                                        setFullName(event.target.value)
                                    }
                                    autoComplete="name"
                                />

                            </div>

                        </div>


                        {/* Email */}

                        <div className="input-group">

                            <label htmlFor="email">
                                Email address
                            </label>

                            <div className="input-wrapper">

                                <Mail
                                    className="input-icon"
                                    size={19}
                                />

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


                        {/* Password */}

                        <div className="input-group">

                            <label htmlFor="password">
                                Password
                            </label>

                            <div className="input-wrapper">

                                <Lock
                                    className="input-icon"
                                    size={19}
                                />

                                <input
                                    id="password"
                                    type={
                                        showPassword
                                            ? "text"
                                            : "password"
                                    }
                                    placeholder="Create a password"
                                    value={password}
                                    onChange={(event) =>
                                        setPassword(event.target.value)
                                    }
                                    autoComplete="new-password"
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


                        {/* Confirm Password */}

                        <div className="input-group">

                            <label htmlFor="confirmPassword">
                                Confirm password
                            </label>

                            <div className="input-wrapper">

                                <Lock
                                    className="input-icon"
                                    size={19}
                                />

                                <input
                                    id="confirmPassword"
                                    type={
                                        showConfirmPassword
                                            ? "text"
                                            : "password"
                                    }
                                    placeholder="Confirm your password"
                                    value={confirmPassword}
                                    onChange={(event) =>
                                        setConfirmPassword(
                                            event.target.value
                                        )
                                    }
                                    autoComplete="new-password"
                                />

                                <button
                                    type="button"
                                    className="password-toggle"
                                    onClick={() =>
                                        setShowConfirmPassword(
                                            !showConfirmPassword
                                        )
                                    }
                                >
                                    {showConfirmPassword ? (
                                        <EyeOff size={19} />
                                    ) : (
                                        <Eye size={19} />
                                    )}
                                </button>

                            </div>

                        </div>


                        {/* Create Account */}

                        <button
                            type="submit"
                            className="signup-btn"
                            disabled={loading}
                        >
                            {loading
                                ? "Creating Account..."
                                : "Create Account"}
                        </button>

                    </form>


                    {/* Divider */}

                    <div className="divider">

                        <span></span>

                        <p>OR</p>

                        <span></span>

                    </div>


                    {/* Google */}

                    <button
                        type="button"
                        className="google-signup-btn"
                        onClick={handleGoogleSignup}
                        disabled={googleLoading}
                    >

                        <FcGoogle size={22} />

                        <span>
                            {googleLoading
                                ? "Connecting..."
                                : "Continue with Google"}
                        </span>

                    </button>


                    {/* Login */}

                    <p className="login-text">

                        Already have an account?

                        <Link to="/login">
                            Sign In
                        </Link>

                    </p>

                </div>


                <p className="signup-footer">
                    🔒 Your account and quiz progress are securely stored.
                </p>

            </div>

        </div>
    );
}

export default Signup;