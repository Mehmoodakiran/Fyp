import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import {
  Card,
  CardContent,
  CircularProgress,
  Typography,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles({
  // Your styles here
});

function HotelView() {
  const classes = useStyles();
  const params = useParams();
  const [hotel, setHotel] = useState({});
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    getHotelDetails();
  }, []);

  const fetchComments = async (hotelId, commentIds) => {
    try {
      const response = await axios.get(`http://localhost:8800/api/review/${hotelId}/comments`, {
        params: {
          commentIds: commentIds.join(',')
        }
      });

      // Transform the comments structure to match the one in HotelView
      return response.data.map(comment => ({
        _id: comment._id,
        userName: comment.userName,
        text: comment.text,
      }));
    } catch (error) {
      console.error('Error fetching comments:', error.message);
      return [];
    }
  };

  const getHotelDetails = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8800/api/hotels/find/${params.id}`,
        { withCredentials: true }
      );

      // Fetch comments for the hotel
      const comments = await fetchComments(response.data._id, response.data.comments);

      // Set the hotel details along with comments
      setHotel({
        ...response.data,
        comments,
      });

      setLoading(false);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className={classes.hotelViewContainer}>
      <Card className={classes.hotelViewContent}>
        <CardContent>
          <Typography variant="h4" className={classes.title}>
            Hotel Details
          </Typography>
          {isLoading ? (
            <div className={classes.loadingSpinner}>
              <CircularProgress />
            </div>
          ) : (
            <>
              {/* Display the photos as images */}
              {hotel.photos && hotel.photos.length > 0 ? (
                hotel.photos.map((photo, index) => (
                  <img
                    key={index}
                    src={`http://localhost:8800/${photo}`}
                    alt={`Photo ${index + 1}`}
                    className={classes.hotelPhoto}
                  />
                ))
              ) : (
                <Typography variant="body1">No photos available</Typography>
              )}

              <Typography className={classes.details}>
                <strong>Type:</strong> {hotel.type}
              </Typography>
              <Typography className={classes.details}>
                <strong>City:</strong> {hotel.city}
              </Typography>
              <Typography className={classes.details}>
                <strong>Address:</strong> {hotel.address}
              </Typography>
              <Typography className={classes.details}>
                <strong>Owner name:</strong> {hotel.distance}
              </Typography>
              <Typography className={classes.details}>
                <strong>Title:</strong> {hotel.title}
              </Typography>
              <Typography className={classes.details}>
                <strong>Description:</strong> {hotel.desc}
              </Typography>
              <Typography className={classes.details}>
                <strong>Cheapest Price:</strong> {hotel.cheapestPrice}
              </Typography>

              {/* Display comments */}
          
{/* Display comments */}
{hotel.comments && hotel.comments.length > 0 && (
  <div className={classes.commentsContainer}>
    <Typography variant="h5" className={classes.commentsTitle}>
      Comments
    </Typography>
    <ul className={classes.commentsList}>
      {hotel.comments.map((comment, index) => (
        <li key={index} className={classes.commentItem}>
          <strong>{comment.userName}:</strong> {comment.text}
        </li>
      ))}
    </ul>
  </div>
)}

{(!hotel.comments || hotel.comments.length === 0) && (
  <div className={classes.commentsContainer}>
    <Typography variant="h5" className={classes.commentsTitle}>
      No comments available
    </Typography>
  </div>
)}


            </>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

export default HotelView;

// import { makeStyles } from "@material-ui/styles";
// import React, { useState, useEffect } from "react";
// import { useParams, Link } from "react-router-dom";
// import axios from "axios";
// import {
//   Card,
//   CardContent,
//   CircularProgress,
//   Typography,
// } from "@material-ui/core";
// const useStyles = makeStyles({
//   hotelViewContainer: {
//     display: "flex",
//     flexDirection: "column",
//     alignItems: "center",
//     padding: 16,
//   },
//   hotelViewContent: {
//     background: "#fff",
//     boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
//     borderRadius: 10,
//     padding: 16,
//     maxWidth: 600,
//     width: "80%",
//     transition: "transform 0.3s",
//   },
//   loadingSpinner: {
//     display: "flex",
//     justifyContent: "center",
//     alignItems: "center",
//     height: 100,
//   },
//   title: {
//     fontSize: 24,
//     color: "#333",
//   },
//   hotelName: {
//     fontSize: 22,
//     color: "#333",
//     marginTop: 8,
//   },
//   details: {
//     fontSize: 16,
//     margin: "8px 0",
//   },
// });

// // ... (previous imports)

// function HotelView() {
//   const classes = useStyles();
//   const params = useParams();
//   const [hotel, setHotel] = useState({});
//   const [isLoading, setLoading] = useState(true);

//   useEffect(() => {
//     getHotelDetails();
//   }, []);

//   const getHotelDetails = async () => {
//     try {
//       const response = await axios.get(
//         `http://localhost:8800/api/hotels/find/${params.id}`,
//         { withCredentials: true }
//       );
//       setHotel(response.data);
//       setLoading(false);
//     } catch (error) {
//       console.error(error);
//     }
//   };

//   return (
//     <div className={classes.hotelViewContainer}>
//       <Card className={classes.hotelViewContent}>
//         <CardContent>
//           <Typography variant="h4" className={classes.title}>
//             Hotel Details
//           </Typography>
//           {isLoading ? (
//             <div className={classes.loadingSpinner}>
//               <CircularProgress />
//             </div>
//           ) : (
//             <>
//               {/* Display the photos as images */}
//               {hotel.photos && hotel.photos.length > 0 ? (
//                 hotel.photos.map((photo, index) => (
//                   <img
//                     key={index}
//                     src={`http://localhost:8800/${photo}`}
//                     alt={`Photo ${index + 1}`}
//                     className={classes.hotelPhoto}
//                   />
//                 ))
//               ) : (
//                 <Typography variant="body1">No photos available</Typography>
//               )}

             
//               <Typography className={classes.details}>
//                 <strong>Type:</strong> {hotel.type}
//               </Typography>
//               <Typography className={classes.details}>
//                 <strong>City:</strong> {hotel.city}
//               </Typography>
//               <Typography className={classes.details}>
//                 <strong>Address:</strong> {hotel.address}
//               </Typography>
//               <Typography className={classes.details}>
//                 <strong>Owner name:</strong> {hotel.distance}
//               </Typography>
//               <Typography className={classes.details}>
//                 <strong>Title:</strong> {hotel.title}
//               </Typography>
//               <Typography className={classes.details}>
//                 <strong>Description:</strong> {hotel.desc}
//               </Typography>
//               <Typography className={classes.details}>
//                 <strong>cheapest Price:</strong> {hotel.cheapestPrice}
//               </Typography>
              
//               {/* <Typography className={classes.details}>
//                 <strong>Featured:</strong> {hotel.featured ? "Yes" : "No"}
//               </Typography> */}
//               {/* <Typography className={classes.details}>
//                 <strong>Rooms:</strong> {hotel.rooms && hotel.rooms.join(", ")}
//               </Typography> */}
//             </>
//           )}
//         </CardContent>
//       </Card>
//     </div>
//   );
// }

// export default HotelView;
