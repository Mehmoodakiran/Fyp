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
      console.log('Params:', params); // Log the params to check if id is present
  
      const response = await axios.get(`http://localhost:8800/api/bookings/${params.id}`, { withCredentials: true });
      console.log('Booking Data:', response.data); // Log the entire response data
  
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
            <Typography variant="h5">User Name: {booking.userName || 'N/A'}</Typography>
            <Typography variant="h5">Hotel Name: {booking.hotelName || 'N/A'}</Typography>
            <Typography variant="h5">Room Name: {booking.roomName || 'N/A'}</Typography>
            <Typography>From Date: {booking.fromDate || 'N/A'}</Typography>
            <Typography>To Date: {booking.toDate || 'N/A'}</Typography>
            {/* Add more details based on your API response */}
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default BookingView;
