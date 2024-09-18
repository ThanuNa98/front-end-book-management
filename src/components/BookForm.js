import React, { useState, useEffect } from 'react';
import './BookForm.css';

const BookForm = ({ onAddBook, onUpdateBook, editingBook, setEditingBook }) => {
    const [title, setTitle] = useState('');
    const [author, setAuthor] = useState('');
    const [publishedDate, setPublishedDate] = useState('');
    const [rating, setRating] = useState('');

    useEffect(() => {
        if (editingBook) {
            setTitle(editingBook.title || '');
            setAuthor(editingBook.author || '');
            setPublishedDate(editingBook.publishedDate || '');
            setRating(editingBook.rating || '');
        }
    }, [editingBook]);

    const handleSubmit = (e) => {
        e.preventDefault();
        const book = { title, author, publishedDate, rating };

        if (editingBook) {
            onUpdateBook(editingBook._id, book);
            setEditingBook(null);
        } else {
            onAddBook(book);
        }

        setTitle('');
        setAuthor('');
        setPublishedDate('');
        setRating('');
    };

    return (
        <div className="book-form-container">
            <h2 className="form-title">{editingBook ? 'Edit Book' : 'Add New Book'}</h2>
            <form onSubmit={handleSubmit} className="book-form">
                <div className="form-group">
                    <label htmlFor="title">Title</label>
                    <input
                        type="text"
                        id="title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        placeholder="Enter book title"
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="author">Author</label>
                    <input
                        type="text"
                        id="author"
                        value={author}
                        onChange={(e) => setAuthor(e.target.value)}
                        placeholder="Enter author's name"
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="publishedDate">Published Date</label>
                    <input
                        type="date"
                        id="publishedDate"
                        value={publishedDate}
                        onChange={(e) => setPublishedDate(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="rating">Rating</label>
                    <input
                        type="number"
                        id="rating"
                        value={rating}
                        onChange={(e) => setRating(e.target.value)}
                        min="1"
                        max="5"
                        placeholder="Rate between 1 and 5"
                        required
                    />
                </div>
                <div className="form-actions">
                    <button type="submit" className="button primary-button">
                        {editingBook ? 'Update Book' : 'Add Book'}
                    </button>
                    {editingBook && (
                        <button
                            type="button"
                            className="button secondary-button"
                            onClick={() => setEditingBook(null)}
                        >
                            Cancel
                        </button>
                    )}
                </div>
            </form>
        </div>
    );
};

export default BookForm;
