import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useNavigate, useLocation } from 'react-router-dom';
import './style.scss';
import Icons from '../icons';
import { faChevronDown, faChevronUp } from '@fortawesome/free-solid-svg-icons';

const Accordion = ({ title, items }) => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const openAccordion = localStorage.getItem(title);
    setIsOpen(openAccordion === 'true');
  }, [title]);

  const toggleAccordion = () => {
    const newState = !isOpen;
    setIsOpen(newState);
    localStorage.setItem(title, newState);
  };

  const handleNavigation = (path) => {
    navigate(path);
  };

  return (
    <div className="accordion-item">
      <div className="accordion-title" onClick={toggleAccordion}>
        <span>{title}</span>
        {isOpen ? <Icons iconName={faChevronUp} /> : <Icons iconName={faChevronDown} />}
      </div>
      {isOpen && (
        <div className="accordion-content">
          <ul>
            {items.map((item) => (
              <li key={item.ID}>
                <button
                  type="button"
                  onClick={() => handleNavigation(item.ROUTE)}
                  className={location.pathname === item.ROUTE ? 'active' : ''}
                >
                  {item.LABEL}
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

const HomeSidebar = ({ accordions }) => {
  return (
    <div className="sidebar"  >
      {accordions.map((accordion, index) => (
        <Accordion key={index} title={accordion.title} items={accordion.items} />
      ))}
    </div>
  );
};

HomeSidebar.propTypes = {
  accordions: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string.isRequired,
      items: PropTypes.arrayOf(
        PropTypes.shape({
          ID: PropTypes.string.isRequired,
          LABEL: PropTypes.string.isRequired,
          ROUTE: PropTypes.string.isRequired,
        })
      ).isRequired,
    })
  ).isRequired,
};

export default HomeSidebar;