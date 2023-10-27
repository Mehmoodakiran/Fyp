import React from 'react';
import './Destinations.scss'
import shingrilla from '../../Images/shingrilla.jpg'
import img2 from '../../Images/img2.jpg'
import img3 from '../../Images/img2.jpg'
import Footer from "../../components/footer/Footer";
import Navbar from "../../components/navbar/Navbar";
import { Link,useNavigate } from 'react-router-dom';
const destinations = [
  {
    id: 1,
    name: 'Shingrilla Hotel',
    image: shingrilla,
    description:
      'Skardu is a beautiful town in Pakistan and is known for its stunning landscapes, including mountains, lakes, and valleys.',
  },
  {
    id: 2,
    name: 'Khaplu',
    image: img3,
    description:
      'Khaplu is a picturesque town in Pakistan, offering breathtaking views and a peaceful atmosphere.',
  },
  {
    id: 3,
    name: 'Shigar',
    image: shingrilla,
    description:
      'Shigar is a historic town in Pakistan, famous for its ancient architecture and cultural heritage.',
  },
  {
    id: 4,
    name: 'kharmang',
    image: shingrilla,
    description:
      'kharmang is a serene village in Pakistan with lush green landscapes and a tranquil environment.',
  },
  // Add more destinations here
];

const DestinationList = () => {
  return (
    <div>
    <Navbar />
  
    <div className="destination-list">
      {destinations.map((destination) => (
        <div key={destination.id} className="destination">
          <img src={destination.image} alt={destination.name} />
          <hr/>
          <h2>{destination.name}</h2>
          <hr />
          <p>{destination.description}</p>
        </div>
      ))}
    </div>
    <Footer/>
    </div>
  );
};

export default DestinationList;

// import React from 'react';
// import './Destinations.scss'
// //imported images===================>
// import img from '../../Images/img.jpg'
// // import Dubia from '../Images/Dubia.jpg';
// // import London from '../Images/London.png';
// // import Iran from '../Images/Iran.jpg';

// const destinations = [
//   {
//     id: 1,
//     name: 'Paris',
//     image: img,
//     description:
//       'Paris is the capital of France and is known for its romantic atmosphere, world-class art, and delicious cuisine.',
//   },
//   {
//     id: 2,
//     name: 'London',
//     image: img,
//     description:
//       'Tokyo is the capital of Japan and is famous for its modern technology, historic temples, and vibrant street life.',
//   },
//   {
//     id: 3,
//     name: 'Dubia',
//     image: img,
//     description:
//       'Paris is the capital of France and is known for its romantic atmosphere, world-class art, and delicious cuisine.',
//   },
//   {
//     id: 4,
//     name: 'Iran',
//     image: img,
//     description:
//       'Tokyo is the capital of Japan and is famous for its modern technology, historic temples, and vibrant street life.',
//   },
//   {
//     id: 5,
//     name: 'Paris',
//     image: img,
//     description:
//       'Paris is the capital of France and is known for its romantic atmosphere, world-class art, and delicious cuisine.',
//   },
//   {
//     id: 6,
//     name: 'London',
//     image: img,
//     description:
//       'Tokyo is the capital of Japan and is famous for its modern technology, historic temples, and vibrant street life.',
//   },
//   {
//     id: 7,
//     name: 'Dubia',
//     image: img,
//     description:
//       'Paris is the capital of France and is known for its romantic atmosphere, world-class art, and delicious cuisine.',
//   },
//   {
//     id: 8,
//     name: 'Iran',
//     image: img,
//     description:
//       'Tokyo is the capital of Japan and is famous for its modern technology, historic temples, and vibrant street life.',
//   },
//   // Add more destinations here
// ];

// const DestinationList = () => {
//   return (
//     <div className="destination-list">
//       {destinations.map((destination) => (
//         <div key={destination.id} className="destination">
//           <img src={destination.image} alt={destination.name} />
//           <hr/>
//           <h2>{destination.name}</h2>
//           <hr />
//           <p>{destination.description}</p>
//         </div>
//       ))}
//     </div>
//   );
// };

// export default DestinationList;
