import { Box, Button, Input, InputAdornment, TextField, Typography } from '@mui/material';
import VideoCallRoundedIcon from '@mui/icons-material/VideoCallRounded';
import KeyboardAltRoundedIcon from '@mui/icons-material/KeyboardAltRounded';

import img00 from '../../src/assets/images/home/00.jpg';
import NavBar from '../component/NavBar';
import Desktop from '../layout/Desktop';
import Mobile from '../layout/Mobile';

function Home(props) {
    return (
        <>
            <div className='flex-grow-1' style={{ backgroundColor: 'none' }}>
                <Desktop>
                    <div className='flex-grow-1 d-flex flex-column' style={{ height: '100vh' }}>
                        <NavBar />
                        <div className='flex-grow-1 d-flex align-items-center' style={{ height: '100%' }}>
                            <Box className='ps-5 d-flex flex-column' bgcolor='' color='black' sx={{ height: 'max-content', width: '500px' }}>
                                <div className='load-anim'>
                                    <Typography variant='h2' sx={{ fontWeight: '800' }}>
                                        Team Chat, Virtual Meetings, Secure and Easy to use
                                    </Typography>
                                    <Box className='mt-4 mb-2' color='rgba(0, 0, 0, 0.5)' sx={{ height: 'max-content' }}>
                                        <Typography variant='subtitle1' >
                                            Now creating meetings and video chats are easy and free
                                        </Typography>
                                    </Box>
                                </div>
                                <div className='mt-5 d-flex'>
                                    <Button onClick={props.addSession} className='me-3' variant='contained'><VideoCallRoundedIcon /> &nbsp; Create Meeting</Button>

                                    <TextField variant='filled' size='small' label='Meeting Link' placeholder='Enter a link here' InputProps={{
                                        startAdornment: <InputAdornment position="start"><KeyboardAltRoundedIcon /></InputAdornment>
                                    }} />
                                </div>
                            </Box>
                            <Box className='flex-grow-1' style={{ height: '100%', overflow: 'hidden' }}>
                                <div className='d-flex justify-content-end align-items-center' style={{ height: '100%', overflow: 'hidden' }}>
                                    <img className='load-zoom-anim' style={{ minWidth: '350px', width: '40vw' }} src={img00} />
                                </div>

                            </Box>
                        </div>
                    </div>
                </Desktop>
                <Mobile>
                    <div className='flex-grow-1 d-flex flex-column'>
                        <NavBar />
                        <div className='d-flex flex-column my-4'>
                            <Box className='d-flex justify-content-center' sx={{ zIndex: '-1' }}>
                                <img className='load-zoom-anim' src={img00} style={{ width: '40vw' }} />
                            </Box>
                            <Box className='ps-5 d-flex flex-column mt-3' bgcolor='' color='black' sx={{ height: 'max-content', width: '350px' }}>
                                <div className='load-anim'>
                                    <Typography variant='h3' sx={{ fontWeight: '800' }}>
                                        Team Chat, Virtual Meetings, Secure and Easy to use
                                    </Typography>
                                    <Box className='mt-4 mb-2' color='rgba(0, 0, 0, 0.5)' sx={{ height: 'max-content' }}>
                                        <Typography variant='subtitle1' >
                                            Now creating meetings and video chats are easy and free
                                        </Typography>
                                    </Box>
                                </div>
                                <div className='mt-5 d-flex flex-column' style={{ maxWidth: '200px' }}>
                                    <Button onClick={props.addSession} className='mb-3 py-3' variant='contained'><VideoCallRoundedIcon /> &nbsp; Create Meeting</Button>

                                    <TextField variant='filled' size='small' label='Meeting Link' placeholder='Enter a link here' InputProps={{
                                        startAdornment: <InputAdornment position="start"><KeyboardAltRoundedIcon /></InputAdornment>
                                    }} />
                                </div>
                            </Box>
                        </div>
                    </div>
                </Mobile>
            </div>
        </>
    );
}

export default Home;