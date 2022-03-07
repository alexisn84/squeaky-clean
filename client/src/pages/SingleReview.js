import React from 'react';
import { useParams } from 'react-router-dom';

import ReactionList from '../components/ReactionList';
import ReactionForm from '../components/ReactionForm';

import Auth from '../utils/auth';
import { useQuery } from '@apollo/client';
import { QUERY_REVIEW } from '../utils/queries';

const SingleReview = (props) => {

    return (
        <div></div>
    );
};

export default SingleReview;