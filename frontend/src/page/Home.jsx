import { Box, Button, Input, InputAdornment, TextField, Typography } from '@mui/material';
import VideoCallRoundedIcon from '@mui/icons-material/VideoCallRounded';
import KeyboardAltRoundedIcon from '@mui/icons-material/KeyboardAltRounded';

import img00 from '../../src/assets/images/home/00.jpg';
import NavBar from '../component/NavBar';
import Desktop from '../layout/Desktop';
import Mobile from '../layout/Mobile';
import { useState } from 'react';

function Home(props) {
    // const host = 'http://192.168.1.7:3000'
    const host = ''
    const [meetlink, setMeetLink] = useState('');

    const meetbtnclick = () => {
        const xhr = new XMLHttpRequest();
        console.log('meeting link: ', meetlink);
        xhr.open('POST', host + '/meeting');
        xhr.onreadystatechange = () => {
            if(xhr.readyState === XMLHttpRequest.DONE){
                const payload = JSON.parse(xhr.response);
                if(payload.status === 'meeting-found'){
                    console.log('Meeting found');
                    window.location.href = payload.redirect;
                }

                else if(payload.status === 'meeting-notfound'){
                    console.log('Meeting not found');
                }

                else{
                    console.log('Unknown status received: ', payload);
                }

            }
        }
        xhr.send(JSON.stringify({ link: meetlink }));
    }

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
                                    <Button onClick={meetbtnclick} className='me-3' variant='contained'><VideoCallRoundedIcon /> &nbsp; {(meetlink.length > 0) ? 'JOIN' : 'CREATE'} Meeting</Button>

                                    <TextField variant='filled' size='small' label='Meeting Link' placeholder='Enter a link here' InputProps={{
                                        startAdornment: <InputAdornment position="start"><KeyboardAltRoundedIcon /></InputAdornment>
                                    }} value={meetlink} onChange={(event) => setMeetLink(event.target.value)} />
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
                                    <Button onClick={meetbtnclick} className='mb-3 py-3' variant='contained'><VideoCallRoundedIcon /> &nbsp; {(meetlink.length > 0) ? 'JOIN' : 'CREATE'} Meeting</Button>

                                    <TextField variant='filled' size='small' label='Meeting Link' placeholder='Enter a link here' InputProps={{
                                        startAdornment: <InputAdornment position="start"><KeyboardAltRoundedIcon /></InputAdornment>
                                    }} value={meetlink} onChange={(event) => setMeetLink(event.target.value)} />
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