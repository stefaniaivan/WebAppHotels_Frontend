import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';

function RoomList() {
  const { hotelId } = useParams();
  const [rooms, setRooms] = useState([]);

  useEffect(() => {
    axios.get(`http://localhost:8080/hotels/findAvailableRooms/${hotelId}`)
      .then(response => {
        setRooms(response.data);
      })
      .catch(error => console.log(error));
  }, [hotelId]);

  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h4" component="div" sx={{ p: 2, fontFamily: 'Oswald' }}>
        Available Rooms
      </Typography>
      <ul>
        {rooms.map((room) => (
          <Box key={room.roomNumber} sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
            <Typography sx={{ fontFamily: 'Oswald', mr: 2, fontSize: '20px' }}>
              Room {room.roomNumber} - Type: {room.type} - Price: ${room.price}
            </Typography>
            <Button 
              variant="contained" 
              sx={{ fontFamily: 'Oswald', fontSize: '15px' }} 
              onClick={() => console.log(`Booked room ${room.roomNumber}`)}
            >
              Book Now
            </Button>
          </Box>
        ))}
      </ul>
    </Box>
  );
}

export default RoomList;
