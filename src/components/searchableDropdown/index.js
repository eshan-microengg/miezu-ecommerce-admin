import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import './style.scss'

const MultiSelectSearchableDropdown = ({ options, onChange, name, isInvalid }) => {
    const [inputValue, setInputValue] = useState('');
    const [filteredOptions, setFilteredOptions] = useState([]);
    const [showOptions, setShowOptions] = useState(false);
    const [selectedOptions, setSelectedOptions] = useState([]);
    const inputRef = useRef(null);
    const containerRef = useRef(null);
    const mouseDownRef = useRef(false);

    useEffect(() => {
        const filtered = options.filter(
            option => 
                option.LABEL.toLowerCase().includes(inputValue.toLowerCase()) &&
                !selectedOptions.some(selected => selected.VALUE === option.VALUE)
        );
        setFilteredOptions(filtered);
    }, [inputValue, options, selectedOptions]);

    const handleInputChange = (e) => {
        setInputValue(e.target.value);
        setShowOptions(true);
    };

    const handleOptionClick = (option) => {
        const updatedSelectedOptions = [...selectedOptions, option];
        setSelectedOptions(updatedSelectedOptions);
        setInputValue('');
        setShowOptions(false);
        if (onChange) {
            onChange({
                target: {
                    name,
                    value: updatedSelectedOptions.map(opt => opt.VALUE)
                }
            });
        }
    };

    const handleRemoveOption = (optionToRemove, e) => {
        e.stopPropagation();
        const updatedOptions = selectedOptions.filter(
            option => option.VALUE !== optionToRemove.VALUE
        );
        setSelectedOptions(updatedOptions);
        if (onChange) {
            onChange({
                target: {
                    name,
                    value: updatedOptions.map(opt => opt.VALUE)
                }
            });
        }
    };

    const handleContainerClick = () => {
        inputRef.current.focus();
    };

    const handleBlur = () => {
        setTimeout(() => {
            if (!mouseDownRef.current) {
                setShowOptions(false);
            }
        }, 200);
    };

    const handleMouseDown = () => {
        mouseDownRef.current = true;
    };

    const handleMouseUp = () => {
        mouseDownRef.current = false;
    };

    return (
        <div className="multi-select-searchable-dropdown">
            <div 
                ref={containerRef}
                className={`flex flex-wrap items-center border rounded p-1 ${isInvalid ? 'border-red-500' : 'border-gray-300'}`}
                onClick={handleContainerClick}
            >
                {selectedOptions.map((option) => (
                    <span 
                        key={option.VALUE}
                        className="bg-blue-100 text-blue-800 text-xs font-medium mr-1 px-2 py-0.5 rounded flex items-center"
                    >
                        {option.LABEL}
                        <button
                            type="button"
                            onClick={(e) => handleRemoveOption(option, e)}
                            className="ml-1 text-blue-600 hover:text-blue-800 flex items-center justify-center"
                        >
                            <FontAwesomeIcon icon={faTimes} style={{ fontSize: '10px' }} />
                        </button>
                    </span>
                ))}
                <input
                    ref={inputRef}
                    type="text"
                    value={inputValue}
                    onChange={handleInputChange}
                    onFocus={() => setShowOptions(true)}
                    onBlur={handleBlur}
                    style={{border:"none"}}
                    autoComplete="off"
                    placeholder={selectedOptions.length === 0 ? "Select options" : ""}
                />
            </div>
            {showOptions && filteredOptions.length > 0 && (
                <ul
                    className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg max-h-60 overflow-auto"
                    onMouseDown={handleMouseDown}
                    onMouseUp={handleMouseUp}
                >
                    {filteredOptions.map((option) => (
                        <li
                            key={option.VALUE}
                            onClick={() => handleOptionClick(option)}
                            className="px-4 py-2 hover:bg-gray-100 cursor-pointer text-sm"
                        >
                            {option.LABEL}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

MultiSelectSearchableDropdown.propTypes = {
    name: PropTypes.string.isRequired,
    options: PropTypes.arrayOf(
        PropTypes.shape({
            VALUE: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
            LABEL: PropTypes.string.isRequired,
        })
    ).isRequired,
    onChange: PropTypes.func,
    isInvalid: PropTypes.bool,
};

export default MultiSelectSearchableDropdown;