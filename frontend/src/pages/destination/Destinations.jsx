import React from 'react';
import './Destinations.scss';
import shingrilla from '../../Images/shingrilla.jpg';
import shiger from '../../Images/shiger.jpg';
import img3 from '../../Images/img2.jpg';
import video1 from '../../Images/shriglla.mp4';
 // Provide the actual video paths
import Navbar from '../../components/navbar/Navbar';
import { Link, useNavigate } from 'react-router-dom';

const destinations = [
  {
    id: 1,
    name: 'Shingrilla Hotel',
    image: shingrilla,
    description:
      'Skardu is a beautiful town in Pakistan and is known for its stunning landscapes, including mountains, lakes, and valleys.',
    video: video1,
  },
  {
    id: 2,
    name: 'Khaplu',
    image: img3,
    description:
      'Khaplu is a picturesque town in Pakistan, offering breathtaking views and a peaceful atmosphere.',
    video: video1,
  },
  {
    id: 3,
    name: 'Shigar',
    image: shiger,
    description:
      'Shigar is a historic town in Pakistan, famous for its ancient architecture and cultural heritage.',
    video: video1,
  },
  {
    id: 4,
    name: 'kharmang',
    image: shingrilla,
    description:
      'kharmang is a serene village in Pakistan with lush green landscapes and a tranquil environment.',
   video: video1,
  },
];

const DestinationList = () => {
  return (
    <div>
      <Navbar />

      <div className="destination-list">
        {destinations.map((destination) => (
          <div key={destination.id} className="destination">
            <img src={destination.image} alt={destination.name} />
            <hr />
            <h2>{destination.name}</h2>
            <hr />
            <p>{destination.description}</p>
          </div>
        ))}

        {destinations.map((destination) => (
          <div key={destination.id} className="destination">
            <video width="320" height="240" controls>
              <source src={destination.video} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
            <img src={destination.image} alt={destination.name} />
            <hr />
            <h2>{destination.name}</h2>
            <hr />
            <p>{destination.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DestinationList;
