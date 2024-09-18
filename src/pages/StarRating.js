import React from 'react';
import './StarRating.css';

const StarRating = ({ rating, setRating, editable = false }) => {
    const handleMouseEnter = (index) => {
        if (editable) {
            document.querySelectorAll('.star').forEach((star, i) => {
                star.classList.toggle('hover', i < index);
            });
        }
    };

    const handleMouseLeave = () => {
        if (editable) {
            document.querySelectorAll('.star').forEach((star) => {
                star.classList.remove('hover');
            });
        }
    };

    const handleClick = (index) => {
        if (editable && setRating) {
            setRating(index);
        }
    };

    return (
        <div className="star-rating" onMouseLeave={handleMouseLeave}>
            {[1, 2, 3, 4, 5].map((star) => (
                <span
                    key={star}
                    className={`star ${star <= rating ? 'filled' : ''}`}
                    onMouseEnter={() => handleMouseEnter(star)}
                    onClick={() => handleClick(star)}
                >
                    &#9733;
                </span>
            ))}
        </div>
    );
};

export default StarRating;
