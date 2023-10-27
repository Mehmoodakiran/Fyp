import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import axios from 'axios';
import DatePicker from '@mui/lab/DatePicker'; // Import the DatePicker component

const RoomForm = () => {
  const [formData, setFormData] = useState({
    title: '',
    price: '',
    maxPeople: '',
    desc: '',
    roomNumbers: [
      {
        number: '',
        unavailableDates: null, // Initialize with null
      },
    ],
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleRoomNumberChange = (e, index) => {
    const { name, value } = e.target;
    const updatedRoomNumbers = [...formData.roomNumbers];
    updatedRoomNumbers[index] = { ...updatedRoomNumbers[index], [name]: value };
    setFormData({ ...formData, roomNumbers: updatedRoomNumbers });
  };

  const handleDateChange = (date, index) => {
    const updatedRoomNumbers = [...formData.roomNumbers];
    updatedRoomNumbers[index].unavailableDates = date;
    setFormData({ ...formData, roomNumbers: updatedRoomNumbers });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:8800/api/rooms/', formData, {
        withCredentials: true, // If needed
        headers: {
          'Content-Type': 'application/json',
        },
      });
      console.log(response.data);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const addRoomNumber = () => {
    setFormData({
      ...formData,
      roomNumbers: [
        ...formData.roomNumbers,
        {
          number: '',
          unavailableDates: null, // Initialize with null
        },
      ],
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <TextField
        fullWidth
        label="Title"
        name="title"
        value={formData.title}
        onChange={handleChange}
        margin="normal"
      />
      <TextField
        fullWidth
        label="Price"
        name="price"
        type="number"
        value={formData.price}
        onChange={handleChange}
        margin="normal"
      />
      <TextField
        fullWidth
        label="Max People"
        name="maxPeople"
        type="number"
        value={formData.maxPeople}
        onChange={handleChange}
        margin="normal"
      />
      <TextField
        fullWidth
        label="Description"
        name="desc"
        value={formData.desc}
        onChange={handleChange}
        margin="normal"
      />

      {formData.roomNumbers.map((room, index) => (
        <div key={index}>
          <TextField
            fullWidth
            label={`Room ${index + 1} NAME`}
            name={`roomNumbers[${index}].name`}
            value={room.name}
            onChange={(e) => handleRoomNumberChange(e, index)}
            margin="normal"
          />

          <DatePicker
            fullWidth

            label={`Room ${index + 1} Unavailable Date`}
            name={`roomNumbers[${index}].unavailableDates`}
            value={room.unavailableDates}
            onChange={(date) => handleDateChange(date, index)}
            renderInput={(params) => <TextField {...params} />}
            margin="normal"
          />
        </div>
      ))}

      <Button
        variant="contained"
        color="primary"
        type="submit"
      >
        Submit
      </Button>

      <Button
        variant="contained"
        color="primary"
        onClick={addRoomNumber}
      >
        Add Room Number
      </Button>
    </form>
  );
};

export default RoomForm;
