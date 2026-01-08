import React from 'react';

const Sidebar = ({ isOpen, onClose, setView }) => {
  if (!isOpen) return null;

  return (
    <div className="sidebar-overlay" onClick={onClose}>
      <div className="sidebar" onClick={(e) => e.stopPropagation()}>
        <div className="sidebar-header">
          <h2>Menu</h2>
          <button className="sidebar-close" onClick={onClose}>×</button>
        </div>
        <ul className="sidebar-menu">
          <li>
            <button
              className="sidebar-link"
              onClick={() => {
                setView('dashboard');
                onClose();
              }}
            >
              Dashboard
            </button>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;