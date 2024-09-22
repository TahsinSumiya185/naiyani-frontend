// CustomDropdown.jsx
import React, { useState } from 'react';

const CustomDropdown = ({ options, onSelect, placeholder = 'Select an option', customStyles }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);

  const toggleDropdown = () => setIsOpen(!isOpen);

  const handleSelect = (option) => {
    setSelectedOption(option);
    setIsOpen(false);
    if (onSelect) onSelect(option);
  };

  return (
    <div className={`relative ${customStyles?.container}`}>
      <button
        className={`w-full py-2 px-4 text-left ${customStyles?.button} ${isOpen ? 'bg-gray-200' : 'bg-white'} border rounded`}
        onClick={toggleDropdown}
      >
        {selectedOption ? selectedOption.label : placeholder}
      </button>
      {isOpen && (
        <ul className={`absolute w-full mt-1 bg-white border rounded ${customStyles?.list}`}>
          {options.map((option) => (
            <li
              key={option.value}
              className={`p-2 cursor-pointer hover:bg-gray-100 ${customStyles?.item}`}
              onClick={() => handleSelect(option)}
            >
              {option.label}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default CustomDropdown;
