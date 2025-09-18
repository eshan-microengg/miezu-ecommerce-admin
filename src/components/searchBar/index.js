import React from 'react';
import PropTypes from 'prop-types';

const SearchBar = ({ searchTerm, setSearchTerm, placeholder , style }) => {
    return (
            <input
                style={style}
                type="text"
                placeholder={placeholder || "Search"} 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
            />
    );
};

SearchBar.propTypes = {
    searchTerm: PropTypes.string.isRequired, // Current search term state
    setSearchTerm: PropTypes.func.isRequired, // Function to update search term
    placeholder: PropTypes.string, // Optional placeholder
};

export default SearchBar;