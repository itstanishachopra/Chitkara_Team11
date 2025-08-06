import React from "react";
import "../App.css";

export default function AuthPage({ username, setUsername, handleLogin }) {
    return (
        <div className="auth-page">
            <h1>Welcome to <span className="brand">Locus</span></h1>
            <p>Enter your username to join the collaboration platform.</p>
            <input
                className="auth-input"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Enter username"
            />
            <button className="primary-btn" onClick={handleLogin}>
                Join
            </button>
        </div>
    );
}
