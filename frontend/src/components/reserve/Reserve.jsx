import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleXmark } from "@fortawesome/free-solid-svg-icons";
import "./reserve.css";
import useFetch from "../../hooks/useFetch";
import { useContext, useState } from "react";
import { SearchContext } from "../../context/SearchContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Reserve = ({ setOpen, hotelId ,hotelName}) => {
  const [selectedRooms, setSelectedRooms] = useState([]);
  const { data, loading, error } = useFetch(`/hotels/room/${hotelId}`);
  const { dates } = useContext(SearchContext);
  const user= localStorage.getItem("user") ;
const username = JSON.parse(user)
  console.log("dATAAAAA", data);
  console.log("aelected dates", dates);

  const datesInRange = (dateArray) => {
    const startDate = new Date(dates[0]?.startDate);
    const endDate = new Date(dates[0]?.endDate);

    const datesWithinRange = dateArray.filter((date) => {
      date = new Date(date);
      return date >= startDate && date <= endDate;
    });

    return datesWithinRange;
  };

  const getDatesInRange = (startDate, endDate) => {
    const start = new Date(startDate);
    const end = new Date(endDate);
    const date = new Date(start.getTime());

    const dates = [];

    while (date <= end) {
      dates.push(new Date(date).getTime());
      date.setDate(date.getDate() + 1);
    }

    return dates;
  };

  const alldates = getDatesInRange(dates[0].startDate, dates[0].endDate);

  const isAvailable = (roomNumber) => {
    const availabileDates = datesInRange(roomNumber.unavailableDates);

    if (availabileDates.length > 0) {
      return true;
    } else {
      return false;
    }
  };

  const handleSelect = (e) => {
    const checked = e.target.checked;
    const value = e.target.value;
    setSelectedRooms(
      checked
        ? [...selectedRooms, value]
        : selectedRooms.filter((item) => item !== value)
    );
  };

  const [reservationSuccess, setReservationSuccess] = useState(false);

  const handleClick = async () => {
    try {
      const res = await Promise.all(
        selectedRooms.map((roomId) => {
          return axios.put(`http://localhost:8800/api/rooms/availability/${roomId}`, {
            dates: alldates,
          });
        })
      );
      
      const apiUrl = 'http://localhost:8800/api/bookings';
      await Promise.all(
        selectedRooms.map((roomId) => {
          console.log(("promise id", roomId))
          return   axios.post(apiUrl, {
            hotelName: hotelName,
            roomName: roomId || hotelName + " Room",
            userName: username?.username,
            // maxPeople: data.find((item) => item.roomNumbers.some(room => room._id === roomId))?.maxPeople,
            // price: data.find((item) => item.roomNumbers.some(room => room._id === roomId))?.price,
            toDate: dates?.startDate || new Date(), // Update values here
            fromDate: dates?.endDate || new Date(), // Update values here
          }, {
            withCredentials: true,
            headers: {
              'Content-Type': 'application/json',
            },
          });
        })
      );
     
      const isSuccess = res.every((response) => response.status === 200);
  
      if (isSuccess) {
     
  
        
        setOpen(false);
        alert("Hotel reserved succesfullyy","Cancel")
        setReservationSuccess(true);
        setTimeout(() => {
          setReservationSuccess(false);
          navigate("/");
        }, 3000);
      }
    } catch (err) {
      console.error("Error occurred: ", err);
    }
  };
  

  const navigate = useNavigate();

  return(
    <div className="reserve">
      <div className="rContainer">
        <FontAwesomeIcon
          icon={faCircleXmark}
          className="rClose"
          onClick={() => setOpen(false)}
        />
        <span>Select your rooms:</span>
        {data.map((item) => (
          <div className="rItem" key={item._id}>
            <div className="rItemInfo">
              <div className="rTitle">{item.title}</div>
              <div className="rDesc">{item.desc}</div>
              <div className="rMax">
                Max people: <b>{item.maxPeople}</b>
              </div>
              <div className="rPrice">{item.price}</div>
            </div>
            <div className="rSelectRooms">
              {item.roomNumbers.map((roomNumber) => (
                <div className="room" key={roomNumber._id}>
                  <label>{roomNumber.number}</label>
                  <input
                    type="checkbox"
                    value={roomNumber._id}
                    defaultChecked={isAvailable(roomNumber)}
                    onChange={handleSelect}
                    disabled={isAvailable(roomNumber)}
                  />
                </div>
              ))}
            </div>
          </div>
        ))}
        <button onClick={handleClick} className="rButton">
          Reserve Now!
        </button>
        
      </div>
    </div>
  );
};

export default Reserve;


// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faCircleXmark } from "@fortawesome/free-solid-svg-icons";

// import "./reserve.css";
// import useFetch from "../../hooks/useFetch";
// import { useContext, useState } from "react";
// import { SearchContext } from "../../context/SearchContext";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";

