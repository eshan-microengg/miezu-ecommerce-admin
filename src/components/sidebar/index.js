import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import './style.scss'

const Sidebar = ({ items }) => {
    const [activeSection, setActiveSection] = useState(items[0]?.ID || '');
  
    useEffect(() => {
      const handleScroll = () => {
        const scrollPosition = window.scrollY + window.innerHeight / 2; 
  
        items.forEach((item, index) => {
          const section = document.getElementById(item.ID);
          const nextSection = items[index + 1] ? document.getElementById(items[index + 1].ID) : null;
  
          if (section) {
            if (scrollPosition >= section.offsetTop && (!nextSection || scrollPosition < nextSection.offsetTop)) {
              setActiveSection(item.ID);
            }
          }
        });
      };
  
      window.addEventListener('scroll', handleScroll);
      return () => window.removeEventListener('scroll', handleScroll);
    }, [items]);
  
    const scrollToSection = (sectionId) => {
      const section = document.getElementById(sectionId);
      if (section) {
        section.scrollIntoView({ behavior: 'smooth' });
      }
    };
  
    return (
      <nav className="sidebar">
        <ul>
          {items.map(item => (
            <li key={item.ID} className={activeSection === item.ID ? 'active' : ''}>
              <button onClick={() => scrollToSection(item.ID)}>
                {item.LABEL}
              </button>
            </li>
          ))}
        </ul>
       </nav>
    );
  };
  

Sidebar.propTypes = {
  items: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string,
      label: PropTypes.string,
    })
  ).isRequired,
};

export default Sidebar;