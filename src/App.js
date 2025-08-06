
// import React, { useState, useEffect } from "react";
// import "./App.css";

// export default function App({
//   initialUsers = [],
//   initialDoc = "Welcome to the shared document!",
//   initialChat = [],
//   currentUser = "Guest",
//   onSendMessage,
//   onDocChange,
//   onStartCollab,
// }) {
//   const [showCollab, setShowCollab] = useState(false);
//   const [users, setUsers] = useState(initialUsers);
//   const [chat, setChat] = useState(initialChat);
//   const [message, setMessage] = useState("");
//   const [doc, setDoc] = useState(initialDoc);

//   // Example: Fetch users, doc, chat from API or subscribe to sockets
//   useEffect(() => {
//     setUsers(initialUsers);
//     setChat(initialChat);
//     setDoc(initialDoc);
//   }, [initialUsers, initialChat, initialDoc]);

//   const handleStartCollab = () => {
//     setShowCollab(true);
//     if (onStartCollab) onStartCollab();
//   };

//   const handleDocChange = (e) => {
//     setDoc(e.target.value);
//     if (onDocChange) onDocChange(e.target.value);
//   };

//   const sendMessage = () => {
//     if (message.trim()) {
//       const msg = { user: currentUser, text: message };
//       setChat([...chat, msg]);
//       if (onSendMessage) onSendMessage(msg);
//       setMessage("");
//     }
//   };

//   if (!showCollab) {
//     return (
//       <div className="homepage">
//         <header className="hero">
//           <h1>
//             <span className="brand">Locus</span> — Real-Time Collaboration
//           </h1>
//           <p>
//             Work together, chat, and create in real time.<br />
//             Seamless teamwork, wherever you are.
//           </p>
//           <button className="cta-btn" onClick={handleStartCollab}>
//             Start Collaborating
//           </button>
//         </header>
//         <section className="features">
//           <div className="feature">
//             <h3>📝 Shared Documents</h3>
//             <p>Edit documents together with instant updates.</p>
//           </div>
//           <div className="feature">
//             <h3>💬 Live Chat</h3>
//             <p>Communicate instantly with your team.</p>
//           </div>
//           <div className="feature">
//             <h3>👥 Presence</h3>
//             <p>See who’s online and collaborating with you.</p>
//           </div>
//         </section>
//         <footer className="footer">
//           &copy; {new Date().getFullYear()} Locus Collaboration Platform
//         </footer>
//       </div>
//     );
//   }

//   return (
//     <div className="container">
//       <aside className="sidebar">
//         <h3>Online Users</h3>
//         <ul>
//           {users.map((u) => (
//             <li key={u}>{u}</li>
//           ))}
//         </ul>
//       </aside>
//       <main className="main">
//         <section className="doc-section">
//           <h2>Shared Document</h2>
//           <textarea
//             value={doc}
//             onChange={handleDocChange}
//             rows={10}
//           />
//         </section>
//         <section className="chat-section">
//           <h2>Chat</h2>
//           <div className="chat-box">
//             {chat.map((msg, i) => (
//               <div key={i}>
//                 <b>{msg.user}:</b> {msg.text}
//               </div>
//             ))}
//           </div>
//           <div className="chat-input">
//             <input
//               value={message}
//               onChange={(e) => setMessage(e.target.value)}
//               placeholder="Type a message..."
//               onKeyDown={(e) => e.key === "Enter" && sendMessage()}
//             />
//             <button onClick={sendMessage}>Send</button>
//           </div>
//         </section>
//       </main>
//     </div>
//   );
// }
import React from "react";
import Homepage from "./components/Homepage";
import AuthPage from "./components/AuthPage";
import "./App.css";

export default function App() {
  return (
    <div>
      <Homepage />
      <AuthPage />
    </div>
  );
}

