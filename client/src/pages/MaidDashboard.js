import React from 'react';
import { Redirect, useParams } from 'react-router-dom';

//if we get multiple maids schedules working use below so maid can see cleanings scheduled 
//import BookingList from '../components/BookingList';

import Rating from '../components/Rating';
import ReviewList from '../components/ReviewList';

import { useQuery, useMutation } from '@apollo/client';
import Auth from '../utils/auth';

//import in utils/mutations and queries if needed as buildout progresses
import { ADD_RATING } from '../utils/mutations';
import { QUERY_EMPL, QUERY_MAID } from '../utils/queries';

const MaidDashboard = (props) => {
    const { username: userParam } = useParams();
    const [addRating] = useMutation(ADD_RATING);

    const { loading, data } = useQuery(userParam ? QUERY_MAID : QUERY_EMPL, {
        variables: { username: userParam },
      });

    if (!maid?.name) {
        return (
            <h4>Please login to view your employee dashboard</h4>
        );
    }

    return (
        <div>

        </div>
    );
};

export default MaidDashboard;
