import React, { useState } from 'react';
import './CustomSelect.css';

const options = [
  { value: 'Youtube', label: 'YouTube', icon: '/youtube_logo.png' }
];

function CustomSelect({ onChange }) {
  const [selectedOption, setSelectedOption] = useState(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const handleOptionClick = (option) => {
    setSelectedOption(option);
    onChange(option);
    setIsDropdownOpen(false);
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  return (
    <div className="custom-select">
      <div className="selected-item">
        {selectedOption ? (
          <>
            <img src={process.env.PUBLIC_URL + selectedOption.icon} alt="" className="option-icon" />
            {selectedOption.label}
          </>
        ) : (
          'Select'
        )}
      </div>
      <div className="options">
        {options.map((option) => (
          <div
            key={option.value}
            className="option-item"
            onClick={() => handleOptionClick(option)}
          >
            <img src={process.env.PUBLIC_URL + option.icon} alt="" className="option-icon" />
            {option.label}
          </div>
        ))}
      </div>
    </div>
  );
}

export default CustomSelect;