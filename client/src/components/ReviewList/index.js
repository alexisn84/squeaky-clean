import React from 'react';
import { Link } from 'react-router-dom';

const ReviewList = ({ reviews }) => {
    if (!reviews.length) {
        return <h3>No Reviews Yet</h3>
    }

    return (
        <div>
            <h3>Reviews</h3>
            {reviews &&
                reviews.map((review) => (
                    <div>
                        <div>
                            <Link to={`/review/${review._id}`}>
                                <p>{review.reviewText}</p>
                                <p>{review.maid_id}</p>
                                </Link>
                        </div>
                    </div>
                ))}
        </div>
    );
};

export default ReviewList;