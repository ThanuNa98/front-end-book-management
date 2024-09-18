import React, { useState } from 'react';
import './Search.css';

const Search = ({ setSearchTerm }) => {
    const [searchInput, setSearchInput] = useState('');

    const handleInputChange = (e) => {
        setSearchInput(e.target.value);
        setSearchTerm(e.target.value);
    };

    return (
        <div className="search-container">
            <input
                type="text"
                placeholder="Search by title or author..."
                value={searchInput}
                onChange={handleInputChange}
                className="search-input"
            />
        </div>
    );
};

export default Search;
