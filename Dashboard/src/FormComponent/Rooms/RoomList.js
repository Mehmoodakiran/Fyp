// RoomList.jsx

import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBed } from '@fortawesome/free-solid-svg-icons';
import { DataGrid } from '@mui/x-data-grid';
import axios from 'axios';

function RoomList() {
  const [roomList, setRoomList] = useState([]);
  const [isLoading, setLoading] = useState(true);

  const apiUrl = 'http://localhost:8800/api/rooms/';

  useEffect(() => {
    getRooms();
  }, []);
 
  
  const getRooms = async () => {
    try {
      const rooms = await axios.get(apiUrl, { withCredentials: true });
      setRoomList(rooms.data);
      setLoading(false);
    } catch (error) {
      console.error(error);
    }
  }

  const getRowId = (row) => row._id;

  const columns = [
    { field: 'title', headerName: 'Title', flex: 1 },
    { field: 'price', headerName: 'Price', flex: 1 },
    { field: 'maxPeople', headerName: 'Max People', flex: 1 },
    { field: 'desc', headerName: 'Description', flex: 1 },
    {
      field: 'actions',
      headerName: 'Actions',
      width: 200,
      renderCell: (params) => (
        <div className="action-buttons">
          <Link to={`/portal/room-view/${params.row._id}`} className='btn btn-primary btn-sm'>View</Link>
          <Link to={`/portal/rooms-edit/${params.row._id}`} className='btn btn-info btn-sm'>Edit</Link>
          <button onClick={() => handleDelete(params.row._id)} className='btn btn-danger btn-sm'>Delete</button>
        </div>
      ),
    },
  ];
  const handleDelete = async (id) => {
    try {
      const confirmDelete = window.confirm("Are you sure you want to delete the booking?");
      if (confirmDelete) {
        await axios.delete(`http://localhost:8800/api/rooms/${id}`, { withCredentials: true });
        getRooms();
      }
    } catch (error) {
      console.error(error);
    }
  }
  

  return (
    <div className="room-list-container">
      <div className="d-sm-flex align-items-center justify-content-between mb-4">
        <h3 className="h3 mb-0 text-gray-800">Room</h3>
        <Link to="/portal/create-room" className="d-none d-sm-inline-block btn btn-sm btn-primary shadow-sm">
          <FontAwesomeIcon icon={faBed} className="creatingroom mr-2" />
          Create Room
        </Link>
      </div>
      <div className="data-grid">
        <DataGrid
          rows={roomList}
          columns={columns}
          pageSize={5}
          loading={isLoading}
          getRowId={getRowId}
        />
      </div>
    </div>
  );
}

export default RoomList;
