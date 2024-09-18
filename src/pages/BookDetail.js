import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import './BookDetails.css';
import { getBookById, addReview, deleteBook, updateBook } from '../services/bookService';
import StarRating from './StarRating';

const BookDetail = () => {
    const { id } = useParams();
    const [book, setBook] = useState(null);
    const [rating, setRating] = useState(1);
    const [comment, setComment] = useState('');
    const [user, setUser] = useState(null); // Get user information
    const [averageRating, setAverageRating] = useState(null); // Store average rating
    const [showDeleteModal, setShowDeleteModal] = useState(false); // For delete confirmation
    const [showEditModal, setShowEditModal] = useState(false); // For editing book details
    const [editedBook, setEditedBook] = useState({
        title: '',
        author: '',
        genre: '',
        description: '',
        imageUrl: '',
        publishedDate: '' // Add publishedDate to editedBook state
    });

    useEffect(() => {
        const fetchBook = async () => {
            try {
                const data = await getBookById(id);
                setBook(data);
                setEditedBook(data); // Set initial values for edit
                calculateAverageRating(data.reviews); // Calculate the average rating when book data is fetched
            } catch (error) {
                console.error('Error fetching book details:', error);
            }
        };

        fetchBook();
    }, [id]);

    useEffect(() => {
        const fetchUser = () => {
            const storedUser = localStorage.getItem('user');
            if (storedUser) {
                setUser(storedUser);
            } else {
                setUser(null);
            }
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

    const calculateAverageRating = (reviews) => {
        if (reviews && reviews.length > 0) {
            const totalRating = reviews.reduce((sum, review) => sum + review.rating, 0);
            const avgRating = totalRating / reviews.length;
            setAverageRating(avgRating.toFixed(1));
        } else {
            setAverageRating(null);
        }
    };

    const handleSubmitReview = async (e) => {
        e.preventDefault();

        if (!user) {
            alert('You must be logged in to submit a review.');
            return;
        }

        try {
            await addReview(id, { rating, comment });
            const data = await getBookById(id);
            setBook(data);
            setRating(1);
            setComment('');
        } catch (error) {
            console.error('Error submitting review:', error);
        }
    };

    const handleDeleteBook = async () => {
        try {
            await deleteBook(id);
            alert('Book deleted successfully!');
        } catch (error) {
            console.error('Error deleting book:', error);
        } finally {
            setShowDeleteModal(false);
        }
    };

    const handleUpdateBook = async (e) => {
        e.preventDefault();

        try {
            await updateBook(id, editedBook);
            alert('Book updated successfully!');
            const data = await getBookById(id);
            setBook(data);
            setShowEditModal(false); // Close modal
        } catch (error) {
            console.error('Error updating book:', error);
        }
    };

    if (!book) return <p>Loading...</p>;

    return (
        <>
            <div className="flex-2">
                <div className="book-detail-container">
                    <div className="book-cover">
                        <img src={book.imageUrl} alt={`${book.title} cover`} className="cover-image" />
                    </div>
                    <div className="book-info">
                        <h4 className="book-title">{book.title}</h4>
                        <p className="book-author"><strong>Author:</strong> {book.author}</p>
                        <p className="book-genre"><strong>Genre:</strong> {book.genre}</p>
                        <p className="book-published-date"><strong>Published Date:</strong> {book.publishedDate || 'N/A'}</p> {/* Display publishedDate */}
                        <div className="book-rating">
                            <strong>Rating:</strong> {averageRating ? `${averageRating} / 5` : 'Not rated yet'}
                        </div>
                        {user && (
                            <div className="book-actions">
                                <button onClick={() => setShowEditModal(true)} className="edit-button">Edit</button>
                                <button onClick={() => setShowDeleteModal(true)} className="delete-button">Delete</button>
                            </div>
                        )}
                    </div>
                </div>

                <form onSubmit={handleSubmitReview} className="review-form">
                    <h5>Write a Review:</h5>
                    <div className="form-group">
                        <label htmlFor="rating">Rating:</label>
                        <StarRating rating={rating} setRating={setRating} editable />
                    </div>
                    <div className="form-group">
                        <label htmlFor="comment">Comment:</label>
                        <textarea
                            id="comment"
                            value={comment}
                            onChange={(e) => setComment(e.target.value)}
                            required
                        ></textarea>
                    </div>
                    <button type="submit">Submit Review</button>
                </form>

                {/* Delete Confirmation Modal */}
                {showDeleteModal && (
                    <div className="modal">
                        <div className="modal-content">
                            <span className="close-button" onClick={() => setShowDeleteModal(false)}>&times;</span>
                            <h2>Confirm Deletion</h2>
                            <p>Are you sure you want to delete this book?</p>
                            <div className='button-container'>
                                <button onClick={handleDeleteBook} className="confirm-delete">Yes, Delete</button>
                                <button onClick={() => setShowDeleteModal(false)} className="cancel-delete">Cancel</button>
                            </div>
                        </div>
                    </div>
                )}

                {/* Edit Book Modal */}
                {showEditModal && (
                    <div className="modal">
                        <div className="modal-content">
                            <span className="close-button" onClick={() => setShowEditModal(false)}>&times;</span>
                            <h2>Edit Book Details</h2>
                            <form onSubmit={handleUpdateBook} className="edit-book-form">
                                <label>
                                    Title:
                                    <input
                                        type="text"
                                        name="title"
                                        value={editedBook.title}
                                        onChange={(e) => setEditedBook({ ...editedBook, title: e.target.value })}
                                        required
                                    />
                                </label>
                                <label>
                                    Author:
                                    <input
                                        type="text"
                                        name="author"
                                        value={editedBook.author}
                                        onChange={(e) => setEditedBook({ ...editedBook, author: e.target.value })}
                                        required
                                    />
                                </label>
                                <label>
                                    Image URL:
                                    <input
                                        type="url"
                                        name="imageUrl"
                                        value={editedBook.imageUrl}
                                        onChange={(e) => setEditedBook({ ...editedBook, imageUrl: e.target.value })}
                                        required
                                    />
                                </label>
                                <label>
                                    Genre:
                                    <input
                                        type="text"
                                        name="genre"
                                        value={editedBook.genre}
                                        onChange={(e) => setEditedBook({ ...editedBook, genre: e.target.value })}
                                        required
                                    />
                                </label>
                                <label>
                                    Description:
                                    <textarea
                                        name="description"
                                        value={editedBook.description}
                                        onChange={(e) => setEditedBook({ ...editedBook, description: e.target.value })}
                                        required
                                    />
                                </label>
                                <label>
                                    Published Date:
                                    <input
                                        type="text"
                                        name="publishedDate"
                                        value={editedBook.publishedDate}
                                        onChange={(e) => setEditedBook({ ...editedBook, publishedDate: e.target.value })}
                                    />
                                </label>
                                <button type="submit" className="submit-button">Update Book</button>
                            </form>
                        </div>
                    </div>
                )}
            </div>
            <div className='flex-2'>
                <div>
                    <h3 className='book-heading'>Description</h3>
                    <p className="book-description">{book.description}</p>
                </div>

                <div className="book-reviews">
                    <h3>Reviews:</h3>
                    {book.reviews && book.reviews.length > 0 ? (
                        book.reviews.map((review) => (
                            <div key={review._id} className="review">
                                <p><strong>{review.user}</strong></p>
                                <StarRating rating={review.rating} />
                                <p>{review.comment}</p>
                            </div>
                        ))
                    ) : (
                        <p>No reviews yet.</p>
                    )}
                </div>
            </div>
        </>
    );
};

export default BookDetail;
