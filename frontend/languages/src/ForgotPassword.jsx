import React, { useState } from "react";

function ForgotPassword({ users, goToLogin }) {
  const [email, setEmail] = useState("");
  const [passwordResult, setPasswordResult] = useState("");

  const handleRecover = () => {
    if (!email) {
      alert("Please enter email");
      return;
    }

    // find user from stored user list
    const foundUser = users.find((u) => u.email === email);

    if (!foundUser) {
      alert("Email not found! Please enter registered email.");
      setPasswordResult("");
      return;
    }

    // show password
    setPasswordResult(foundUser.password);
  };

  return (
    <div className="form-container">
      <h2>Forgot Password</h2>

      <input
        type="email"
        placeholder="Enter Registered Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      /><br />

      <button onClick={handleRecover}>Recover Password</button>

      {passwordResult && (
        <p style={{ marginTop: "10px", color: "green", fontSize: "18px" }}>
          ✔ Your Password: <b>{passwordResult}</b>
        </p>
      )}

      <p>
        <button onClick={goToLogin}>Back to Login</button>
      </p>
    </div>
  );
}

export default ForgotPassword;
