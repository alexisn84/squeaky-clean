import React, { useState } from 'react';

import { useMutation } from '@apollo/client';
import { ADD_REVIEW } from '../../utils/mutations';
import { QUERY_REVIEWS, QUERY_ME} from '../../utils/queries';

const ReviewForm = () => {

    const [reviewText, setText] = useState('');
    const [characterCount, setCharacterCount] = useState(0);

    const [addReview, { error }] = useMutation(ADD_REVIEW, {
        update(cache, { data: { addReview } }) {
          try {
            const { reviews } = cache.readQuery({ query: QUERY_REVIEWS });
            cache.writeQuery({
              query: QUERY_REVIEWS,
              data: { reviews: [addReview, ...reviews] },
            });
          } catch (e) {
            console.error(e);
          }
    
          // update me object's cache
          const { me } = cache.readQuery({ query: QUERY_ME });
          cache.writeQuery({
            query: QUERY_ME,
            data: { me: { ...me, reviews: [...me.reviews, addReview] } },
          });
        },
      });

    // update state based on form input changes
    const handleChange = (event) => {
        if (event.target.value.length <= 280) {
          setText(event.target.value);
          setCharacterCount(event.target.value.length);
        }
      };

    // submit form
    const handleFormSubmit = async (event) => {
        event.preventDefault();
    
        try {
            
          await addReview({
            variables: { reviewText },
          });

          console.log(reviewText);
          // clear form value
          setText('');
          setCharacterCount(0);
        } catch (e) {
          console.error(e);
        }
      };

    return (
        <form
            className="flex-row justify-center justify-space-between-md align-stretch"
            onSubmit={handleFormSubmit}
        >
            <textarea
                placeholder="Write your review..."
                value={reviewText}
                className="form-input col-12 col-md-9"
                onChange={handleChange}
            ></textarea>
            <button className="btn col-12 col-md-3" type="submit">
                Submit
            </button>
        </form>
    );
};

export default ReviewForm;