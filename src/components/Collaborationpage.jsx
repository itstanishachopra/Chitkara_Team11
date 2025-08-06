// import React from "react";
// import "../App.css";

// export default function CollaborationPage({
//     users,
//     doc,
//     chat,
//     message,
//     username,
//     handleDocChange,
//     sendMessage,
//     setMessage,
// }) {
//     return (
//         <div className="collab-container">
//             <aside className="sidebar">
//                 <h3>Online Users</h3>
//                 <ul>
//                     {users.map((u) => (
//                         <li key={u}>{u}</li>
//                     ))}
//                 </ul>
//             </aside>
//             <main className="collab-main">
//                 <section className="doc-section">
//                     <h2>Shared Document</h2>
//                     <textarea
//                         value={doc}
//                         onChange={handleDocChange}
//                         rows={10}
//                     />
//                 </section>
//                 <section className="chat-section">
//                     <h2>Chat</h2>
//                     <div className="chat-box">
//                         {chat.map((msg, i) => (
//                             <div key={i} className={msg.user === username ? "my-message" : "other-message"}>
//                                 <b>{msg.user}:</b> {msg.text}
//                             </div>
//                         ))}
//                     </div>
//                     <div className="chat-input">
//                         <input
//                             value={message}
//                             onChange={(e) => setMessage(e.target.value)}
//                             placeholder="Type a message..."
//                             onKeyDown={(e) => e.key === "Enter" && sendMessage()}
//                         />
//                         <button className="send-btn" onClick={sendMessage}>Send</button>
//                     </div>
//                 </section>
//             </main>
//         </div>
//     );
// }


import React, { useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import { io } from 'socket.io-client';
import axios from 'axios';

const socket = io('http://localhost:5000');  // Adjust backend URL if needed

const CollaborationPage = () => {
    const { id } = useParams();
    const editorRef = useRef(null);
    const [content, setContent] = useState('');

    useEffect(() => {
        // Join the document room
        socket.emit('join', id);

        // Fetch initial document content from API
        axios.get(`http://localhost:5000/api/notes/${id}`)
            .then(res => {
                setContent(res.data.content);
            });

        // Listen for incoming changes
        const handleReceiveChanges = (data) => {
            if (editorRef.current) {
                editorRef.current.innerText = data;
            }
        };

        socket.on('receive-changes', handleReceiveChanges);

        // Cleanup function when component unmounts
        return () => {
            socket.off('receive-changes', handleReceiveChanges);
            socket.disconnect();
        };
    }, [id]);

    const handleInput = () => {
        const text = editorRef.current.innerText;
        socket.emit('send-changes', { noteId: id, content: text });

        // Save content to backend API
        axios.post(`http://localhost:5000/api/notes/${id}`, { content: text });
    };

    return (
        <div style={{ padding: 20 }}>
            <h2>Collaborative Note</h2>
            <div
                ref={editorRef}
                contentEditable
                onInput={handleInput}
                style={{
                    border: '1px solid #ccc',
                    minHeight: '300px',
                    padding: '10px',
                    whiteSpace: 'pre-wrap'
                }}
                suppressContentEditableWarning={true}
            >
                {content}
            </div>
        </div>
    );
};

export default CollaborationPage;
