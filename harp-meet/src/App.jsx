import './App.css'
import socketClient from 'socket.io-client'
import { BrowserRouter, Routes, Route, Outlet, Link } from "react-router-dom";
import { useLocation, useParams } from 'react-router-dom';

import * as React from 'react'
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import CallEnd from '@mui/icons-material/CallEnd'
import VideoSettingsIcon from '@mui/icons-material/VideoSettings';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import MessageIcon from '@mui/icons-material/Message';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import FormHelperText from '@mui/material/FormHelperText';
import TextField from '@mui/material/TextField';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const socket = socketClient('https://localhost:8000', { transports: ['websocket'], secure: true });
let sessions_info = null;
let sockets = []
function App() {
  // const socket = socketClient('https://127.0.0.1:8000', { transports: ['websocket', 'polling', 'flashsocket'], secure: true });


  socket.on('connect', function () {
    console.log('client found server, my id: ', socket.id);
    /*for(let i = 0; i < 15; i++){
      console.log(genRanMeetLink());
    }*/



  });


  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path='home' element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route exact path="/:meetid" element={<SpecialComponent />} />
        <Route path="*" element={<NoPage />} />

      </Routes>
    </BrowserRouter>
  );
}

const SpecialComponent = (match) => {
  const meetlink = (useParams().meetid.match(/([a-f0-9]{3,4})-([a-f0-9]{3,4})-([a-f0-9]{3,4})$/) !== null) ? <MeetingPage /> : <NoPage />;
  return (
    <>
      {meetlink}
    </>
  );
}
const MeetingPage = () => {
  const [users, setUsers] = React.useState([{ name: 0 }]);

  useEffect(() => {
    socket.on('user-joined', data => {
      if (data.id !== socket.id) {
        let user_found = false;
        for (let i = 0; i < sockets.length; i++) {
          if (sockets[i].id === data.id) {
            user_found = true;
            break;
          }
        }
        if (!user_found) {
          console.log('new user joined: ', data);
          sockets.push(data);

          socket.emit('get-session-info');
        }
      }
    });
    socket.on('user-left', data => {
      // console.log('new user left: ', data);
      for (let i = 0; i < sockets.length; i++) {
        if (sockets[i].id === data) {
          sockets.splice(i, 1);
          console.log('user ' + data + ' left, so user has been successfully removed');

          break;
        }
      }
      socket.emit('get-session-info');
    });
    socket.on('session-info', data => {
      console.log('everything about session: ', data);
      if (data.length !== sockets.length) {
        console.error('mismatch sockets length');
      }
      let list = [];
      for (const e of data) {
        list.push(e);
      }
      try {

        setUsers(list);
      } catch (e) { }
    });
    // console.log();
  });

  //----Menu Button Begin-----
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  //---Menu Button End----
  return (
    <>
      <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', height: '100%' }}>
        <div>

          <div style={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap', backgroundColor: 'red', justifyContent: 'space-around' }}>{users.map((e, i) => {
            return <div key={i} style={{ backgroundColor: 'yellow', margin: '2px', height: '200px', width: '200px' }}>{e.name}</div>;
          })}</div>

        </div>
        <div style={{ padding: '10px 0px', display: 'flex', justifyContent: 'center' }}>
          <div>
            <Button variant="contained" sx={{ margin: '0px 5px', borderRadius: '15px', color: 'white', backgroundColor: 'primary.main', padding: '3px 0' }}><MessageIcon /></Button>
          </div>
          <div>
            <Button variant="contained" sx={{ margin: '0px 5px', borderRadius: '15px', color: 'white', backgroundColor: 'error.main', padding: '3px 0' }}><CallEnd /></Button>
          </div>
          <div>
            <Button variant="contained" sx={{ margin: '0px 5px', borderRadius: '15px', color: 'white', backgroundColor: 'primary.main', padding: '3px 0' }}><PlayArrowIcon /></Button>
          </div>
          <div>
            <Button
              id="basic-button"
              aria-controls={open ? 'basic-menu' : undefined}
              aria-haspopup="true"
              aria-expanded={open ? 'true' : undefined}
              onClick={handleClick}
              sx={{ margin: '0px 5px', padding: '3px 0', color: 'white', borderRadius: '15px', backgroundColor: 'primary.main' }}
            >
              <VideoSettingsIcon />
            </Button>
            <Menu
              id="basic-menu"
              anchorEl={anchorEl}
              open={open}
              onClose={handleClose}
              MenuListProps={{
                'aria-labelledby': 'basic-button',
              }}
            >
              <MenuItem onClick={handleClose}>Profile</MenuItem>
              <MenuItem onClick={handleClose}>My account</MenuItem>
              <MenuItem onClick={handleClose}>Logout</MenuItem>
            </Menu>
          </div>
        </div>
      </div>
    </>
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
        setNameStatus(false);
      }
      else {
        setFirstNameHelper('Enter name here');
        setNameStatus(false);
      }

      if (session.length > 14) {
        throw new Error('SessionLimitCrossedError');
      }
      if (session.length !== 0) {
        let validN = session.match(/([a-f|0-9]{3,4})-([a-f|0-9]{3,4})-([a-f|0-9]{3,4})/);


        if (validN === null) {
          throw new Error('IncorrectSessionError');
        }
        else {
          validN = session.replace(validN[0], '');
          if (validN.length !== 0) {
            throw new Error('IncorrectSessionError');
          }
        }
        setFirstSessionHelper('Go Ahead!');
        setSessionStatus(false);
      }
      else {
        setFirstSessionHelper('Enter a Session ID or leave it empty');
        setSessionStatus(false);
        // console.log(session_status);
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
          setFirstSessionHelper('Invalid Session ID');
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
  const navigate = useNavigate();
  function handleBeginClick() {
    if (!name_status && !session_status && name.length > 0) {
      let data = { name, session }
      if (session.length === 0) {
        data.session = genRanMeetLink();
      }
      setSession(data.session);
      requestToJoinSession(data);
      socket.on('join-session-request-accepted', data => {
        if (sessions_info === null) {
          sessions_info = data;
          console.log('server said: ', data);
          navigate('/' + data.session);
          sockets.push({ name: data.name, sesion: data.session, id: socket.id })
          socket.emit('get-session-info');
        }
      });
    }
    else {
      if (name.length === 0) {
        setNameStatus(true);

      }
      console.log('something did not go well');
    }
  }

  return (
    <>
      <div style={{ display: 'flex', flexDirection: 'column', height: '100%', justifyContent: 'start' }}>
        <ResponsiveAppBar />
        <Box mt={5} component="div" sx={{ display: 'flex', flexDirection: 'column', height: '100%', backgroundColor: 'none' }}>
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
            <Button variant="contained" onClick={handleBeginClick} >Begin</Button>
          </Box>
        </Box>
        <Footer />

      </div>
    </>
  );
};

const Footer = () => {
  return (
    <AppBar position='relative' sx={{ mt: 2 }}>
      <Container sx={{ p: 1 }} ><div style={{ display: 'flex', justifyContent: 'center' }}>&copy; HarpMeet 2021</div></Container>
    </AppBar>
  );
}

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

        <Footer />
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

function genRanMeetLink() {
  const charset = 'abcdef0123456789';
  const codes = [3, 4];
  let link = '';
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < codes[parseInt(Math.random() * 2)]; j++) {
      link += charset[parseInt(Math.random() * charset.length)];
    }
    link += '-';
  }
  return link.slice(0, link.length - 1);

}

function requestToJoinSession(data) {
  if (data.name && data.session) {
    socket.emit('join-session', data);
  }
}

export default App
