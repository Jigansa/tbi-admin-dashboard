import React, { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase";

function About() {
  const [coreTeam, setCoreTeam] = useState([]);
  const [mavericks, setMavericks] = useState([]);
  const [mentors, setMentors] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("all");

  const MAVERICK_CATEGORIES = {
    1: "Design & Creative",
    2: "Media & Video Production",
    3: "Operations & Administration",
    4: "Business Development & Programs",
    5: "Community & Engagement",
    6: "Events & Logistics",
    7: "Talent & HR Support",
    8: "Technical"
  };

  useEffect(() => {
    const fetchCoreTeam = async () => {
      try {
        const snapshot = await getDocs(collection(db, "coreteam"));
        const data = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        setCoreTeam(data);
      } catch (err) {
        console.error("Error fetching core team:", err);
      }
    };

    const fetchMavericks = async () => {
      try {
        const snapshot = await getDocs(collection(db, "teamMavericks"));
        const data = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        setMavericks(data);
      } catch (err) {
        console.error("Error fetching mavericks:", err);
      }
    };

    const fetchMentors = async () => {
      try {
        const snapshot = await getDocs(collection(db, "mentors"));
        const data = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        // Sort by order field if it exists
        const sortedData = data.sort((a, b) => (a.order || 999) - (b.order || 999));
        setMentors(sortedData);
      } catch (err) {
        console.error("Error fetching mentors:", err);
      }
    };

    fetchCoreTeam();
    fetchMavericks();
    fetchMentors();
  }, []);

  const filteredMavericks = selectedCategory === "all" 
    ? mavericks 
    : mavericks.filter(m => m.category === Number(selectedCategory));

  // Helper function to get initials from name
  const getInitials = (name) => {
    if (!name) return "";
    const words = name.trim().split(' ');
    if (words.length === 1) return words[0].substring(0, 2).toUpperCase();
    return words.map(word => word[0]).join('').toUpperCase().slice(0, 2);
  };

  return (
    <>
      {/* =============================
          HERO SECTION
         ============================= */}
      <section className="hero-container about-hero-clean">
        <div className="hero-main-box">
          <div className="about1-inner">

            {/* LEFT */}
            <div className="about1-left animate-left">
              <h1 className="about1-title">
                Empowering Innovators <br /> & Changemakers
              </h1>

              <p className="about1-text">
                At TBI-GEU, we envision a future where innovation drives economic
                growth and sustainability. Our mission is to empower the next
                generation of entrepreneurs through skill development,
                mentorship, and community.
              </p>

              <p className="about1-text">
                Beyond our core focus, TBI-GEU cultivates a strong entrepreneurial
                culture through workshops, talks, and hackathons.
              </p>
            </div>

            {/* RIGHT */}
            <div className="about1-right animate-right">
              <div className="about1-card">
                <h3 className="about1-card-title">Our Vision</h3>
                <p className="about1-card-text">
                  To be the leading force for innovation, skill development,
                  and sustainability.
                </p>
              </div>

              <div className="about1-card">
                <h3 className="about1-card-title">Our Mission</h3>
                <ul className="about1-list">
                  <li>Skill Development & Internships</li>
                  <li>Innovation & Incubation</li>
                  <li>Sustainable Growth</li>
                  <li>Community Building</li>
                </ul>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* =============================
          OUR HISTORY
         ============================= */}
      <section
        className="section-wrapper animate-bottom"
        style={{
          boxShadow: "0 4px 12px rgba(0, 0, 0, 0.05)",
          background: "#fcfcfc"
        }}
      >
        <h2
          className="hero-title"
          style={{
            fontSize: "25px",
            textAlign: "left",
            marginBottom: "20px"
          }}
        >
          Our History
        </h2>

        <p
          className="hero-subtitle"
          style={{
            fontSize: "16px",
            textAlign: "left",
            maxWidth: "800px",
            marginBottom: "20px"
          }}
        >
          Founded in 2010 as the Entrepreneurship Development Cell (EDC), TBI-GEU
          has evolved into a cornerstone of entrepreneurial support in
          Uttarakhand.
        </p>

        <p
          className="hero-subtitle"
          style={{
            fontSize: "16px",
            textAlign: "left",
            marginBottom: "12px"
          }}
        >
          Since then, TBI-GEU has:
        </p>

        <ul
          className="hero-subtitle"
          style={{
            fontSize: "16px",
            paddingLeft: "20px",
            marginBottom: "20px"
          }}
        >
          <li>Supported the launch and growth of startups and SMEs.</li>
          <li>Provided incubation, mentorship, and networking opportunities.</li>
          <li>Helped build a thriving entrepreneurial ecosystem in the region.</li>
        </ul>

        <p
          className="hero-subtitle"
          style={{
            fontSize: "16px",
            textAlign: "left",
            maxWidth: "800px"
          }}
        >
          We remain committed to empowering innovators and changemakers who will
          shape the future of Uttarakhand and beyond.
        </p>
      </section>

      {/* =============================
          MEET OUR TEAM – SECTION DIVIDER
         ============================= */}
      <section className="about-section-divider">
        <div className="about-section-divider-inner">
          <h2 className="about-section-title">Meet Our Team</h2>
          <div className="about-section-line"></div>
        </div>
      </section>

      {/* =============================
    TEAM GRID (FIREBASE)
   ============================= */}

{(() => {
  const headMember = coreTeam.find(m => m.type === "head");
  const otherMembers = coreTeam.filter(m => m.type !== "head");

  return (
    <section className="team-section">
      <div className="team-grid">

        {/* HEAD CARD */}
        {headMember && (
          <div className="team-card team-head-card">
            <img
              src="https://tbi.geu.ac.in/NPI.png"
              alt={headMember.name}
              className="team-image"
            />

            <div className="team-content">
              <h3 className="team-name">{headMember.name}</h3>
              <p className="team-role">{headMember.role}</p>

              <div className="team-links">
                {headMember.email && (
                  <a
                    href={`mailto:${headMember.email}`}
                    className="team-link email"
                    aria-label="Email"
                  />
                )}
                {headMember.linkedin && (
                  <a
                    href={headMember.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="team-link linkedin"
                    aria-label="LinkedIn"
                  />
                )}
              </div>
            </div>
          </div>
        )}

        {/* SLIDING MEMBERS (3 AT A TIME) */}
        <div className="team-slider">
          {otherMembers.map(member => (
            <div className="team-card team-member-card" key={member.id}>
              <img
                src="https://tbi.geu.ac.in/NPI.png"
                alt={member.name}
                className="team-image"
              />

              <div className="team-content">
                <h3 className="team-name">{member.name}</h3>
                <p className="team-role">{member.role}</p>

                <div className="team-links">
                  {member.email && (
                    <a
                      href={`mailto:${member.email}`}
                      className="team-link email"
                      aria-label="Email"
                    />
                  )}
                  {member.linkedin && (
                    <a
                      href={member.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="team-link linkedin"
                      aria-label="LinkedIn"
                    />
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
})()}

      {/* =============================
          TEAM MAVERICKS SECTION
         ============================= */}
      <section className="about-section-divider">
        <div className="about-section-divider-inner">
          <h2 className="about-section-title">Team Mavericks</h2>
          <div className="about-section-line"></div>
        </div>
      </section>

      <section className="mavericks-section">
        {/* CATEGORY FILTERS */}
        <div className="mavericks-filters">
          <button 
            className={`mav-filter-btn ${selectedCategory === "all" ? "active" : ""}`}
            onClick={() => setSelectedCategory("all")}
          >
            All
          </button>
          {Object.entries(MAVERICK_CATEGORIES).map(([id, label]) => (
            <button 
              key={id}
              className={`mav-filter-btn ${selectedCategory === id ? "active" : ""}`}
              onClick={() => setSelectedCategory(id)}
            >
              {label}
            </button>
          ))}
        </div>

        {/* MAVERICKS GRID */}
        <div className="mavericks-grid">
          {filteredMavericks.length === 0 ? (
            <p className="mav-empty-state">No team members found in this category.</p>
          ) : (
            filteredMavericks.map(member => (
              <div className="mav-card" key={member.id}>
                <div className="mav-avatar">
                  {member.name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2)}
                </div>
                <h3 className="mav-name">{member.name}</h3>
                <p className="mav-role">{member.role}</p>
                
                <div className="mav-links">
                  {member.email && (
                    <a
                      href={`mailto:${member.email}`}
                      className="mav-link email"
                      aria-label="Email"
                      title="Email"
                    />
                  )}
                  {member.linkedin && (
                    <a
                      href={member.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mav-link linkedin"
                      aria-label="LinkedIn"
                      title="LinkedIn"
                    />
                  )}
                </div>
              </div>
            ))
          )}
        </div>
      </section>

      {/* =============================
          MENTORS NETWORK SECTION
         ============================= */}
      <section className="about-section-divider">
        <div className="about-section-divider-inner">
          <h2 className="about-section-title">Mentors Network</h2>
          <div className="about-section-line"></div>
        </div>
      </section>

      <section className="mentors-section">
        <div className="mentors-grid">
          {mentors.length === 0 ? (
            <p className="mentor-empty-state">No mentors found.</p>
          ) : (
            mentors.map(mentor => (
              <div className="mentor-card" key={mentor.id}>
                <div className="mentor-left">
                  <div className="mentor-avatar-circle">
                    {getInitials(mentor.name)}
                  </div>
                </div>
                <div className="mentor-right">
                  <h3 className="mentor-name">{mentor.name}</h3>
                  <p className="mentor-designation">{mentor.designation}</p>
                  
                  <div className="mentor-links">
                    {mentor.mail && (
                      <a
                        href={`mailto:${mentor.mail}`}
                        className="mentor-link email"
                        aria-label="Email"
                        title="Email"
                      />
                    )}
                    {mentor.linkedin && (
                      <a
                        href={mentor.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mentor-link linkedin"
                        aria-label="LinkedIn"
                        title="LinkedIn"
                      />
                    )}
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </section>
    </>
  );
}

export default About;