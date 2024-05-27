import React from 'react';
; // Make sure to import the CSS file

const StarRating = ({ rating }) => {
    const maxStars = 5; // Maximum number of stars

    return (
        <div className="star-rating">
            {Array.from({ length: maxStars }, (v, i) => (
                <span key={i} className={i < rating ? 'star filled' : 'star'}>
                    &#9733;
                </span>
            ))}
        </div>
    );
};

export default StarRating;
