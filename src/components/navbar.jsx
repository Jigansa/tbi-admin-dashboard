import React from 'react';

const Navbar = () => {
  const links = ["Home", "About", "Incubation", "Events", "Skill Development", "Resources", "Community", "Careers", "Contact"];

  return (
    <nav className="navbar-wrapper">
      <div className="logo-area">
        <img src="/logo.png" alt="TBI Logo" className="tbi-logo" />
      </div>

      <ul className="pill-menu">
        {links.map((link) => (
          <li key={link}>
            <a href="#" className={link === "Home" ? "active" : ""}>{link}</a>
          </li>
        ))}
      </ul>

      <button className="journey-btn">🚀 Start Your Journey</button>
    </nav>
  );
};

export default Navbar;