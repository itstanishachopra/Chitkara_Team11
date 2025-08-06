// src/components/CollaborationPage.jsx
import React, { useEffect, useRef, useState } from 'react';
import { io } from 'socket.io-client';

const socket = io('http://localhost:5000'); // Adjust backend URL if needed

export default function CollaborationPage({ currentUser = "Guest" }) {
    const [content, setContent] = useState("");
    const [chat, setChat] = useState([]);
    const [message, setMessage] = useState("");
    const editorRef = useRef(null);

    useEffect(() => {
        socket.on('receive-doc', (data) => {
            setContent(data);
        });

        socket.on('receive-chat', (msg) => {
            setChat(prev => [...prev, msg]);
        });

        return () => socket.disconnect();
    }, []);

    const handleDocChange = (e) => {
        setContent(e.target.value);
        socket.emit('send-doc', e.target.value);
    };

    const sendMessage = () => {
        if (message.trim()) {
            const msg = { user: currentUser, text: message };
            socket.emit('send-chat', msg);
            setChat([...chat, msg]);
            setMessage("");
        }
    };

    return (
        <div className="container">
            <section className="doc-section">
                <h2>Shared Document</h2>
                <textarea
                    ref={editorRef}
                    value={content}
                    onChange={handleDocChange}
                    rows={10}
                />
            </section>
            <section className="chat-section">
                <h2>Live Chat</h2>
                <div className="chat-box">
                    {chat.map((msg, i) => (
                        <div key={i}>
                            <b>{msg.user}:</b> {msg.text}
                        </div>
                    ))}
                </div>
                <div className="chat-input">
                    <input
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        placeholder="Type a message..."
                        onKeyDown={(e) => e.key === "Enter" && sendMessage()}
                    />
                    <button onClick={sendMessage}>Send</button>
                </div>
            </section>
        </div>
    );
}
