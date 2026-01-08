import React, { useState } from "react";

const Dashboard = () => {
  const [team, setTeam] = useState(() => {
    const saved = localStorage.getItem("team");
    return saved ? JSON.parse(saved) : [];
  });

  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState({ name: "", title: "", photo: "" });

  const saveTeam = (newTeam) => {
    setTeam(newTeam);
    localStorage.setItem("team", JSON.stringify(newTeam));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editing) {
      saveTeam(team.map(m => (m.id === editing ? { ...m, ...form } : m)));
      setEditing(null);
    } else {
      saveTeam([...team, { ...form, id: Date.now() }]);
    }
    setForm({ name: "", title: "", photo: "" });
  };

  const handleEdit = (m) => {
    setEditing(m.id);
    setForm({ name: m.name, title: m.title, photo: m.photo });
  };

  const handleDelete = (id) => {
    saveTeam(team.filter(m => m.id !== id));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => setForm({ ...form, photo: reader.result });
    reader.readAsDataURL(file);
  };

  return (
    <>
      <style>{`
        /* FORCED INDEPENDENT LAYOUT */
        .admin-fullscreen-layer {
          position: fixed !important;
          top: 0 !important;
          left: 0 !important;
          width: 100vw !important;
          height: 100vh !important;
          background-color: #f8f9fa !important;
          overflow-y: auto !important;
          z-index: 2000 !important; /* Ensures it sits above your existing hero layouts */
          display: flex !important;
          justify-content: center !important;
          padding-top: 120px !important;
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
        }

        .item-actions button:hover {
          border-color: #e31e24 !important;
          color: #e31e24 !important;
        }
      `}</style>

      <div className="admin-fullscreen-layer">
        <div className="admin-content-hub">
          <header className="header-section">
            <h1>Management Console</h1>
            <p>Admin Control Panel for Team Registry</p>
          </header>

          <section className="management-card">
            <span className="section-tag">{editing ? "Modify Member" : "Add New Member"}</span>
            <form onSubmit={handleSubmit}>
              <div className="form-grid-layout">
                <input
                  className="styled-input"
                  placeholder="Full Name"
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
              </div>

              <div className="upload-container">
                <label className="upload-label">Upload Profile Image</label>
                <div className="file-preview-area">
                  <input type="file" accept="image/*" onChange={handleFileChange} />
                  {form.photo && <img src={form.photo} alt="preview" className="avatar-preview" />}
                </div>
              </div>

              <button className="confirm-action-btn" type="submit">
                {editing ? "COMMIT CHANGES" : "CONFIRM ENROLLMENT"}
              </button>
            </form>
          </section>

          <section className="management-card">
            <span className="section-tag">Current Registry</span>
            {team.length === 0 ? (
              <p style={{ textAlign: "center", color: "#999", padding: "30px" }}>No members found in the local database.</p>
            ) : (
              <div>
                {team.map(m => (
                  <div key={m.id} className="registry-item">
                    <div className="item-identity">
                      <img src={m.photo || 'https://via.placeholder.com/150'} alt="" />
                      <div>
                        <strong>{m.name}</strong><br />
                        <span>{m.title}</span>
                      </div>
                    </div>
                    <div className="item-actions">
                      <button onClick={() => handleEdit(m)}>Modify</button>
                      <button onClick={() => handleDelete(m.id)}>Remove</button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </section>
        </div>
      </div>
    </>
  );
};

export default Dashboard;