import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = () => {
    if (!email.includes("@")) {
      setError("Email pas valide");
      return;
    }

    console.log(password);
    

    if (!password) {
      setError("Mot de passe obligatoire");
      return;
    }

    setError("");      // نمسحو الخطأ إلا كان
    navigate("/");
  };

  return (
    <div>
      <h1>Login</h1>

      <input
        type="email"
        placeholder="Votre email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
        {error && <p className="error-message">{error}</p>}

      <input
        type="password"
        placeholder="Votre password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <button onClick={handleLogin}>Login</button>

    </div>
  );
}
