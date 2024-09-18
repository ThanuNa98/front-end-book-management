import React from 'react';
import './Pagination.css';

const Pagination = ({ booksPerPage, totalBooks, paginate, currentPage }) => {
    const pageNumbers = [];

    for (let i = 1; i <= Math.ceil(totalBooks / booksPerPage); i++) {
        pageNumbers.push(i);
    }

    return (
        <div className="pagination">
            <ul className="pagination-list">
                {pageNumbers.map(number => (
                    <li key={number} className={`pagination-item ${currentPage === number ? 'active' : ''}`}>
                        <button onClick={() => paginate(number)} className="pagination-button">
                            {number}
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Pagination;