// const Reserve = ({ setOpen, hotelId }) => {
//   const [selectedRooms, setSelectedRooms] = useState([]);
//   const { data, loading, error } = useFetch(`/hotels/room/${hotelId}`);
//   const { dates } = useContext(SearchContext);
// console.log("dATAAAAA",data)
// console.log("aelected dates",dates)
// const datesInRange = ( dateArray) => {
//   // Convert the start and end dates to Date objects
//   const startDate = new Date(dates[0]?.startDate);
//   const endDate = new Date(dates[0]?.endDate);

//   // Filter the array of dates to keep only those within the date range
//   const datesWithinRange = dateArray.filter(date => {
//     date = new Date(date);

//     return date >= startDate && date <= endDate;
//   });

//   return datesWithinRange;
// };

//   const getDatesInRange = (startDate, endDate) => {
//     const start = new Date(startDate);
//     const end = new Date(endDate);

//     const date = new Date(start.getTime());

//     const dates = [];

//     while (date <= end) {
//       dates.push(new Date(date).getTime());
//       date.setDate(date.getDate() + 1);
//     }

//     return dates;
//   };

//   const alldates = getDatesInRange(dates[0].startDate, dates[0].endDate);

//   const isAvailable = (roomNumber) => {
//    const availabileDates = datesInRange(roomNumber.unavailableDates)
//     // const isFound = roomNumber.unavailableDates.some((date) =>
//     //   alldates.includes(new Date(date).getTime())
//     // );
//     console.log("availabe datees ",availabileDates)
// if(availabileDates.length >0){
//   return true
// }else{
//   return false
// }
//     // return !isFound;{}
//   };

//   const handleSelect = (e) => {
//     const checked = e.target.checked;
//     const value = e.target.value;
//     setSelectedRooms(
//       checked
//         ? [...selectedRooms, value]
//         : selectedRooms.filter((item) => item !== value)
//     );
//   };

//   const navigate = useNavigate();

//   const handleClick = async () => {
//     try {
//   //  await axios.put('')
//       await Promise.all(
//         selectedRooms.map((roomId) => {
//           const res = axios.put(`http://localhost:8800/api/rooms/availability/${roomId}`, {
//             dates: alldates,
//           });
//           return res.data;
//         })
//       );
//       setOpen(false);
//       //message heree
//       navigate("/");
//     } catch (err) {}
//   };
//   return (
//     <div className="reserve">
//       <div className="rContainer">
//         <FontAwesomeIcon
//           icon={faCircleXmark}
//           className="rClose"
//           onClick={() => setOpen(false)}
//         />
//         <span>Select your rooms:</span>
//         {data.map((item) => (
//           <div className="rItem" key={item._id}>
//             <div className="rItemInfo">
//               <div className="rTitle">{item.title}</div>
//               <div className="rDesc">{item.desc}</div>
//               <div className="rMax">
//                 Max people: <b>{item.maxPeople}</b>
//               </div>
//               <div className="rPrice">{item.price}</div>
//             </div>
//             <div className="rSelectRooms">
//               {item.roomNumbers.map((roomNumber) => (
//                 <div className="room">
//                   <label>{roomNumber.number}</label>
//                   <input
//                     type="checkbox"
//                     value={roomNumber._id}
//                     defaultChecked={isAvailable(roomNumber)}
//                     onChange={handleSelect}
//                     disabled={isAvailable(roomNumber)}
//                   />
//                 </div>
//               ))}
//             </div>
//           </div>
//         ))}
//         <button onClick={handleClick} className="rButton">
//           Reserve Now!
//         </button>
//       </div>
//     </div>
//   );
// };

// export default Reserve;


// // import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// // import { faCircleXmark } from "@fortawesome/free-solid-svg-icons";

// // import "./reserve.css";
// // import useFetch from "../../hooks/useFetch";


// // const Reserve = ({ setOpen, hotelId }) => {
 
// //   const { data, loading, error } = useFetch(`/hotels/room/${hotelId}`);
 
// //   return (
// //     <div className="reserve">
// //       <div className="rContainer">
// //         <FontAwesomeIcon
// //           icon={faCircleXmark}
// //           className="rClose"
// //           onClick={() => setOpen(false)}
// //         />
// //         <span>Select your rooms:</span>
// //         {data.map((item) => (
// //           <div className="rItem" key={item._id}>
// //             <div className="rItemInfo">
// //               <div className="rTitle">{item.title}</div>
// //               <div className="rDesc">{item.desc}</div>
// //               <div className="rMax">
// //                 Max people: <b>{item.maxPeople}</b>
// //               </div>  
// //               <div className="room">
// //               </div>
// //             </div>
// //           </div>
// //         ))}
      
// //       </div>
// //     </div>
// //   );
// // };

// // export default Reserve;
