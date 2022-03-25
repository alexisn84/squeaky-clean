import React, { useState } from 'react';

import { useMutation } from '@apollo/client';

const ReviewForm = () => {
    // update state based on form input changes
    const handleChange = (event) => {

    };

    // submit form
    const handleFormSubmit = async (event) => {

    };

    return (
        <form
            className="flex-row justify-center justify-space-between-md align-stretch"
            onSubmit={handleFormSubmit}
        >
            <textarea
                placeholder="Here's a new thought..."
                value={'thoughtText - remove quotes'}
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