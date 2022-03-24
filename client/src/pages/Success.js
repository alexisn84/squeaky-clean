import React, { useEffect } from 'react';
import { idbPromise } from '../utils/helpers';

import useMutation from '@apollo/client';
import { ADD_BOOKING } from '../utils/mutations';

function Success() {
    return (
      <div>
          <div>
        <h1>Success!</h1>
        <h2>Thank you for your purchase!</h2>
        <h2>You will now be redirected to your dashboard</h2>
    </div>
      </div>
    );
  };

  export default Success;