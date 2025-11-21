import { useNavigate, Link } from 'react-router-dom';
import './Login.css';

export default function Login() {
  const navigate = useNavigate();

  const handleLogin = () => {
    navigate('/movies');
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h1 className="login-title">Chill Streaming</h1>
        <button onClick={handleLogin} className="login-button">
          Login
        </button>
        <p className="login-link">
          Don't have an account? <Link to="/register">Register</Link>
        </p>
      </div>
    </div>
  );
}

