import React from 'react';
import ReviewList from '../components/ReviewList';

import Auth from '../utils/auth';
import { useQuery } from '@apollo/client';
import { QUERY_MAIDS, QUERY_MAID, QUERY_REVIEWS } from '../utils/queries';

const MaidList = () => {
    const { loading, data } = useQuery(QUERY_REVIEWS);
    const { data: maidData } = useQuery(QUERY_MAID);

    //Need to figure out how to import list of maids in drop down enter here

    const reviews = data?.reviews || [];

    const loggedIn = Auth.loggedIn();

    return (
        <div>
            <h1>Maid Reviews</h1>
            <h3>Please select a maid</h3>
            <div class="dropdown">
                <button class="dropbtn">Select</button>
                    <div class="dropdown-content">
                        {/* need to connect to each maid will need 
                        to fineturn or even convert to switch
                        <a href="#">Link 1</a>
                        <a href="#">Link 2</a>
                        <a href="#">Link 3</a> */}
                    </div>
                </div>

                <div>
                    <h3>{uername.Maid}</h3>
                </div>
                <div>
                    <ReviewList
                        reviews={reviews}
                    />
                </div>
        </div>
    )
}