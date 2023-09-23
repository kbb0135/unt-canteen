import React, { useState } from "react";
import "../style.css";
import { Link, useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword, getAuth } from "firebase/auth";
function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    // handle sign up logic
    const email = event.target[0].value;
    const password = event.target[1].value;

    const auth = getAuth();
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        navigate("/");
      })
      .catch((error) => {
        const errorMessage = error.message;
        setLoginError(errorMessage);
      });
  };

  return (
    <div className="auth-form">
      <span className="form-name">Log in to your account</span>
      {loginError !== "" && <span className="te-invalid"> {loginError}</span>}
      <form onSubmit={handleSubmit} className="flex-col">
        <div>
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            className="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            required
          />
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            className="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            required
          />
        </div>
        <button className="primary-button" type="submit">
          Log in
        </button>
      </form>
      <div className="flex-row jc-center te-size-14 te-color-gray-2">
        Don't have an account?
        <Link to="/auth/signup" className="te-size-14 te-color-primary-green-md">
          Sign Up
        </Link>
      </div>
    </div>
  );
}

export default Login;
