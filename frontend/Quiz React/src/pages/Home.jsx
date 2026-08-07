import "../styles/Home.css";
import QuizForm from "../components/QuizForm";
import { useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate();
  const username = localStorage.getItem("username");
  

  const handleLogout = () => {
    navigate("/login");
  };

  return (
    <div className="home">

      
        <h2>Welcome, {username} 👋</h2>
      <h1>🤖 AI Quiz Generator</h1>

      <p>Generate AI-powered quizzes.</p>

      <QuizForm />
      <button className="logout-btn" onClick={handleLogout}>
          Logout
        </button>

    </div>
  );
}

export default Home;