import { React } from 'react';
import { Link } from 'react-router-dom';
import './BookList.css';

const BookList = ({ books }) => {
    const calculateAverageRating = (reviews) => {
        if (reviews && reviews.length > 0) {
            const totalRating = reviews.reduce((sum, review) => sum + review.rating, 0);
            const avgRating = totalRating / reviews.length;
            return avgRating.toFixed(1);
        } else {
            return 'No rating';
        }
    };

    return (
        <div className="book-list-container">
            <ul className="book-list">
                {books.length === 0 ? (
                    <li className="no-books">No books available</li>
                ) : (
                    books.map(book => (
                        <li key={book._id} className="book-item">
                            <Link to={`/books/${book._id}`} className="book-link">
                                <div className="book-image">
                                    <img src={book.imageUrl} alt={book.title} />
                                </div>
                                <div className="book-details">
                                    <p className="book-title">{book.title}</p>
                                    <p className="book-author">{book.author}</p>
                                    <p className="book-rating">
                                        Rating: {calculateAverageRating(book.reviews)} ★
                                    </p>
                                </div>
                            </Link>
                        </li>
                    ))
                )}
            </ul>
        </div>
    );
};

export default BookList;
