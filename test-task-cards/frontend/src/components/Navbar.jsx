// Navbar.js
import React from "react";

const Navbar = ({ searchTerm, onSearch }) => {
  const handleSearch = () => {
    onSearch(); // Corrected line
  };

  return (
    <div className="bg-black p-4 mb-4 flex justify-between items-center">
      <h1 className="text-3xl font-semibold text-white">Card Display App</h1>
      <div className="relative w-1/3">
        <input
          type="text"
          placeholder="Search for cards..."
          value={searchTerm}
          onChange={(e) => onSearch(e.target.value)}
          className="px-4 py-2 w-full rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:outline-none"
        />
        <button
          onClick={handleSearch}
          className="absolute top-0 right-0 bottom-0 bg-blue-500 text-white rounded-r-lg py-2 px-4 hover:bg-blue-600 focus:ring-2 focus:ring-blue-500 focus:outline-none"
        >
          Search
        </button>
      </div>
    </div>
  );
};

export default Navbar;
