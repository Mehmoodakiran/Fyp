import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { Card, CardContent, CircularProgress, Typography } from '@material-ui/core';

const BookingView = () => {
  const params = useParams();
  const [booking, setBooking] = useState({});
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    getBookingDetails();
  }, [params.id]);

  const getBookingDetails = async () => {
    try {
      const response = await axios.get(`http://localhost:8800/api/bookings/${params.id}`, { withCredentials: true });
      setBooking(response.data);
      setLoading(false);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      {isLoading ? (
        <CircularProgress />
      ) : (
        <Card>
          <CardContent>
            <Typography variant="h4">Booking Details</Typography>
            <Typography variant="h5">User Name : {booking.userName || 'N/A'}</Typography>
            <Typography variant="h5">Hotel ID: {booking.hotelId || 'N/A'}</Typography>
            <Typography variant="h5">Room ID: {booking.roomId || 'N/A'}</Typography>
            <Typography>From Date: {booking.fromDate || 'N/A'}</Typography>
            <Typography>To Date: {booking.toDate || 'N/A'}</Typography>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default BookingView;
