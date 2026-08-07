import { Routes, Route, Navigate } from "react-router-dom";

import Home from "./pages/Home";
import Quiz from "./pages/Quiz";
import Result from "./pages/Result";
import Review from "./pages/Review";
import Login from "./pages/Login";


function App() {
  return (
    <Routes>

  <Route path="/" element={<Navigate to="/login" />} />

  <Route path="/login" element={<Login />} />

  <Route path="/home" element={<Home />} />

  <Route path="/quiz/:quizId" element={<Quiz />} />

  <Route path="/result" element={<Result />} />

  <Route path="/review" element={<Review />} />

</Routes>
  );
}

export default App;