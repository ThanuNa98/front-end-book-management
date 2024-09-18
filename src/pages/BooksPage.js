import React, { useState, useEffect } from 'react';
import BookList from '../components/BookList';
import Pagination from '../components/Pagination';
import { createBook } from '../services/bookService';
import Search from '../components/Search';
import './BooksPage.css';

const BooksPage = () => {
    const [books, setBooks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [user, setUser] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [newBook, setNewBook] = useState({
        title: '',
        author: '',
        genre: '',
        description: '',
        imageUrl: ''
    });
    const [authorFilter, setAuthorFilter] = useState('');
    const [yearRange, setYearRange] = useState([1800, 2024]); // Default year range
    const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
    const [filtersExpanded, setFiltersExpanded] = useState(false);
    const [searchTerm, setSearchTerm] = useState(''); // Search term state

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth <= 768);
        };

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    useEffect(() => {
        const fetchBooks = async () => {
            try {
                const response = await fetch('http://localhost:5000/api/books');
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                setBooks(data);
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchBooks();
    }, []);

    useEffect(() => {
        const fetchUser = () => {
            const storedUser = localStorage.getItem('user');
            setUser(storedUser || null);
        };

        fetchUser();

        const handleStorageChange = () => {
            fetchUser();
        };

        window.addEventListener('storage', handleStorageChange);

        return () => {
            window.removeEventListener('storage', handleStorageChange);
        };
    }, []);

    const handleOpenModal = () => setShowModal(true);
    const handleCloseModal = () => setShowModal(false);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewBook({
            ...newBook,
            [name]: value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            await createBook(newBook);
            alert('Book added successfully!');

            const response = await fetch('http://localhost:5000/api/books');
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const updatedBooks = await response.json();
            setBooks(updatedBooks);

            setNewBook({
                title: '',
                author: '',
                genre: '',
                description: '',
                imageUrl: ''
            });

            setShowModal(false);
        } catch (error) {
            console.error('Error creating book:', error);
            alert('Failed to add book. Please try again.');
        }
    };

    const handleYearRangeChange = (e) => {
        const newYearRange = e.target.value.split(',').map(Number);
        setYearRange(newYearRange);
    };

    const filterBooks = () => {
        return books.filter((book) => {
            const isAuthorMatch = authorFilter ? book.author.toLowerCase().includes(authorFilter.toLowerCase()) : true;
            const isYearMatch = book.publishedDate
                ? (book.publishedDate >= yearRange[0] && book.publishedDate <= yearRange[1])
                : true;
            const isSearchMatch = searchTerm
                ? (book.title.toLowerCase().includes(searchTerm.toLowerCase()) || book.author.toLowerCase().includes(searchTerm.toLowerCase()))
                : true;
            return isAuthorMatch && isYearMatch && isSearchMatch;
        });
    };

    const filteredBooks = filterBooks();

    const booksPerPage = 8;
    const indexOfLastBook = currentPage * booksPerPage;
    const indexOfFirstBook = indexOfLastBook - booksPerPage;
    const currentBooks = filteredBooks.slice(indexOfFirstBook, indexOfLastBook);

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    const highlightText = (text) => {
        if (!searchTerm) return text;
        const regex = new RegExp(`(${searchTerm})`, 'gi');
        return text.replace(regex, '<span class="highlight">$1</span>');
    };

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error}</p>;

    return (
        <div className="books-page">
            <h1 className="page-title">Books List</h1>

            {user && (
                <div className="add-book-button-container">
                    <button onClick={handleOpenModal} className="add-book-button">
                        Add New Book
                    </button>
                </div>
            )}

            <Search setSearchTerm={setSearchTerm} />

            <button
                className="filters-toggle-button"
                onClick={() => setFiltersExpanded(!filtersExpanded)}
            >
                {filtersExpanded ? 'Hide Filters' : 'Show Filters'}
            </button>

            <div className={`filters ${filtersExpanded ? 'expanded' : 'collapsed'}`}>
                <label>
                    Author:
                    <input
                        type="text"
                        value={authorFilter}
                        onChange={(e) => setAuthorFilter(e.target.value)}
                    />
                </label>
                <label>
                    Publication Year:
                    <input
                        type="range"
                        min="1800"
                        max="2024"
                        step="1"
                        value={yearRange[0]}
                        onChange={(e) => setYearRange([Number(e.target.value), yearRange[1]])}
                    />
                    <input
                        type="range"
                        min="1800"
                        max="2024"
                        step="1"
                        value={yearRange[1]}
                        onChange={(e) => setYearRange([yearRange[0], Number(e.target.value)])}
                    />
                    <div className="year-range-display">
                        <span>{yearRange[0]}</span> - <span>{yearRange[1]}</span>
                    </div>
                </label>
            </div>

            <div className="content-container">
                <BookList books={currentBooks} isMobile={isMobile} highlightText={highlightText} />
                <Pagination
                    booksPerPage={booksPerPage}
                    totalBooks={filteredBooks.length}
                    paginate={paginate}
                    currentPage={currentPage}
                />
            </div>

            {showModal && (
                <div className="modal">
                    <div className="modal-content">
                        <span className="close-button" onClick={handleCloseModal}>
                            &times;
                        </span>
                        <h2>Add New Book</h2>
                        <form onSubmit={handleSubmit} className="add-book-form">
                            <label>
                                Title:
                                <input
                                    type="text"
                                    name="title"
                                    value={newBook.title}
                                    onChange={handleInputChange}
                                    required
                                />
                            </label>
                            <label>
                                Author:
                                <input
                                    type="text"
                                    name="author"
                                    value={newBook.author}
                                    onChange={handleInputChange}
                                    required
                                />
                            </label>
                            <label>
                                Image URL:
                                <input
                                    type="url"
                                    name="imageUrl"
                                    value={newBook.imageUrl}
                                    onChange={handleInputChange}
                                    required
                                />
                            </label>
                            <label>
                                Published Date:
                                <input
                                    type="text"
                                    name="publishedDate"
                                    value={newBook.publishedDate}
                                    onChange={handleInputChange}
                                    required
                                />
                            </label>
                            <label>
                                Genre:
                                <input
                                    type="text"
                                    name="genre"
                                    value={newBook.genre}
                                    onChange={handleInputChange}
                                    required
                                />
                            </label>
                            <label>
                                Description:
                                <textarea
                                    name="description"
                                    value={newBook.description}
                                    onChange={handleInputChange}
                                    required
                                />
                            </label>
                            <button type="submit" className="submit-button">
                                Add Book
                            </button>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default BooksPage;
