import React from 'react';

const menuItems = [
  { label: 'Home', view: 'home' },
  { label: 'About', view: 'dashboard-about' },
  { label: 'Incubation', view: 'incubation' },
  { label: 'Events', view: 'events' },
  { label: 'Skill Development', view: 'skill-development' },
  { label: 'Resources', view: 'resources' },
  { label: 'Community', view: 'community' },
  { label: 'Mentors', view: 'mentors' },
  { label: 'Contact', view: 'contact' },
];

const Sidebar = ({ isOpen, onClose, setView }) => {
  if (!isOpen) return null;

  return (
    <div className="sidebar-overlay" onClick={onClose}>
      <div className="sidebar" onClick={(e) => e.stopPropagation()}>
        <div className="sidebar-header">
          <h2>Dashboard</h2>
          <button className="sidebar-close" onClick={onClose}>×</button>
        </div>

        <ul className="sidebar-menu">
          {menuItems.map((item) => (
            <li key={item.view}>
              <button
                className="sidebar-link"
                onClick={() => {
                  setView(item.view);
                  onClose();
                }}
              >
                {item.label}
              </button>
            </li>
          ))}
        </ul>

      </div>
    </div>
  );
};

export default Sidebar;
