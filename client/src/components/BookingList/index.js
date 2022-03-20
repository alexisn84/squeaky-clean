import React from "react";
import { Link } from "react-router-dom";

const BookingList = ({ bookings }) => {
    if (!bookings.length) {
        return <h3>No Scheduled Cleanings yet!</h3>;
    }

    return (
        // card
        <div>
            <div>
                <h3>Scheduled Cleanings</h3>
                {bookings &&
                    bookings.map((booking) => {
                        {/* card body */}
                        <div>            
                        <Link to={`/booking/${booking._id}`}>
                            <p>{booking.bookingDate}</p>
                            <p>{booking.bookingTime}</p>
                            </Link>
                    </div>
                    })}
            </div>
        </div>
    );
};

export default BookingList;