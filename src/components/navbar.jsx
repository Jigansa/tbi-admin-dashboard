import React from 'react';

const Navbar = ({ setView, currentView }) => {
  const links = ["Home", "About", "Incubation", "Events", "Skill Development", "Resources", "Community", "Careers", "Contact"];

  return (
    <nav className="navbar-wrapper">
      <div className="logo-area" onClick={() => window.location.hash = 'home'} style={{ cursor: 'pointer' }}>
        <img src="/logo.png" alt="TBI Logo" className="tbi-logo" />
      </div>

      <ul className="pill-menu">
        {links.map((link) => (
          <li key={link}>
            <button 
              className={`nav-link ${currentView === link.toLowerCase() ? 'active' : ''}`}
              onClick={() => {
                const target = (link === 'Home' || link === 'About') ? link.toLowerCase() : 'home';
                window.location.hash = target;
              }}
            >
              {link}
            </button>
          </li>
        ))}
      </ul>

      <button className="journey-btn">🚀 Start Your Journey</button>
    </nav>
  );
};

export default Navbar;