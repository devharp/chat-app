import { Box, Button, Modal, TextField, Typography } from "@mui/material";
import HarpToggleButton from "../component/HarpToggleButton";
import NavBar from "../component/NavBar";
import Desktop from "../layout/Desktop";
import Mobile from "../layout/Mobile";

import AddIcon from '@mui/icons-material/Add';
import SaveIcon from '@mui/icons-material/Save'
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';
import { useState, useEffect } from "react";

function Settings() {

    const [kmaills, setKmailLs] = useState([]);
    const [oldusername, setOldUsername] = useState('');
    const [userpassv, setuserpassv] = useState({ user: '', pass: '' });
    const [showlist, setShowList] = useState(true);
    const [upkey, setUPKey] = useState(0);
    const [lskey, setLsKey] = useState(0);

    const [openmodal, setOpenModal] = useState(false);

    const host = '/get';
    const setKnownMails = () => {
        return new Promise((resolve, reject) => {
            const xhr = new XMLHttpRequest();
            const addr = host + '?key=kmails';
            xhr.open('GET', addr);
            xhr.onreadystatechange = () => {
                if (xhr.readyState === XMLHttpRequest.DONE) {
                    const payload = JSON.parse(xhr.response);
                    const mails = JSON.parse(payload.kmails);
                    console.log(mails);

                    setKmailLs(mails);
                    resolve();
                }
            }
            xhr.send();
        });
    }

    const setUser = () => {
        return new Promise((resolve, reject) => {
            const xhr = new XMLHttpRequest();
            const addr = host + '?key=user';
            xhr.open('GET', addr);
            xhr.onreadystatechange = () => {
                if (xhr.readyState === XMLHttpRequest.DONE) {
                    const payload = JSON.parse(xhr.response);
                    resolve(payload.user);
                }
            }
            xhr.send();
        });
    }

    const setUserPassVBtn = (payload) => {
        setuserpassv(payload);
        setUPKey(upkey + 1);
    }
    const setPass = () => {
        return new Promise((resolve, reject) => {
            const xhr = new XMLHttpRequest();
            const addr = host + '?key=pass';
            xhr.open('GET', addr);
            xhr.onreadystatechange = () => {
                if (xhr.readyState === XMLHttpRequest.DONE) {
                    const payload = JSON.parse(xhr.response);
                    resolve(payload.pass);
                }
            }
            xhr.send();
        });
    }


    useEffect(() => {
        async function initSettingValues() {
            await setKnownMails();
            const user = await setUser();
            const pass = await setPass();
            setOldUsername(user)
            setUserPassVBtn({ user, pass });
        }
        initSettingValues();

    }, []);


    function Attendee(props) {
        return (
            <>
                <div className='d-flex'>
                    <TextField className='flex-grow-1 me-3 mb-3' size="small" label='email' defaultValue={props.defaultValue}
                        onChange={(event) => {
                            let templs = kmaills;
                            templs[props.i] = event.target.value;
                            setKmailLs(templs);
                        }
                        } />
                    <Button onClick={props.onRemoveClick} className='mb-3 d-flex align-items-center' variant="contained"><RemoveCircleIcon />&nbsp;Remove</Button>
                </div>
            </>
        );
    }

    function SuccessModal() {
        const style = {
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 400,
            bgcolor: 'background.paper',
            border: '2px solid #000',
            boxShadow: 24,
            p: 4,
          };
        return (
            <>
                <Modal open={openmodal} onClose={() => { setOpenModal(false); window.location.href= '/' }} >
                    <Box sx={style}>
                        <Typography id="modal-modal-title" variant="h6" component="h2">
                            Message
                        </Typography>
                        <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                            Your profile has been updated successfully
                        </Typography>
                    </Box>
                </Modal>
            </>
        );
    }

    const addAttendeeButton = () => {
        setKmailLs([...kmaills, '']);
        console.log('btn clicked');
    }

    const saveBtnClicked = () => {
        const payload = { kmaills, userpassv, oldusername };
        const addr = host + '?key=all';
        const xhr = new XMLHttpRequest();
        xhr.onreadystatechange = () => {
            if (xhr.readyState === XMLHttpRequest.DONE) {
                const pload = xhr.response;
                if (pload === 'ok') {
                    console.log('data saved in the database');
                    setOpenModal(true);
                }
                else if (pload === 'false') {
                    console.log('failed to save the data in the database');
                }
            }
        }
        xhr.open('POST', addr);
        xhr.send(JSON.stringify(payload));
    }

    return (
        <>
            <SuccessModal/>
            <div className='flex-grow-1' style={{ backgroundColor: 'none' }}>
                <NavBar />
                <div className='mt-5 d-flex justify-content-center'>
                    <div className="d-flex flex-column pb-4">
                        <Typography className='mb-4' variant='h5' sx={{ fontWeight: '500' }} >Account</Typography>
                        <div className="d-flex flex-column flex-md-row mb-4">
                            <div><TextField key={upkey + 2} className='me-3 mb-3' size='small' value={userpassv.user} label='username' onChange={(event) => { setuserpassv({ ...userpassv, user: event.target.value }); }} /></div>
                            <div><TextField key={upkey + 3} className='me-3 mb-3' size='small' value={userpassv.pass} label='password' onChange={(event) => { setuserpassv({ ...userpassv, pass: event.target.value }); }} /></div>
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
                        <div className='d-flex flex-column' style={{ maxWidth: '90vw' }}>
                            <div className="mb-3"><Button onClick={() => { setShowList(!showlist) }} size='small' variant='contained' >{showlist ? 'HIDE' : 'SHOW'} List</Button></div>
                            <div className={`${showlist ? 'd-flex' : 'd-none'} flex-column my-3`} style={{ maxWidth: '600px' }}>

                                {
                                    kmaills.map((e, i) => {
                                        const onRemoveBtn = () => {
                                            kmaills.splice(i, 1);
                                            setLsKey(lskey + 1);
                                        }
                                        return (
                                            <Attendee key={i + lskey} defaultValue={e} onRemoveClick={onRemoveBtn} i={i} />
                                        );
                                    })
                                }

                                <Button variant='contained' onClick={addAttendeeButton} ><AddIcon />Add Attendee</Button>
                            </div>
                        </div>
                        <Button onClick={saveBtnClicked} variant="contained" color="success" >
                            <div className='d-flex'>
                                <span className="me-4">
                                    <SaveIcon />
                                </span>
                                <span style={{ paddingTop: '0.1em' }}>
                                    SAVE
                                </span>

                            </div>
                        </Button>
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