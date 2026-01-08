import React, { useState, useEffect } from 'react';
import Navbar from './components/navbar';
import Sidebar from './components/sidebar';
import About from './components/about';
import Dashboard from './admin/dashboard';
import './App.css';

function App() {
  const [view, setView] = useState(
    window.location.hash.slice(1) || 'home'
  );
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    const handleHashChange = () => {
      setView(window.location.hash.slice(1) || 'home');
    };

    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const renderView = () => {
    if (view === 'home') {
      return (
        <section className="hero-container">
          <div className="hero-main-box">
            <div className="hero-content">
              <span
                style={{
                  fontSize: '12px',
                  color: '#999',
                  textTransform: 'uppercase',
                  marginBottom: '10px',
                  display: 'block'
                }}
              >
                Technology Business Incubator, Graphic Era University
              </span>

              <h1 className="hero-title">
                Incubating your dreams into reality
              </h1>

              <p className="hero-subtitle">
                Join TBI-GEU to access expert mentorship, crucial funding,
                skill development opportunities, and a thriving community.
              </p>

              <div className="hero-btn-group">
                <button className="btn-primary">Get Started →</button>
                <button className="btn-secondary">Learn More</button>
              </div>
            </div>

            <div className="hero-illustration">
              <img src="/hero-character.png" alt="Incubator Graphic" />
            </div>
          </div>
        </section>
      );
    }

    if (view === 'about') {
      return <About />;
    }

    if (view === 'dashboard') {
      return <Dashboard />;
    }

    return (
      <div style={{ textAlign: 'center', padding: '100px 20px' }}>
        <h1 style={{ fontSize: '48px', fontWeight: '800' }}>
          {view.charAt(0).toUpperCase() + view.slice(1)} Page
        </h1>
        <p style={{ fontSize: '18px', color: '#666', marginTop: '20px' }}>
          This page is under development. Coming soon!
        </p>
      </div>
    );
  };

  return (
    <div className="site-container">
      <Navbar setView={setView} currentView={view} toggleSidebar={() => setSidebarOpen(!sidebarOpen)} />
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} setView={setView} />

      {/* neutral wrapper */}
      <main className="main-container">
        {renderView()}
      </main>
    </div>
  );
}

export default App;
