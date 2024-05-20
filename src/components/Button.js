import React, { useState, useRef, useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import axios from 'axios';

function MyButton() {
    const scrollRef = useRef(null);
    const [position, setPosition] = useState(localStorage.getItem('position') || '');
    const [coordinates, setCoordinates] = useState(localStorage.getItem('coordinates') || '');
    const [radius, setRadius] = useState(localStorage.getItem('radius') || '');
    const [hotels, setHotels] = useState(JSON.parse(localStorage.getItem('hotels')) || []);
    const [latitude, setLatitude] = useState(localStorage.getItem('latitude') || '');
    const [longitude, setLongitude] = useState(localStorage.getItem('longitude') || '');
    const [searched, setSearched] = useState(JSON.parse(localStorage.getItem('searched')) || false);
    const navigate = useNavigate();
  
    useEffect(() => {
      const handleBeforeUnload = () => {
        localStorage.removeItem('position');
        localStorage.removeItem('coordinates');
        localStorage.removeItem('radius');
        localStorage.removeItem('hotels');
        localStorage.removeItem('latitude');
        localStorage.removeItem('longitude');
        localStorage.removeItem('searched');
      };
  
      window.addEventListener('beforeunload', handleBeforeUnload);
  
      return () => {
        window.removeEventListener('beforeunload', handleBeforeUnload);
      };
    }, []);
  
    useEffect(() => {
      localStorage.setItem('position', position);
      localStorage.setItem('coordinates', coordinates);
      localStorage.setItem('radius', radius);
      localStorage.setItem('hotels', JSON.stringify(hotels));
      localStorage.setItem('latitude', latitude);
      localStorage.setItem('longitude', longitude);
      localStorage.setItem('searched', JSON.stringify(searched));
    }, [position, coordinates, radius, hotels, latitude, longitude, searched]);

    const handleScroll = () => {
        scrollRef.current.scrollIntoView({ behavior: 'smooth' });
    };

    const handleShowPosition = () => {
        fetch('https://geolocation-db.com/json/')
            .then(response => response.json())
            .then(data => {
                setLatitude(data.latitude);
                setLongitude(data.longitude);

                const latInMeters = lengthOfDegreeLatitude(data.latitude);
                const lonInMeters = lengthOfDegreeLongitude(data.longitude);
                setPosition(`${latInMeters.toFixed(2)}, ${lonInMeters.toFixed(2)}`);
                setCoordinates(`${data.latitude.toFixed(6)}, ${data.longitude.toFixed(6)}`);
            })
            .catch(error => console.log(error));
    };

    const handleSearch = () => {
        setSearched(true);
        axios.get(`http://localhost:8080/hotels/withinRadius`, {
            params: {
                latitude: latitude,
                longitude: longitude,
                radius: radius
            }
        })
            .then(response => {
                setHotels(response.data);
            })
            .catch(error => console.log(error));
    };

    const handleShowRooms = (hotelId) => {
        navigate(`/hotels/${hotelId}/rooms`);
    };

    const lengthOfDegreeLatitude = (latitude) => {
        const latRad = Math.toRadians(latitude);
        return 111132.92 - 559.82 * Math.cos(2 * latRad) + 1.175 * Math.cos(4 * latRad) - 0.0023 * Math.cos(6 * latRad);
    };

    const lengthOfDegreeLongitude = (longitude) => {
        const lonRad = Math.toRadians(longitude);
        return 111412.84 * Math.cos(lonRad) - 93.5 * Math.cos(3 * lonRad) + 0.118 * Math.cos(5 * lonRad);
    };

    Math.toRadians = function (degrees) {
        return degrees * Math.PI / 180;
    };

    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mt: 5 }}>
            <Button
                variant="contained"
                color="primary"
                onClick={handleScroll}
                sx={{ bgcolor: 'black', color: 'moccasin', fontFamily: 'Oswald', width: '200px', height: '100px', fontSize: '25px' }}
            >
                Find Now
            </Button>
            <Box ref={scrollRef} sx={{ height: '75vh', bgcolor: '#f0f0f0', mt: 20, p: 4, border: '2px solid moccasin', borderRadius: '16px', width: '80%' }}>
                <Typography variant="h4" component="div" sx={{ p: 2, fontFamily: 'Oswald' }}>
                    My position:
                </Typography>
                <Box sx={{ display: 'flex', alignItems: 'center', mt: 2, width: '100%' }}>
                    <TextField
                        type="text"
                        variant="outlined"
                        value={position}
                        sx={{ mr: 2, width: '50%', borderColor: 'moccasin', borderRadius: '8px' }}
                        placeholder="Position (meters)"
                        InputProps={{
                            readOnly: true,
                        }}
                    />
                    <Button
                        variant="contained"
                        onClick={handleShowPosition}
                        sx={{ bgcolor: 'black', color: 'moccasin', fontFamily: 'Oswald', height: '56px', fontSize: '20px' }}
                    >
                        Show
                    </Button>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center', mt: 2, width: '100%' }}>
                    <TextField
                        type="text"
                        variant="outlined"
                        value={coordinates}
                        sx={{ mr: 2, width: '50%', borderColor: 'moccasin', borderRadius: '8px' }}
                        placeholder="Coordinates (lat, lon)"
                        InputProps={{
                            readOnly: true,
                        }}
                    />
                </Box>
                <Typography variant="h4" component="div" sx={{ p: 2, fontFamily: 'Oswald', mt: 4 }}>
                    Introduce radius:
                </Typography>
                <Box sx={{ display: 'flex', alignItems: 'center', mt: 2, width: '100%' }}>
                    <TextField
                        type="number"
                        variant="outlined"
                        value={radius}
                        onChange={(e) => setRadius(e.target.value)}
                        sx={{ mr: 2, width: '50%', borderColor: 'moccasin', borderRadius: '8px' }}
                        placeholder="Enter radius"
                    />
                    <Button
                        variant="contained"
                        onClick={handleSearch}
                        sx={{ bgcolor: 'black', color: 'moccasin', fontFamily: 'Oswald', height: '56px', fontSize: '20px' }}
                    >
                        Search
                    </Button>
                </Box>
                {searched && (
                    hotels.length > 0 ? (
                        <Box sx={{ mt: 2, width: '100%' }}>
                            <Typography variant="h4" component="div" sx={{ p: 2, fontFamily: 'Oswald' }}>
                                Hotels within radius:
                            </Typography>
                            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
                                {hotels.map((hotel) => (
                                    <Box key={hotel.id} sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                                        <Typography sx={{ fontFamily: 'Oswald', mr: 2, fontSize: '20px' }}>
                                            {hotel.name}
                                        </Typography>
                                        <Button
                                            variant="outlined"
                                            sx={{ fontFamily: 'Oswald' }}
                                            onClick={() => handleShowRooms(hotel.id)}
                                        >
                                            Show Rooms
                                        </Button>
                                    </Box>
                                ))}
                            </Box>
                        </Box>
                    ) : (
                        <Typography variant="h6" component="div" sx={{ mt: 4, fontFamily: 'Oswald', color: 'red' }}>
                            No hotels found within the specified radius.
                        </Typography>
                    )
                )}
            </Box>
        </Box>
    );
}

export default MyButton;
