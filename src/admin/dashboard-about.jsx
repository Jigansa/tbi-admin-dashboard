import React, { useEffect, useState } from "react";
import { db } from "../firebase";
import {
  collection,
  addDoc,
  getDocs,
  updateDoc,
  deleteDoc,
  doc,
} from "firebase/firestore";

const Dashboard = () => {
  const [team, setTeam] = useState([]);
  const [editing, setEditing] = useState(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ type: "", text: "" });
  const [form, setForm] = useState({
    name: "",
    title: "",
    gmail: "",
    linkedin: "",
  });

  /* =============================
     FETCH TEAM FROM FIRESTORE
     ============================= */
  useEffect(() => {
    const fetchTeam = async () => {
      try {
        const snapshot = await getDocs(collection(db, "coreteam"));
        const data = snapshot.docs.map((d) => ({
          id: d.id,
          ...d.data(),
        }));
        setTeam(data);
      } catch (err) {
        console.error("Dashboard error: Failed to fetch team", err);
      }
    };
    fetchTeam();
  }, []);


  /* =============================
     CREATE / UPDATE
     ============================= */
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage({ type: "", text: "" });

    try {
      // Validate required fields
      if (!form.name.trim() || !form.title.trim() || !form.gmail.trim() || !form.linkedin.trim()) {
        setMessage({ type: "error", text: "Please fill in all required fields" });
        setLoading(false);
        return;
      }

      // ============================================
      // STORE IN FIRESTORE (No image upload - using hardcoded dummy image)
      // ============================================
      const payload = {
        name: form.name.trim(),
        role: form.title.trim(),
        email: form.gmail.trim(),
        linkedin: form.linkedin.trim(),
        updatedAt: new Date(),
      };

      console.log("Saving to Firestore...", payload);

      if (editing !== null) {
        await updateDoc(doc(db, "coreteam", editing), payload);
        console.log("Document updated successfully");
        setMessage({ type: "success", text: "Team member updated successfully!" });
        setEditing(null);
      } else {
        await addDoc(collection(db, "coreteam"), {
          ...payload,
          createdAt: new Date(),
        });
        console.log("Document added successfully");
        setMessage({ type: "success", text: "Team member added successfully!" });
      }

      // Reset form
      setForm({ name: "", title: "", gmail: "", linkedin: "" });
      
      // Reset file input
      const fileInput = document.querySelector('input[type="file"]');
      if (fileInput) fileInput.value = "";

      // Refresh team list
      console.log("Refreshing team list...");
      const snapshot = await getDocs(collection(db, "coreteam"));
      setTeam(snapshot.docs.map(d => ({ id: d.id, ...d.data() })));
      console.log("Team list refreshed");

      // Clear message after 3 seconds
      setTimeout(() => setMessage({ type: "", text: "" }), 3000);
    } catch (err) {
      console.error("Dashboard error: Failed to save team member", err);
      setMessage({ type: "error", text: `Failed to save: ${err.message || "Unknown error. Check console for details."}` });
    } finally {
      console.log("Setting loading to false");
      setLoading(false);
    }
  };

  /* =============================
     EDIT
     ============================= */
  const handleEdit = (m) => {
    setEditing(m.id);
    setForm({
      name: m.name,
      title: m.role,
      gmail: m.email,
      linkedin: m.linkedin,
    });
  };

  /* =============================
     DELETE
     ============================= */
  const handleDelete = async (id) => {
    try {
      await deleteDoc(doc(db, "coreteam", id));
      setTeam(team.filter((m) => m.id !== id));
    } catch (err) {
      console.error("Dashboard error: Failed to delete team member", err);
    }
  };


  return (
    <>
      <style>{`
        /* FORCED INDEPENDENT LAYOUT */
        .admin-fullscreen-layer {
          position: fixed !important;
          top: 120px !important;
          left: 0 !important;
          width: 100vw !important;
          height: calc(100vh - 120px) !important;
          background-color: #f8f9fa !important;
          overflow-y: auto !important;
          z-index: 2000 !important; /* Ensures it sits above your existing hero layouts */
          display: flex !important;
          justify-content: center !important;
          padding-top: 0 !important;
        }

        .admin-content-hub {
          width: 90% !important;
          max-width: 1000px !important;
          display: flex !important;
          flex-direction: column !important;
          align-items: center !important;
          padding-bottom: 80px !important;
        }

        .header-section {
          text-align: center !important;
          margin-bottom: 40px !important;
        }

        .header-section h1 {
          font-size: 52px !important;
          font-weight: 900 !important;
          color: #1a1a1a !important;
          margin-bottom: 8px !important;
        }

        .header-section p {
          font-size: 18px !important;
          color: #666 !important;
        }

        .management-card {
          width: 100% !important;
          background: #ffffff !important;
          border-radius: 30px !important;
          padding: 40px !important;
          box-shadow: 0 15px 40px rgba(0,0,0,0.06) !important;
          margin-bottom: 30px !important;
          border: 1px solid #eee !important;
        }

        .section-tag {
          display: block !important;
          font-size: 13px !important;
          font-weight: 800 !important;
          color: #e31e24 !important;
          text-transform: uppercase !important;
          letter-spacing: 1.5px !important;
          margin-bottom: 25px !important;
          border-bottom: 1px solid #f0f0f0 !important;
          padding-bottom: 10px !important;
        }

        /* SPREAD OUT FORM */
        .form-grid-layout {
          display: grid !important;
          grid-template-columns: 1fr 1fr !important;
          gap: 20px !important;
          margin-bottom: 30px !important;
        }

        .styled-input {
          padding: 18px !important;
          border: 2px solid #f0f0f0 !important;
          border-radius: 12px !important;
          font-size: 16px !important;
          background: #fafafa !important;
          color: #111 !important;
          width: 100% !important;
        }

        .styled-input:focus {
          outline: none !important;
          border-color: #e31e24 !important;
          background: #fff !important;
        }

        .upload-container {
          margin-top: 10px !important;
        }

        .upload-label {
          display: block !important;
          font-weight: 700 !important;
          margin-bottom: 12px !important;
          color: #333 !important;
        }

        .file-preview-area {
          display: flex !important;
          align-items: center !important;
          gap: 20px !important;
        }

        .avatar-preview {
          width: 80px !important;
          height: 80px !important;
          border-radius: 15px !important;
          object-fit: cover !important;
          border: 2px solid #e31e24 !important;
        }

        .confirm-action-btn {
          display: block !important;
          margin: 40px auto 0 auto !important;
          padding: 18px 50px !important;
          background: #e31e24 !important;
          color: white !important;
          border: none !important;
          border-radius: 50px !important;
          font-size: 16px !important;
          font-weight: 800 !important;
          cursor: pointer !important;
          transition: transform 0.2s ease !important;
        }

        .confirm-action-btn:hover {
          transform: translateY(-2px) !important;
        }

        /* REGISTRY ROWS */
        .registry-item {
          display: flex !important;
          align-items: center !important;
          justify-content: space-between !important;
          padding: 20px !important;
          background: #fcfcfc !important;
          border-radius: 20px !important;
          margin-bottom: 12px !important;
          border: 1px solid #f0f0f0 !important;
        }

        .item-identity {
          display: flex !important;
          align-items: center !important;
        }

        .item-identity img {
          width: 55px !important;
          height: 55px !important;
          border-radius: 50% !important;
          object-fit: cover !important;
          margin-right: 20px !important;
        }

        .item-identity strong { font-size: 18px !important; color: #111 !important; }
        .item-identity span { font-size: 14px !important; color: #777 !important; }

        .item-actions button {
          padding: 10px 18px !important;
          border-radius: 10px !important;
          margin-left: 8px !important;
          font-weight: 700 !important;
          border: 1px solid #ddd !important;
          background: #fff !important;
          cursor: pointer !important;
          transition: 0.2s !important;
          color: #e31e24 !important;
        }

        .item-actions button:hover {
          border-color: #e31e24 !important;
          color: #e31e24 !important;
        }

        .message-alert {
          padding: 15px 20px !important;
          border-radius: 12px !important;
          margin-bottom: 20px !important;
          font-weight: 600 !important;
          text-align: center !important;
        }

        .message-alert.success {
          background: #d4edda !important;
          color: #155724 !important;
          border: 1px solid #c3e6cb !important;
        }

        .message-alert.error {
          background: #f8d7da !important;
          color: #721c24 !important;
          border: 1px solid #f5c6cb !important;
        }

        .confirm-action-btn:disabled {
          opacity: 0.6 !important;
          cursor: not-allowed !important;
        }
      `}</style>

      <div className="admin-fullscreen-layer">
        <div className="admin-content-hub">
          <header className="header-section">
            <h1>Management Console</h1>
            <p>Admin Control Panel for Team Registry</p>
          </header>

          <section className="management-card">
            <span className="section-tag">
              {editing !== null ? "Modify Member" : "Add New Member"}
            </span>

            {message.text && (
              <div className={`message-alert ${message.type}`}>
                {message.text}
              </div>
            )}

            <form onSubmit={handleSubmit}>
              <div className="form-grid-layout">
                <input
                  className="styled-input"
                  placeholder="Name"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  required
                />
                <input
                  className="styled-input"
                  placeholder="Professional Title"
                  value={form.title}
                  onChange={(e) => setForm({ ...form, title: e.target.value })}
                  required
                />
                <input
                  className="styled-input"
                  placeholder="Gmail"
                  value={form.gmail}
                  onChange={(e) => setForm({ ...form, gmail: e.target.value })}
                  required
                />
                <input
                  className="styled-input"
                  placeholder="LinkedIn"
                  value={form.linkedin}
                  onChange={(e) => setForm({ ...form, linkedin: e.target.value })}
                  required
                />
              </div>

              <button 
                className="confirm-action-btn" 
                type="submit"
                disabled={loading}
              >
                {loading 
                  ? "PROCESSING..." 
                  : editing !== null 
                    ? "COMMIT CHANGES" 
                    : "CONFIRM ENROLLMENT"
                }
              </button>
            </form>
          </section>

          <section className="management-card">
            <span className="section-tag">Current Registry</span>

            {team.length === 0 ? (
              <p style={{ textAlign: "center", color: "#999", padding: "30px" }}>
                No team members found. Add your first member above.
              </p>
            ) : (
              team.map((m) => (
              <div key={m.id} className="registry-item">
                <div className="item-identity">
                  <img src="https://via.placeholder.com/150/cccccc/ffffff?text=Profile" alt="" />
                  <div>
                    <strong>{m.name}</strong>
                    <br />
                    <span>{m.role}</span>
                  </div>
                </div>

                <div className="item-actions">
                  <button onClick={() => handleEdit(m)}>Modify</button>
                  <button onClick={() => handleDelete(m.id)}>Remove</button>
                </div>
              </div>
              ))
            )}
          </section>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
