import React from 'react';
import Navbar from './components/navbar';
import './App.css';

function App() {
  return (
    <div className="site-container">
      <Navbar />

      <main className="hero-container">
        <section className="hero-main-box">
          <div className="hero-content">
            <span style={{fontSize: '12px', color: '#999', textTransform: 'uppercase', marginBottom: '10px', display: 'block'}}>
              Technology Business Incubator, Graphic Era University
            </span>
            <h1 className="hero-title">Incubating your dreams into reality</h1>
            <p className="hero-subtitle">
              Join TBI-GEU to access expert mentorship, crucial funding, skill development 
              opportunities, and a thriving community.
            </p>
            <div className="hero-btn-group">
              <button className="btn-primary">Get Started →</button>
              <button className="btn-secondary">Learn More</button>
            </div>
          </div>

          <div className="hero-illustration">
            <img src="/hero-character.png" alt="Incubator Graphic" />
          </div>
        </section>
      </main>
    </div>
  );
}

export default App;