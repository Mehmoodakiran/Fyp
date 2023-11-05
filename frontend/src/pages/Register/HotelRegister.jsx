import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import axios from 'axios';
import Navbar from "../../components/navbar/Navbar";

const CreateHotel = () => {
    const [formData, setFormData] = React.useState({
        name: '',
        type: '',
        city: '',
        address: '',
        distance: '',
        photos: [],
        rooms: [], // Add a field for rooms
        title: '',
        desc: '',
        cheapestPrice: 0,
        featured: false,
    });
    const [successMessage, setSuccessMessage] = useState(''); // Define successMessage state variable

    const addRoom = () => {
        setFormData({
            ...formData,
            rooms: [...formData.rooms, { name: '', description: '' }],
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const apiUrl = 'http://localhost:8800/api/hotels/';

            const hotel = {
                name: formData.name,
                type: formData.type,
                city: formData.city,
                address: formData.address,
                distance: formData.distance,
                title: formData.title,
                desc: formData.desc,
                cheapestPrice: formData.cheapestPrice,
                featured: formData.featured,
                photos: formData.photos,
                rooms: formData.rooms,
             // Include rooms in the hotel object
            };

            const response = await axios.post(apiUrl, hotel, {
                withCredentials: true,
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            setSuccessMessage('Your hotel is registered!');
            console.log(response.data);
        } catch (error) {
            console.error("Error:", error);
        }
    };


    const handleChange = (e) => {
        const { name, value, type, checked, files } = e.target;

        if (type === 'file') {
            setFormData({
                ...formData,
                photos: files[0],
            });
        } else if (name.startsWith('rooms[')) {
            const roomIndex = name.match(/\[(\d+)\]/)[1];
            const fieldName = name.match(/\.\w+/)[0].substring(1);

            setFormData({
                ...formData,
                rooms: formData.rooms.map((room, index) =>
                    index == roomIndex
                        ? { ...room, [fieldName]: type === 'checkbox' ? checked : value }
                        : room
                ),
            });
        } else {
            setFormData({
                ...formData,
                [name]: type === 'checkbox' ? checked : value,
            });
        }
    };
    return (
      
        <Container>
          <Navbar />
            <Box component="form" onSubmit={handleSubmit}>
            <TextField
                    fullWidth
                    label="Owner Name"
                    name="distance"
                    value={formData.distance}
                    onChange={handleChange}
                    margin="normal"
                    placeholder="Please Enter Owner Name"
                    required
                    
                />
            <TextField
                    fullWidth
                    label="Hotel Name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    margin="normal"
                    placeholder="Enter Hotel Name"
                    required
                />
                <TextField
                    fullWidth
                    label="Type"
                    name="type"
                    value={formData.type}
                    onChange={handleChange}
                    margin="normal"
                    placeholder="hotels/cabins/guests/apartments/resorts"
                    required
                />
                <TextField
                    fullWidth
                    label="City"
                    name="city"
                    value={formData.city}
                    onChange={handleChange}
                    margin="normal"
                    placeholder="Please Enter Your City"
                    required
                />
                <TextField
                    fullWidth
                    label="Address"
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    margin="normal"
                    placeholder="Please Enter Your Address"
                    required
                />
              
                <TextField
                    fullWidth
                    label="Title"
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                    margin="normal"
                    placeholder="Enter Hotel Title"
                    required
                />
                <TextField
                    fullWidth
                    label="Description"
                    name="desc"
                    value={formData.desc}
                    onChange={handleChange}
                    margin="normal"
                    placeholder="Please Enter Your Desc"
                    required
                />
                <TextField
                    fullWidth
                    label="Cheapest Price"
                    name="cheapestPrice"
                    type="number"
                    value={formData.cheapestPrice}
                    onChange={handleChange}
                    margin="normal"
                />
                <FormControlLabel
                    control={
                        <Checkbox
                            name="featured"
                            checked={formData.featured}
                            onChange={handleChange}
                            color="primary"
                        />
                    }
                    label="Featured"
                />
                {formData.rooms.map((room, index) => (
                    <div key={index}>
                        <TextField
                            fullWidth
                            label={`Room ${index + 1} Name`}
                            name={`rooms[${index}].name`}
                            value={room.name}
                            onChange={handleChange}
                            margin="normal"
                        />
                        <TextField
                            fullWidth
                            label={`Room ${index + 1} Description`}
                            name={`rooms[${index}].description`}
                            value={room.description}
                            onChange={handleChange}
                            margin="normal"
                        />
                    </div>
                ))}


                   <input
                   type="file"
                   accept="image/*"
                   name="photos"
                   multiple
                   onChange={handleChange}
                   style={{ display: 'none' }}
                   id="select-image"
               />
               <label htmlFor="select-image">
                   <Button component="span" variant="outlined" style={{ color: '#3faa46' }}>
                       Select Your Hotel Pictures
                   </Button>
               </label>
               <Button type="submit" variant="contained" style={{ backgroundColor: '#3faa46', color: 'white' }}>
                    Submit
                </Button>

               {successMessage && <p>{successMessage}</p>}
           </Box>
       </Container>
   );
};

export default CreateHotel;
