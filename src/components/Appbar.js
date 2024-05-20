import React, { useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Modal from '@mui/material/Modal';
import Paper from '@mui/material/Paper';
import CardMedia from '@mui/material/CardMedia';


const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    border: '2px solid #000',
    bgcolor: 'black',
    boxShadow: 24,
    p: 4,
};

export default function ButtonAppBar() {
    const [open, setOpen] = useState(false);

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static" sx={{ bgcolor: 'black', height: '80px' }}>
                <Toolbar>
                    <IconButton
                        size="large"
                        edge="start"
                        aria-label="menu"
                        sx={{ mr: 2, color: 'moccasin' }}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h6" sx={{ flexGrow: 1, color: 'moccasin', fontFamily: 'Oswald', fontSize: '25px' }}>
                        Hotel Reservation Management
                    </Typography>
                    <Button variant="h6" onClick={handleOpen} sx={{ color: 'moccasin', fontFamily: 'Oswald', fontSize: '20px' }}>
                        About</Button>
                </Toolbar>
            </AppBar>
            <Modal
                open={open}
                onClose={handleClose}
            >
                <Paper sx={style}>
                    <Typography sx={{ color: 'moccasin', fontFamily: 'Oswald', fontSize: '30px' }}>
                        About Hotel Reservation Management Application
                    </Typography>
                    <Typography sx={{ mt: 2, color: 'moccasin', fontFamily: 'Oswald', fontSize: '20px' }}>
                        This is an application that displays the available hotels within the specified radius introduced by the user.
                    </Typography>
                </Paper>
            </Modal>
            <Box sx={{ height: '70vh', overflow: 'hidden', borderRadius: '16px' }}>
                <CardMedia
                    component="img"
                    height="100%"
                    image="https://i.redd.it/h000l76acj741.jpg"
                />
            </Box>

        </Box>
    );
}
