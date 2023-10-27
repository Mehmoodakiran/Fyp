import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Navbar from '../../components/navbar/Navbar';
import Sidebar from '../../components/sidebar/Sidebar';
import { Card, CardContent, Typography, Grid } from '@mui/material';
import './single.scss';

function Single() {
  const params = useParams();
  const [user, setUser] = useState({});
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    // On Load
    getUsers();
  }, []);
  
  const getUsers = async () => {
    try {
      const response = await axios.get(`http://localhost:8800/api/user/${params.id}`, {
        withCredentials: true,
      });
      console.log(response.data)

      setUser(response.data);
      setLoading(false);

    } catch (error) {
      console.log(error);
    }
  }
  
  console.log("user: ", user)
  // // Define an array of fields to display
  // const fields = [
  //   { label: 'Name', data: user.name },
  //   { label: 'E-Mail', data: user.email },
  //   { label: 'City', data: user.city },
  //   { label: 'State', data: user.state },
  //   { label: 'Country', data: user.country },
  // ];

  return (
    <>
      <Sidebar />
      <Navbar />
      <div>Single - {params.id}</div>
      <Card className="card">
        <CardContent>
          {isLoading ? (
            <img src="https://media.giphy.com/media/ZO9b1ntYVJmjZlsWlm/giphy.gif" alt="Loading" />
          ) : (
            <Typography variant="h5" component="div">
              UserView
            </Typography>
          )}
          <Grid container spacing={2}>
            {Object.keys(user).map((key, index) => (
              <Grid item xs={12} sm={6} key={index}>
                <Card>
                  <CardContent>
                    <Typography variant="h6" gutterBottom>
                      {key}
                    </Typography>
                    {user[key] ? ( // Check if user[key] has a value
                      <Typography variant="body2" color="textSecondary">
                        {user[key]}
                      </Typography>
                    ) : null}
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </CardContent>
      </Card>
    </>
  );
}

export default Single;


// export default Single;
// const Single = () => {
//   return (
//     <div className="single">
//       <Sidebar />
//       <div className="singleContainer">
//         <Navbar />
//         <div className="top">
//           <div className="left">
//             <div className="editButton">Edit</div>
//             <h1 className="title">Information</h1>
//             <div className="item">
//               <img
//                 src="https://images.pexels.com/photos/733872/pexels-photo-733872.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=750&w=1260"
//                 alt=""
//                 className="itemImg"
//               />
//               <div className="details">
//                 <h1 className="itemTitle">Kiran</h1>
//                 <div className="detailItem">
//                   <span className="itemKey">Email:</span>
//                   <span className="itemValue">kiran@gmail.com</span>
//                 </div>
//                 <div className="detailItem">
//                   <span className="itemKey">Phone:</span>
//                   <span className="itemValue">+1 2307 67 89</span>
//                 </div>
//                 <div className="detailItem">
//                   <span className="itemKey">Address:</span>
//                   <span className="itemValue">
//                     Jamia masjid road,skardu
//                   </span>
//                 </div>
//                 <div className="detailItem">
//                   <span className="itemKey">city:</span>
//                   <span className="itemValue">Skardu</span>
//                 </div>
//               </div>
//             </div>
//           </div>
//           <div className="right">
//             <Chart aspect={3 / 1} title="User Spending ( Last 6 Months)" />
//           </div>
//         </div>
//         <div className="bottom">
//         <h1 className="title">Last Transactions</h1>
//           <List/>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Single;
