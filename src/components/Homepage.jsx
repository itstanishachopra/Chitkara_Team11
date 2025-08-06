
import React, { useState, useEffect } from "react";
import CollaborationPage from "./Collaborationpage";
import "../App.css";

export default function Homepage(props) {
    const [showCollab, setShowCollab] = useState(false);

    const handleStartCollab = () => {
        setShowCollab(true);
        if (props.onStartCollab) props.onStartCollab();
    };

    if (showCollab) {
        return <CollaborationPage currentUser="Guest" />;
    }

    return (
        <div className="homepage">
            <header className="hero">
                <h1>
                    <span className="brand">Locus</span> — Real-Time Collaboration
                </h1>
                <p>
                    Work together, chat, and create in real time.<br />
                    Seamless teamwork, wherever you are.
                </p>
                <button className="cta-btn" onClick={handleStartCollab}>
                    Start Collaborating
                </button>
            </header>
            <section className="features">
                <div className="feature">
                    <h3>📝 Shared Documents</h3>
                    <p>Edit documents together with instant updates.</p>
                </div>
                <div className="feature">
                    <h3>💬 Live Chat</h3>
                    <p>Communicate instantly with your team.</p>
                </div>
                <div className="feature">
                    <h3>👥 Presence</h3>
                    <p>See who’s online and collaborating with you.</p>
                </div>
            </section>
            <footer className="footer">
                &copy; {new Date().getFullYear()} Locus Collaboration Platform
            </footer>
        </div>
    );
}
