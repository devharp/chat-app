import { Box, Button, TextField, Typography } from "@mui/material";
import HarpToggleButton from "../component/HarpToggleButton";
import NavBar from "../component/NavBar";
import Desktop from "../layout/Desktop";
import Mobile from "../layout/Mobile";

import AddIcon from '@mui/icons-material/Add';
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';

function Settings() {
    return (
        <>
            <div className='flex-grow-1' style={{ backgroundColor: 'none' }}>
                <NavBar />
                <div className='mt-5 d-flex justify-content-center'>
                    <div className="d-flex flex-column">
                        <Typography className='mb-4' variant='h5' sx={{ fontWeight: '500' }} >Account</Typography>
                        <div className="d-flex flex-column flex-md-row mb-4">
                            <div><TextField className='me-3 mb-3' size='small' label='userame' /></div>
                        </div>

                        <Typography className='mt-5 mb-4' variant='h5' sx={{ fontWeight: '500' }} >Meeting</Typography>
                        <div className='d-flex flex-column flex-md-row mb-3'>
                            <div className="d-flex me-5 align-items-center mb-3">
                                <Typography className='me-3' fontSize='1.125rem'>Allow Only Known Participants</Typography>
                                <HarpToggleButton open={true} />
                            </div>
                            <div className='d-flex align-items-center mb-3'>
                                <Typography className='me-3' fontSize='1.125rem'>Allow Everyone</Typography>
                                <HarpToggleButton open={false} />
                            </div>
                        </div>
                        <div className='d-flex align-items-center mb-3'>
                            <Typography className='me-3' fontSize='1.125rem'>Disable everyone's mic</Typography>
                            <HarpToggleButton open={false} />
                        </div>

                        <Typography className='mt-5 mb-4' variant='h5' sx={{ fontWeight: '500' }} >Theme</Typography>
                        <div className='d-flex align-items-center'>
                            <Typography className='me-3' fontSize='1.125rem' >Dark Mode</Typography>
                            <HarpToggleButton />
                        </div>

                        <Typography className='mt-5 mb-4' variant='h5' sx={{ fontWeight: '500' }} >Attendees</Typography>
                        <div className="d-flex flex-column" style={{ maxWidth: '90vw' }}>
                            <div><Button size='small' variant='contained' >Hide List</Button></div>
                            <div className="d-flex flex-column my-3" style={{ maxWidth: '600px' }}>
                                <div className='d-flex'>
                                    <TextField className='flex-grow-1 me-3 mb-3' size="small" label='email' />
                                    <Button className='mb-3 d-flex align-items-center' variant="contained"><RemoveCircleIcon />&nbsp;Remove</Button>
                                </div>
                                <div className='d-flex'>
                                    <TextField className='flex-grow-1 me-3 mb-3' size="small" label='email' />
                                    <Button className='mb-3 d-flex align-items-center' variant="contained"><RemoveCircleIcon />&nbsp;Remove</Button>
                                </div>
                                <div className='d-flex'>
                                    <TextField className='flex-grow-1 me-3 mb-3' size="small" label='email' />
                                    <Button className='mb-3 d-flex align-items-center' variant="contained"><RemoveCircleIcon />&nbsp;Remove</Button>
                                </div>
                                <Button variant='contained' ><AddIcon />Add Attendee</Button>
                            </div>
                        </div>
                    </div>
                </div>
                <Mobile>
                    {/* Mobile Screen */}
                </Mobile>
            </div>
        </>
    );
}

export default Settings;