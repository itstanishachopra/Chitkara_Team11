import React, { useEffect, useState } from "react";
import API from "../services/api";
import { useNavigate } from "react-router-dom";

export default function DocumentList() {
  const [documents, setDocuments] = useState([]);
  const [title, setTitle] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    fetchDocuments();
  }, []);

  const fetchDocuments = async () => {
    try {
      const { data } = await API.get("/documents");
      setDocuments(data);
    } catch (error) {
      alert("Failed to load documents");
    }
  };

  const createDocument = async () => {
    try {
      const { data } = await API.post("/documents", { title });
      navigate(`/editor/${data._id}`);
    } catch (error) {
      alert("Failed to create document");
    }
  };

  return (
    <div>
      <h2>Documents</h2>
      <input placeholder="New Document Title" onChange={(e) => setTitle(e.target.value)} />
      <button onClick={createDocument}>Create</button>

      <ul>
        {documents.map((doc) => (
          <li key={doc._id} onClick={() => navigate(`/editor/${doc._id}`)}>
            {doc.title}
          </li>
        ))}
      </ul>
    </div>
  );
}
