import './App.css'
import socketClient from 'socket.io-client'
import { BrowserRouter, Routes, Route, Outlet, Link } from "react-router-dom";
import { useLocation } from 'react-router-dom';

import * as React from 'react'
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';

function App() {
  const socket = socketClient('https://127.0.0.1:8000', { transports: ['websocket', 'polling', 'flashsocket'], secure: true });

  socket.on('connect', function () {
    console.log('client found server');
  });

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />} />
        {/* <Route path='home' element={<Home />} /> */}
        <Route path='home' element={<Home />} />
        <Route path="about" element={<About />} />
        <Route path="contact" element={<Contact />} />
        <Route path="*" element={<NoPage />} />

      </Routes>
    </BrowserRouter>
  );
}

const Layout = () => {
  return (
    <>
      <ResponsiveAppBar />

      <nav>
        <ul>
          <li>
            <Link to="/home">Home</Link>
          </li>
          <li>
            <Link to="/blogs">Blogs</Link>
          </li>
          <li>
            <Link to="/contact">Contact</Link>
          </li>
        </ul>
      </nav>

      {/* <Outlet /> */}
    </>
  )
};

const Home = () => {
  return (
    <>
      <NavBar />
    </>
  );
};

const About = () => {
  const entries = new URLSearchParams(useLocation().search).entries();
  for (const [key, value] of entries) {
    console.log('key: ' + key + '\tvalue: ' + value);
  }
  return <h1>Blog Articles</h1>;
};

const Contact = () => {
  return <h1>Contact Me</h1>;
};

const NoPage = () => {
  return (
    <>
      Error Page 404
    </>
  );
};

const NavBar = () => {
  return (
    <>
      NavBar
    </>
  );
}
const pages = ['home', 'about'];
const settings = ['Profile', 'Account', 'Dashboard', 'Logout'];

const ResponsiveAppBar = () => {
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  function navClicked(i){
    console.log('item no: ', i , ' clicked');
    handleCloseNavMenu()
  }

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ mr: 2, display: { xs: 'none', md: 'flex' } }}
          >
            LOGO
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: 'block', md: 'none' },
              }}
            >
              {pages.map((page, i) => (
                <MenuItem key={page} onClick={handleCloseNavMenu}>
                  <Typography textAlign="center" component={Button} to={page} sx={{color: 'black', textDecoration: 'none'}}>
                    {page}
                  </Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}
          >
            LOGO
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            {pages.map((page, i) => (
              <Button
                key={page}
                onClick={() =>{navClicked(i)}}
                sx={{ my: 2, color: 'white', display: 'block' }}
              >
                <Link to={`${page}`} style={{color: 'white', textDecoration: 'none'}}>{page}</Link>
              </Button>
            ))}
          </Box>

          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: '45px' }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {settings.map((setting) => (
                <MenuItem key={setting} onClick={handleCloseUserMenu}>
                  <Typography textAlign="center">{setting}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default App
