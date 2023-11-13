import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendar } from '@fortawesome/free-solid-svg-icons';
import { DataGrid } from '@mui/x-data-grid';
import axios from 'axios';
import { format } from 'date-fns'; // Import format function from date-fns
import { useParams } from "react-router-dom";
function BookingList() {
  const { destination, startDate, endDate, adult, children, room } = useParams();
  const [bookingList, setBookingList] = useState([]);
  const [isLoading, setLoading] = useState(true);

  const apiUrl = 'http://localhost:8800/api/bookings/';

  useEffect(() => {
    getBookings();
  }, []);

 
  const getBookings = async () => {
    try {
      const response = await axios.get(apiUrl, { withCredentials: true });
      const fetchedBookings = response.data; 
  
      const formattedBookings = fetchedBookings.map((booking) => ({
        ...booking,
        startDate: format(new Date(booking.fromDate), 'MM/dd/yyyy'), 
        endDate: format(new Date(booking.toDate), 'MM/dd/yyyy'), 
      }));
  
      setBookingList(formattedBookings);
      setLoading(false);
    } catch (error) {
      console.error(error);
    }
  };
  
  

  const getRowId = (row) => row._id;

  const columns = [
    { field: 'userName', headerName: 'User Name', flex: 1 },
    { field: 'hotelName', headerName: 'Hotel Name', flex: 1 },
    { field: 'roomName', headerName: 'Room Id', flex: 1 },
    { field: 'startDate', headerName: 'Start Date', flex: 1 }, 
    { field: 'endDate', headerName: 'End Date', flex: 1 }, 
    {
      field: 'actions',
      headerName: 'Actions',
      width: 200,
      renderCell: (params) => (
        <div className="action-buttons">
          <Link to={`/portal/booking-view/${params.row._id}`} className='btn btn-primary btn-sm'>View</Link>
          <Link to={`/portal/booking-edit/${params.row._id}`} className='btn btn-info btn-sm'>Edit</Link>
          <button onClick={() => handleDelete(params.row._id)} className='btn btn-danger btn-sm'>Delete</button>
        </div>
      ),
    },
  ];
  

  const handleDelete = async (id) => {
    try {
      const confirmDelete = window.confirm('Are you sure you want to delete the booking?');
      if (confirmDelete) {
        await axios.delete(`http://localhost:8800/api/bookings/${id}`);
        getBookings();
      }
    } catch (error) {
      console.error(error);
    }
  };
  

  return (
    <div className="booking-list-container">
      <div className="d-sm-flex align-items-center justify-content-between mb-4">
        <h3 className="h3 mb-0 text-gray-800">Booking List</h3>
        <Link to="/portal/create-booking" className="d-none d-sm-inline-block btn btn-sm btn-primary shadow-sm">
          <FontAwesomeIcon icon={faCalendar} className="creatingbooking mr-2" />
          Create Booking
        </Link>
      </div>
      <div className="data-grid">
        <DataGrid
          rows={bookingList}
          columns={columns}
          pageSize={5}
          loading={isLoading}
          getRowId={getRowId}
        />
      </div>
    </div>
  );
}

export default BookingList;
