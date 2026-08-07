import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/login.css";

function Login() {

    const navigate = useNavigate();

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");

    function handleLogin() {

        if (!name || !email) {
            alert("Please fill all fields");
            return;
        }

        localStorage.setItem("username", name);
        localStorage.setItem("email", email);

        navigate("/home");
    }

    return (
        <div className="login-container">

            <div className="login-card">

                <h1>AI Quiz Generator</h1>

                <p>Welcome Back 👋</p>

                <input
                    type="text"
                    placeholder="Enter your Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />

                <input
                    type="email"
                    placeholder="Enter your Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />

                <button onClick={handleLogin}>
                    Start Quiz
                </button>

            </div>

        </div>
    );
}

export default Login;