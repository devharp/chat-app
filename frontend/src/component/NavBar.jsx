import { Box, Button, Drawer, Input, InputAdornment, Menu, MenuItem, Popover, TextField, Typography } from '@mui/material';
import AccountCircleRoundedIcon from '@mui/icons-material/AccountCircleRounded';
import Desktop from "../layout/Desktop";
import Mobile from "../layout/Mobile";

import MenuIcon from '@mui/icons-material/Menu';
import HomeIcon from '@mui/icons-material/Home';
import SettingsIcon from '@mui/icons-material/Settings';
import InfoIcon from '@mui/icons-material/Info';

import { Link } from 'react-router-dom'
import { useState } from 'react';

function NavBar(props) {
    const [anchorEl, setAnchorEl] = useState(null);
    const [selectedIndex, setSelectedIndex] = useState(1);
    const open = Boolean(anchorEl);
    const handleClickListItem = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMenuItemClick = (event, index) => {
        setSelectedIndex(index);
        setAnchorEl(null);
    };
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };
    const iconsx = {
        fill: 'none',
        stroke: 'rgb(100, 100, 100, 1)',
        strokeWidth: 2
    }
    const buttons = [
        {
            name: 'HOME',
            link: '/',
            icon: <HomeIcon sx={iconsx} />
        },
        {
            name: 'SETTINGS',
            link: '/settings',
            icon: <SettingsIcon sx={iconsx} />
        },
        {
            name: 'ABOUT',
            link: '/about',
            icon: <InfoIcon sx={iconsx} />
        }
    ];

    const [drawerstate, setDrawerState] = useState(false)

    const handleDrawerOpen = () => {
        setDrawerState(true);
    }

    const handleDrawerClose = () => {
        setDrawerState(false);
    }
    return (
        <>
            <Desktop className=''>
                <Box className='px-5 d-flex justify-content-between align-items-center' boxShadow={5} sx={{ height: '80px', width: '100%', bgcolor: 'primary.dark' }}>
                    <Typography color='white' variant='h5' sx={{ fontWeight: '800' }}>
                        WeConnect
                    </Typography>
                    <div className='d-flex justify-content-around' style={{ width: '50%' }}>
                        {buttons.map((e, i) => {
                            return (
                                <a href={e.link} key={i} className='mx-2' style={{ textDecoration: 'none' }}>
                                    <Typography color='white' variant='h6' sx={{ fontWeight: '500', '&:hover': { color: 'rgba(255, 255, 255, 0.9)' } }}>{e.name}</Typography>
                                </a>
                            );
                        })}

                    </div>
                    <Box className='d-flex justify-content-center align-items-center' style={{ height: '50px', width: '50px', borderRadius: '50%' }}>
                        <AccountCircleRoundedIcon sx={{ fontSize: '2.5rem', color: 'white' }} />
                    </Box>
                </Box>
            </Desktop>
            <Mobile className='bg-dark'>
                <Box className='px-5 d-flex justify-content-between align-items-center' boxShadow={5} sx={{ zIndex: '1', height: '80px', width: '100%', bgcolor: 'primary.dark' }}>
                    <Box color='white'>
                        <MenuIcon onClick={handleDrawerOpen} />
                        <Drawer anchor='left' open={drawerstate}
                            onClose={handleDrawerClose}
                        >
                            <div className='px-1 mt-4'>
                                {buttons.map((e, i) => {
                                    return (
                                        <a href={e.link} key={i} style={{ textDecoration: 'none', color: 'white' }}>
                                            <Box bgcolor='rgba(240, 240, 240, 0.6)' sx={{ borderRadius: '0' }} className='my-2 py-2 ps-3 pe-5 mx-1 d-flex align-items-center'>
                                                <div className='me-4 d-flex align-items-center'>
                                                    {e.icon}
                                                </div>
                                                <Typography variant='subtitle' sx={{ fontWeight: '700', color: 'rgba(100, 100, 100, 1)' }} >{e.name}</Typography>
                                            </Box>
                                        </a>
                                    );
                                })}
                            </div>
                        </Drawer>
                    </Box>

                    <Box className='d-flex justify-content-center align-items-center' style={{ height: '50px', width: '50px', borderRadius: '50%' }}>
                        <div>

                            <AccountCircleRoundedIcon onClick={handleClick} sx={{ fontSize: '2.5rem', color: 'white' }} />
                            <Menu
                                MenuListProps={{
                                    'aria-labelledby': 'fade-button',
                                }}
                                id="lock-menu"
                                anchorEl={anchorEl}
                                open={open}
                                onClose={handleClose}
                                anchorOrigin={{ vertical: "top", horizontal: "right" }}
                                transformOrigin={{ vertical: "top", horizontal: "center" }}
                            >
                                <MenuItem><a href='/logout' style={{ color: 'black', textDecoration: 'none' }}>Logout</a></MenuItem>
                            </Menu>
                        </div>
                    </Box>
                </Box>
            </Mobile>
        </>
    );
}

export default NavBar;