import { makeStyles } from '@material-ui/styles';
import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import { Card, CardContent, CircularProgress, Typography } from '@material-ui/core';
const useStyles = makeStyles({
  hotelViewContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: 16,
  },
  hotelViewContent: {
    background: '#fff',
    boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
    borderRadius: 10,
    padding: 16,
    maxWidth: 600,
    width: '80%',
    transition: 'transform 0.3s',
  },
  loadingSpinner: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: 100,
  },
  title: {
    fontSize: 24,
    color: '#333',
  },
  hotelName: {
    fontSize: 22,
    color: '#333',
    marginTop: 8,
  },
  details: {
    fontSize: 16,
    margin: '8px 0',
  },
});



// const useStyles = makeStyles((theme) => ({
//   hotelViewContainer: {
//     display: 'flex',
//     justifyContent: 'center',
//   },
//   hotelViewContent: {
//     width: '80%',
//   },
//   title: {
//     textAlign: 'center',
//     marginBottom: theme.spacing(2),
//   },
//   hotelName: {
//     marginBottom: theme.spacing(2),
//   },
//   details: {
//     marginBottom: theme.spacing(1),
//   },
//   loadingSpinner: {
//     display: 'flex',
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
// }));

function HotelView() {
  const classes = useStyles();
  const params = useParams();
  const [hotel, setHotel] = useState({});
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    getHotelDetails();
  }, []);

  const getHotelDetails = async () => {
    try {
      const response = await axios.get(`http://localhost:8800/api/hotels/find/${params.id}`, { withCredentials: true });
      setHotel(response.data);
      setLoading(false);
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div className={classes.hotelViewContainer}>
      <Card className={classes.hotelViewContent}>
        <CardContent>
          <Typography variant="h4" className={classes.title}>Hotel Details</Typography>
          {isLoading ? (
            <div className={classes.loadingSpinner}>
              <CircularProgress />
            </div>
          ) : (
            <>
              <Typography variant="h5" className={classes.hotelName}>{hotel.name}</Typography>
              {/* Add the "Add Room" button with a link to the create room form */}
              <Link to={`/portal/create-room?hotelId=${params.id}`} style={{ textDecoration: 'none' }}>
                <button>Add Room</button>
              </Link>
              <Typography className={classes.details}><strong>Type:</strong> {hotel.type}</Typography>
              <Typography className={classes.details}><strong>City:</strong> {hotel.city}</Typography>
              <Typography className={classes.details}><strong>Address:</strong> {hotel.address}</Typography>
              <Typography className={classes.details}><strong>Distance:</strong> {hotel.distance}</Typography>
              <Typography className={classes.details}><strong>Title:</strong> {hotel.title}</Typography>
              <Typography className={classes.details}><strong>Description:</strong> {hotel.desc}</Typography>
              <Typography className={classes.details}><strong>Cheapest Price:</strong> {hotel.cheapestPrice}</Typography>
              <Typography className={classes.details}><strong>Featured:</strong> {hotel.featured ? 'Yes' : 'No'}</Typography>
              <Typography className={classes.details}><strong>Rooms:</strong> {hotel.rooms && hotel.rooms.join(', ')}</Typography>
              <Typography className={classes.details}><strong>Photos:</strong> {hotel.photos && hotel.photos.join(', ')}</Typography>
            </>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

export default HotelView;

