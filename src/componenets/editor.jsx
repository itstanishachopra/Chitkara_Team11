import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import API from "../services/api";
import socket from "../services/socket";

export default function Editor() {
  const { id } = useParams();
  const [content, setContent] = useState("");

  useEffect(() => {
    socket.connect();
    socket.emit("join-document", id);

    socket.on("document-changes", (newContent) => {
      setContent(newContent);
    });

    const fetchDocument = async () => {
      const { data } = await API.get(`/documents/${id}`);
      setContent(data.content);
    };
    fetchDocument();

    return () => {
      socket.disconnect();
    };
  }, [id]);

  const handleChange = (e) => {
    const updatedContent = e.target.value;
    setContent(updatedContent);
    socket.emit("edit-document", { docId: id, content: updatedContent });
  };

  const saveDocument = async () => {
    await API.put(`/documents/${id}`, { content });
    alert("Document saved");
  };

  return (
    <div>
      <h2>Document Editor</h2>
      <textarea value={content} onChange={handleChange} rows={20} cols={80} />
      <button onClick={saveDocument}>Save</button>
    </div>
  );
}
