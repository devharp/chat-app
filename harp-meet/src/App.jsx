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
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import FormHelperText from '@mui/material/FormHelperText';
import TextField from '@mui/material/TextField';

function App() {
  // const socket = socketClient('https://127.0.0.1:8000', { transports: ['websocket', 'polling', 'flashsocket'], secure: true });
  const socket = socketClient('https://localhost:8000', { transports: ['websocket'], secure: true });

  socket.on('connect', function () {
    console.log('client found server');
  });

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path='home' element={<Home />} />
        <Route exactly path="/about" element={<About />} />
        <Route path="*" element={<NoPage />} />

      </Routes>
    </BrowserRouter>
  );
}

const Home = () => {
  const [name, setName] = React.useState('');
  const [name_status, setNameStatus] = React.useState(false);
  const [firstnamehelper, setFirstNameHelper] = React.useState('Enter name here');

  const [session, setSession] = React.useState('');
  const [session_status, setSessionStatus] = React.useState(false);
  const [firstsessionhelper, setFirstSessionHelper] = React.useState('Enter a Session ID or leave it empty');

  React.useEffect(() => {
    try {
      if (name.length > 15) {
        throw new Error('NameLimitCrossedError');
      }
      if (name.length !== 0) {
        const validN = name.match(/^[A-Za-z][A-Za-z0-9 -]*$/);
        if (validN === null) {
          throw new Error('IncorrectNameError');
        }
        setFirstNameHelper('Go Ahead!');
      }
      else {
        setFirstNameHelper('Enter name here');
        setNameStatus(false);
      }

      if (session.length > 14) {
        throw new Error('SessionLimitCrossedError');
      }
      if (session.length !== 0) {
        const validN = session.match(/([a-f|0-9]{3,4})-([a-f|0-9]{3,4})-([a-f|0-9]{3,4})/);
        if (validN === null) {
          throw new Error('IncorrectSessionError');
        }
        setFirstSessionHelper('Go Ahead!');
        setSessionStatus(false);
      }
      else {
        setFirstSessionHelper('Enter a Session ID or leave it empty');
        setSessionStatus(false);
        console.log(session_status);
      }


    } catch (e) {
      switch (e.message) {
        case 'IncorrectNameError':
          setNameStatus(true);
          setFirstNameHelper('Invalid Name');
          console.error('check your name: ', e.message);
          break;
        case 'IncorrectSessionError':
          setSessionStatus(true);
          setFirstSessionHelper('Invalid Session Format');
          console.error('check your session: ', e.message);
          break;
        default:
          console.error('Unknown Error occured: ', e.message);
          break;
      }
    }
  });


  function onNameChangeHandler(event) {

    setName(event.target.value);
    // console.log(name);
  }
  function onSessionChangeHandler(event) {

    setSession(event.target.value);
    // console.log(name);
  }

  return (
    <>
      <div style={{ display: 'flex', flexDirection: 'column', height: '100%', justifyContent: 'space-between' }}>
        <ResponsiveAppBar />
        <Box mt={5} component="div" sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
          <Typography variant="h4" sx={{ display: 'flex', justifyContent: 'center', fontWeight: '500' }}>
            Login
          </Typography>;
          <Box component="div" mt={3} >
            <Box component="div" sx={{ display: 'flex', justifyContent: 'center' }}>
              <TextField label="Your Name" inputProps={{ maxLength: 15 }} error={name_status} value={name} onChange={onNameChangeHandler} placeholder='Harpreet Singh' variant="outlined" size="small" />
            </Box>
            <FormHelperText sx={{ display: 'flex', justifyContent: 'center', color: (name_status) ? ('error.main') : ((name.length === 0) ? ('text.secondary') : ('primary.main')) }} id="my-helper-text">{firstnamehelper}</FormHelperText>
          </Box>
          <Box component="div" mt={3} >
            <Box component="div" sx={{ display: 'flex', justifyContent: 'center' }}>
              <TextField label="Session ID" inputProps={{ maxLength: 14 }} error={session_status} value={session} onChange={onSessionChangeHandler} placeholder='abc-123-a1c4' variant="outlined" size="small" />
            </Box>
            <FormHelperText sx={{ display: 'flex', justifyContent: 'center', color: (session_status) ? ('error.main') : ((session.length === 0) ? ('text.secondary') : ('primary.main')) }} id="my-helper-text">{firstsessionhelper}</FormHelperText>
          </Box>
          <Box mt={3} sx={{ display: 'flex', justifyContent: 'center' }}>
            <Button variant="contained" >Begin</Button>
          </Box>
        </Box>

        <AppBar position='relative' sx={{ mt: 2 }}>
          <Container sx={{ p: 1 }} ><div style={{ display: 'flex', justifyContent: 'center' }}>&copy; HarpMeet 2021</div></Container>
        </AppBar>
      </div>
    </>
  );
};

const About = () => {
  const entries = new URLSearchParams(useLocation().search).entries();
  for (const [key, value] of entries) {
    console.log('key: ' + key + '\tvalue: ' + value);
  }
  return (
    <>
      <div style={{ display: 'flex', flexDirection: 'column', height: '100%', justifyContent: 'space-between' }}>
        <ResponsiveAppBar />
        <div style={{ flexGrow: '1' }}>About page</div>

        <AppBar position='relative'>
          <Container sx={{ p: 1 }} ><div style={{ display: 'flex', justifyContent: 'center' }}>Hello</div></Container>
        </AppBar>
      </div>
    </>);
};

const NoPage = () => {
  return (
    <>
      <ResponsiveAppBar />
      Error Page 404
    </>
  );
};

const ResponsiveAppBar = () => {
  const pages = ['home', 'about'];
  const settings = ['Profile', 'Account', 'Dashboard', 'Logout'];
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  function navClicked(i) {
    //Useless function, yet
    console.log('item no: ', i, ' clicked');
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
            HarpMeet
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
                  <Typography textAlign="center" component={Button} sx={{ color: 'black', textDecoration: 'none' }}>
                    <Link to={`/${page}`} style={{ color: 'black', textDecoration: 'none' }}>{page}</Link>
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
            HarpMeet
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            {pages.map((page, i) => (
              <Button
                key={page}
                onClick={() => { navClicked(i) }}
                sx={{ my: 2, color: 'white', display: 'block' }}
              >
                <Link to={`/${page}`} style={{ color: 'white', textDecoration: 'none' }}>{page}</Link>
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
