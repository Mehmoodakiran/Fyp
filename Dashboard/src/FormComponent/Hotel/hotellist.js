import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHotel } from '@fortawesome/free-solid-svg-icons';
import { DataGrid } from '@mui/x-data-grid';
import axios from 'axios';
import { Box } from '@mui/material';
import './hotellist.css';

function HotelList() {
  const [hotelList, setHotelList] = useState([]);
  const [isLoading, setLoading] = useState(true);

  const apiUrl = 'http://localhost:8800/api/hotels/';

  useEffect(() => {
    getHotels();
  }, []);

  const getHotels = async () => {
    try {
      const response = await axios.get(apiUrl, { withCredentials: true });
      const hotelsWithCommentsAndRatings = await Promise.all(response.data.map(async (hotel) => {
        // Fetch comments for each hotel
        const comments = await fetchComments(hotel._id, hotel.comments);
        // Fetch ratings for each hotel
        const ratings = await fetchRatings(hotel._id);
        return {
          ...hotel,
          comments: comments.map(comment => ({
            _id: comment._id,
            userName: comment.userName,
            text: comment.text,
          })),
          ratings,
        };
      }));

      setHotelList(hotelsWithCommentsAndRatings);

      setLoading(false);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchRatings = async (hotelId) => {
    try {
      const response = await axios.get(`http://localhost:8800/api/review/${hotelId}/ratings`);
      console.log("fetchRatings response:", response);

      if (response.status === 200) {
        const ratingsArray = Array.isArray(response.data) ? response.data : [response.data];

        console.log("ratingsArray", ratingsArray);

        return ratingsArray.map((rating) => {
          console.log("Rating:", rating);
          return {
            _id: rating ? rating._id : null,
            userName: rating ? rating.userName : null,
            value: rating ? rating.value : null, // Replace 'extractedValue' with the actual property name
          };
        });

      } else {
        console.error('Error fetching ratings:', response.statusText);
        return [];
      }
    } catch (error) {
      console.error('Error fetching ratings:', error.message);
      return [];
    }
  };

  const fetchComments = async (hotelId, commentIds) => {
    try {
      const response = await axios.get(`http://localhost:8800/api/review/${hotelId}/comments`, {
        params: {
          commentIds: commentIds.join(',')
        }
      });

      return response.data;
    } catch (error) {
      console.error('Error fetching comments:', error.message);
      return [];
    }
  };

  const getRowId = (row) => row._id;

  const columns = [
    { field: 'distance', headerName: 'Owner Name', flex: 1, minWidth: 100 },
    { field: 'name', headerName: 'Hotel Name', flex: 1, minWidth: 100 },
    { field: 'type', headerName: 'Type', flex: 1, minWidth: 100 },
    { field: 'city', headerName: 'City', flex: 1, minWidth: 100 },
    { field: 'address', headerName: 'Address', flex: 1, minWidth: 100 },
    { field: 'title', headerName: 'Title', flex: 1, minWidth: 100 },
    { field: 'desc', headerName: 'Description', flex: 2, minWidth: 200 },
    { field: 'cheapestPrice', headerName: 'Cheapest Price', flex: 2, minWidth: 100 },
    {
      field: 'comments',
      headerName: 'Comments',
      flex: 2,
      minWidth: 200,
      renderCell: (params) => (
        <ul style={{ listStyleType: 'none', padding: 0, margin: 0 }}>
          {params.row.comments.map((comment, index) => (
            <li key={index} style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
              <strong>{comment.userName}:</strong> {comment.text}
            </li>
          ))}
        </ul>
      ),
    },
    {
      field: 'actions',
      headerName: 'Actions',
      width: 200,
      renderCell: (params) => (
        <div className="action-buttons">
          <Link to={`/portal/hotel-view/${params.row._id}`} className="btn btn-primary btn-sm mr-2">
            View
          </Link>
          <Link to={`/portal/hotels-edit/${params.row._id}`} className="btn btn-info btn-sm mr-2">
            Edit
          </Link>
          <button onClick={() => handleDelete(params.row._id)} className='btn btn-danger btn-sm'>Delete</button>
        </div>
      ),
    },
  ];

  const handleDelete = async (id) => {
    const deleteUrl = `${apiUrl}/${id}`;
    try {
      const confirmDelete = window.confirm("Are you sure you want to delete the data?");
      if (confirmDelete) {
        await axios.delete(deleteUrl);
        getHotels();
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="booking-list-container">
    <div className="data-grid">
      <h3 className="h3 mb-0 text-gray-800">Hotel List</h3>
      <Link to="/portal/create-hotel" className="d-none d-sm-inline-block btn btn-sm btn-primary shadow-s">
        <FontAwesomeIcon icon={faHotel} className="creatinguser mr-2" />
        Create Hotel
      </Link>
    </div>
    <div className="data-grid">
      {isLoading ? (
        // Show a loading spinner or message
        <p>Loading...</p>
      ) : (
        <DataGrid
          rows={hotelList}
          columns={columns}
          pageSize={5}
          loading={isLoading}
          getRowId={getRowId}
          rowHeight={100} // Adjust the height as needed
        />
      )}
    </div>
  </div>
);
}

export default HotelList;
  

// import React, { useEffect, useState } from 'react';
// import { Link } from 'react-router-dom';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faHotel } from '@fortawesome/free-solid-svg-icons';
// import { DataGrid } from '@mui/x-data-grid';
// import axios from 'axios';

// function HotelList() {
//   const [hotelList, setHotelList] = useState([]);
//   const [isLoading, setLoading] = useState(true);

//   const apiUrl = 'http://localhost:8800/api/hotels/';

//   useEffect(() => {
//     getHotels();
//   }, []);

//   let getHotels = async () => {
//     try {
//       const hotels = await axios.get(apiUrl, { withCredentials: true });
//       setHotelList(hotels.data);
//       setLoading(false);
//     } catch (error) {
//       console.error(error);
//     }
//   }

//   const getRowId = (row) => row._id;

//   const columns = [
//     { field: 'distance', headerName: 'Owner Name', flex: 1 },
//     { field: 'name', headerName: 'Hotel Name', flex: 1 },
//     { field: 'type', headerName: 'Type', flex: 1 },
//     { field: 'city', headerName: 'City', flex: 1 },
//     { field: 'address', headerName: 'Address', flex: 1 },
//     { field: 'title', headerName: 'Title', flex: 1 },
//     { field: 'desc', headerName: 'Description', flex: 1 },
//     { field: 'cheapestPrice', headerName: 'Cheapest Price', flex: 1 },
//     { field: 'featured', headerName: 'Featured', flex: 1 },
//     {
//       field: 'comments',
//       headerName: 'Comments',
//       flex: 1,
//       renderCell: (params) => (
//         <ul>
//           {params.row.comments.map((comment, index) => (
//             <li key={index}>{`Comment ${index + 1}: ${comment.text}`}</li>
//           ))}
//         </ul>
//       ),
//     },
//     // { field: 'rooms', headerName: 'Rooms', flex: 1, renderCell: (params) => (
//     //   <ul>
//     //     {params.row.rooms.map((room, index) => (
//     //       <li key={index}>{`Room ${index + 1}: ${room.title}`}</li>
//     //     ))}
//     //   </ul>
//     // )},
//     // {
//     //   field: 'photos',
//     //   headerName: 'Photos',
//     //   flex: 1,
//     //   renderCell: (params) => (
//     //     <div className="photos-cell">
//     //       {params.row.photos.map((photo, index) => (
//     //         <img key={index} src={photo} alt={`Photo ${index}`} className="hotel-photo" />
//     //       ))}
//     //     </div>
//     //   ),
//     // },
//     {
//       field: 'actions',
//       headerName: 'Actions',
//       width: 200,
//       renderCell: (params) => (
//         <div className="action-buttons">
//           <Link to={`/portal/hotel-view/${params.row._id}`} className='btn btn-primary btn-sm'>View</Link>
//           <Link to={`/portal/hotels-edit/${params.row._id}`} className='btn btn-info btn-sm'>Edit</Link>
//           <button onClick={() => handleDelete(params.row._id)} className='btn btn-danger btn-sm'>Delete</button>
//         </div>
//       ),
//     },
//   ];

//   let handleDelete = async (id) => {
//     const deleteUrl = `${apiUrl}/${id}`;
//     try {
//       const confirmDelete = window.confirm("Are you sure you want to delete the data?");
//       if (confirmDelete) {
//         await axios.delete(deleteUrl);
//         getHotels();
//       }
//     } catch (error) {
//       console.error(error);
//     }
//   }

//   return (
//     <div className="hotel-list-container">
//       <div className="d-sm-flex align-items-center justify-content-between mb-4">
//         <h3 className="h3 mb-0 text-gray-800">Hotel</h3>
//         <Link to="/portal/create-hotel" className="d-none d-sm-inline-block btn btn-sm btn-primary shadow-sm">
//           <FontAwesomeIcon icon={faHotel} className="creatinguser mr-2" />
//           Create Hotel
//         </Link>
//       </div>
//       <div className="data-grid">
//         <DataGrid
//           rows={hotelList}
//           columns={columns}
//           pageSize={5}
//           loading={isLoading}
//           getRowId={getRowId}
//         />
//       </div>
//     </div>
//   );
// }

// export default HotelList;
