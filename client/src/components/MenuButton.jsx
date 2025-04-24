import React from 'react';
import { MenuIcon } from '../icons'; // Adjust the import path based on your project structure

const MenuButton = ({ onClick }) => {
  return (
    <button
      className="p-1 mr-5 -ml-1 rounded-md lg:hidden focus:outline-none focus:shadow-outline-purple bg-gray-50 text-purple-500"
      onClick={onClick}
      aria-label="Menu"
    >
      <MenuIcon className="w-6 h-6" aria-hidden="true" />
    </button>
  );
};

export default MenuButton;
