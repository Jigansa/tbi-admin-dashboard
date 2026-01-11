import React, { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase";

function About() {
  const [coreTeam, setCoreTeam] = useState([]);

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

    fetchCoreTeam();
  }, []);

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
<section className="about-section-divider">
        <div className="about-section-divider-inner">
          <h2 className="about-section-title">Team Mavericks</h2>
          <div className="about-section-line"></div>
        </div>
      </section>



    </>
  );
}

export default About;
