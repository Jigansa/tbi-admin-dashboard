import React from 'react';

const About = () => {
  return (
    <div className="about-page-content" style={{ width: '90%', maxWidth: '1440px' }}>
      <section className="about-hero">
        <h1 className="about-header-title">Empowering Innovators & Changemakers</h1>
      </section>

      <section className="section-wrapper">
        <div className="two-col-grid">
          <div className="slide-in-left">
            <h2 className="hero-title" style={{ fontSize: '32px', marginBottom: '20px' }}>Empowering Innovators & Changemakers</h2>
            <p className="hero-subtitle">
              At TBI-GEU, we envision a future where innovation drives economic growth and sustainability. Our mission is to empower the next generation of entrepreneurs through skill development, mentorship, and community.
            </p>
            <p className="hero-subtitle" style={{ marginTop: '20px' }}>
              Beyond our core focus, TBI-GEU cultivates a strong entrepreneurial culture. We inspire individuals through workshops, successful entrepreneur talks, and hackathons that tackle real-world problems.
            </p>
          </div>
          <div className="slide-in-right">
            <div className="vision-card">
              <h3 style={{ fontSize: '24px', marginBottom: '15px', color: 'var(--text-main)' }}>Our Vision</h3>
              <p style={{ color: 'var(--text-gray)' }}>
                To be the leading force for skill development, innovation, and sustainability in
                Uttarakhand. We empower entrepreneurs to transform ideas into successful
                ventures — fostering a vibrant entrepreneurial ecosystem for a prosperous future.
              </p>
            </div>
            <div className="mission-card">
              <h3 style={{ fontSize: '24px', marginBottom: '15px', color: 'var(--text-main)' }}>Our Mission</h3>
              <ul className="mission-list">
                <li className="mission-item"><span className="red-dot"></span> Skill Development & Internships</li>
                <li className="mission-item"><span className="red-dot"></span> Innovation & Incubation Support</li>
                <li className="mission-item"><span className="red-dot"></span> Sustainability & Economic Growth</li>
                <li className="mission-item"><span className="red-dot"></span> Community Building & Networking</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="section-wrapper">
        <h2 className="hero-title" style={{ fontSize: '32px', textAlign: 'center', marginBottom: '20px' }}>Our History</h2>
        <p className="hero-subtitle" style={{ textAlign: 'center', maxWidth: '800px', margin: '0 auto 40px' }}>
          Founded in 2010 as the Entrepreneurship Development Cell (EDC), TBI-GEU has
          evolved into a cornerstone of entrepreneurial support in Uttarakhand. In 2015, we
          became the official Technology Business Incubator (TBI) under the Department of
          Science and Technology, Government of India. In 2018, we became the first nodal
          agency recognized by Startup Uttarakhand. Since then, TBI-GEU has supported the launch and growth of startups and SMEs, provided incubation, mentorship, and networking opportunities, and helped build a thriving entrepreneurial ecosystem in the region. We remain committed to empowering innovators and changemakers who will shape the future of Uttarakhand and beyond.
        </p>
      </section>

      <section className="section-wrapper">
        <h2 className="hero-title" style={{ fontSize: '32px', textAlign: 'center', marginBottom: '40px' }}>Meet Our Team</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '20px' }}>
          <div style={{ textAlign: 'center' }}>
            <img src="https://tbi.geu.ac.in/coreteam/RK.webp" alt="Dr. Rakesh Sharma" style={{ width: '150px', height: '150px', borderRadius: '50%', marginBottom: '10px' }} />
            <h3>Dr. Rakesh Sharma</h3>
            <p>Chairman</p>
          </div>
          <div style={{ textAlign: 'center' }}>
            <img src="https://tbi.geu.ac.in/coreteam/NP.jpeg" alt="Dr. Narpinder Singh" style={{ width: '150px', height: '150px', borderRadius: '50%', marginBottom: '10px' }} />
            <h3>Dr. Narpinder Singh</h3>
            <p>Vice Chairman</p>
          </div>
          <div style={{ textAlign: 'center' }}>
            <img src="https://tbi.geu.ac.in/coreteam/SD.JPG" alt="Ms. Sarishma Dangi" style={{ width: '150px', height: '150px', borderRadius: '50%', marginBottom: '10px' }} />
            <h3>Ms. Sarishma Dangi</h3>
            <p>Chief Executive Officer</p>
          </div>
          <div style={{ textAlign: 'center' }}>
            <img src="https://tbi.geu.ac.in/coreteam/HV.png" alt="Mr. Harsh Vardhan Singh Rawat" style={{ width: '150px', height: '150px', borderRadius: '50%', marginBottom: '10px' }} />
            <h3>Mr. Harsh Vardhan Singh Rawat</h3>
            <p>Incubator Manager</p>
          </div>
          <div style={{ textAlign: 'center' }}>
            <img src="https://tbi.geu.ac.in/NPI.png" alt="CA Rahul Gupta" style={{ width: '150px', height: '150px', borderRadius: '50%', marginBottom: '10px' }} />
            <h3>CA Rahul Gupta</h3>
            <p>Treasurer</p>
          </div>
          <div style={{ textAlign: 'center' }}>
            <img src="https://tbi.geu.ac.in/NPI.png" alt="CA Shivam Gupta" style={{ width: '150px', height: '150px', borderRadius: '50%', marginBottom: '10px' }} />
            <h3>CA Shivam Gupta</h3>
            <p>Finance Officer</p>
          </div>
        </div>
      </section>

      <section className="section-wrapper">
        <h2 className="hero-title" style={{ fontSize: '32px', textAlign: 'center', marginBottom: '40px' }}>Team Hustlers</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px' }}>
          {/* List of team members - abbreviated for brevity */}
          <div style={{ textAlign: 'center' }}>
            <div style={{ width: '80px', height: '80px', borderRadius: '50%', background: '#eee', margin: '0 auto 10px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '24px' }}>AS</div>
            <h4>Aarav Sharma</h4>
            <p>Graphic & UI Designer</p>
          </div>
          <div style={{ textAlign: 'center' }}>
            <div style={{ width: '80px', height: '80px', borderRadius: '50%', background: '#eee', margin: '0 auto 10px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '24px' }}>AK</div>
            <h4>Abhishek Singh</h4>
            <p>Videographer & Editor</p>
          </div>
          {/* Add more as needed - the list is long, so I've included a few examples */}
          <div style={{ textAlign: 'center' }}>
            <div style={{ width: '80px', height: '80px', borderRadius: '50%', background: '#eee', margin: '0 auto 10px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '24px' }}>YS</div>
            <h4>Yuvraj Sharma</h4>
            <p>Video Producer</p>
          </div>
        </div>
        <p style={{ textAlign: 'center', marginTop: '20px', color: '#666' }}>And many more dedicated team members...</p>
      </section>

      <section className="section-wrapper">
        <h2 className="hero-title" style={{ fontSize: '32px', textAlign: 'center', marginBottom: '40px' }}>Join Our Mission</h2>
        <p className="hero-subtitle" style={{ textAlign: 'center', maxWidth: '600px', margin: '0 auto 40px' }}>
          Whether you're an innovator, creator, or changemaker — TBI-GEU is your platform
          to build, learn, and grow. Become part of a dynamic team shaping the future of
          entrepreneurship in Uttarakhand.
        </p>
        <div style={{ textAlign: 'center' }}>
          <button className="btn-primary" style={{ marginRight: '10px' }}>Join the Team</button>
          <button className="btn-secondary">Become a Mentor</button>
        </div>
      </section>
    </div>
  );
};

export default About;