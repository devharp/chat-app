import { TextField, Typography, Button, Checkbox, Modal, Box } from '@mui/material';
import { green } from '@mui/material/colors'
import GoogleIcon from '@mui/icons-material/Google';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import CheckIcon from '@mui/icons-material/Check';
import { useState } from 'react';
import NavBar from '../component/NavBar';
import Desktop from '../layout/Desktop';
import Mobile from '../layout/Mobile';

const states = {
    LOGIN_ACCOUNT: 'loginacc',
    CREATE_ACCOUNT: 'createacc',

}

function Login() {
    const [loginmessage, setLoginMessage] = useState({ color: 'text.secondary', text: 'You must login first to continue' });
    const [pagestate, setPageState] = useState(0);
    const [modalstate, setModalState] = useState(false);

    const setToLoginAccState = () => {
        setLoginMessage({ ...loginmessage, text: 'You must login first to continue' })
        setPageState(0);
    };

    const setToCreateAccState = () => {
        setLoginMessage({ ...loginmessage, text: 'You must\'ve an account to Login' })
        setPageState(1);
    };

    const loginButton = () => {
        const user = document.getElementById('harp-username').value;
        const pass = document.getElementById('harp-password').value;

        if (user.length > 0 && pass.length > 0) {
            const xhr = new XMLHttpRequest();
            xhr.open('POST', 'http://192.168.1.7:3005/login');

            xhr.onreadystatechange = () => {
                if (xhr.readyState === 4) {
                    const payload = JSON.parse(xhr.responseText);
                    switch (payload.status) {
                        case 'redirect':
                            window.location.href = payload.to;
                            break;
                        default:
                            console.error('Unknown status received')
                            break;
                    }
                }
            }

            xhr.send(JSON.stringify({ user, pass, state: states.LOGIN_ACCOUNT }));
        }
    }

    const signupButton = () => {
        const email = document.getElementById('harp-email').value;
        const user = document.getElementById('harp-username').value;
        const pass = document.getElementById('harp-password').value;
        console.log('email: ', email);

        if (email.length > 0 && user.length > 0 && pass.length > 0) {
            const xhr = new XMLHttpRequest();
            xhr.open('POST', 'http://192.168.1.7:3005/login');
            xhr.onreadystatechange = () => {
                if (xhr.readyState === XMLHttpRequest.DONE) {
                    const payload = JSON.parse(xhr.responseText);
                    switch (payload.status) {
                        case 'created-account':
                            setModalState(true);
                            break;
                        default:
                            console.error('Unknown status');
                            break;
                    }
                }
            }
            xhr.send(JSON.stringify({ email, user, pass, state: states.CREATE_ACCOUNT }));
        }

    }

    return (
        <>
            <div className='flex-grow-1 d-flex flex-column'>
                <NavBar />

                <div className='d-flex flex-grow-1 justify-content-center align-items-center'>
                    <div className='d-flex flex-column p-5 flex-grow-1' style={{ maxWidth: '500px', boxShadow: '0px 0px 15px rgb(100, 100, 100, 0.5)' }}>
                        <Typography className='mb-3' sx={{ fontWeight: '800', fontSize: '2.5rem' }}>{(pagestate === 0) ? 'Login to Your Account' : 'Create an Account'}</Typography>
                        <Typography color={loginmessage.color} variant='subtitle1'>{loginmessage.text}</Typography>
                        <TextField id='harp-email' placeholder='johndoe@example.com' className={`${(pagestate === 1) ? '' : 'd-none '}my-3`} variant='outlined' type='text' label='email' size='small' />
                        <TextField id='harp-username' placeholder='example: devharp' className='my-3' variant='outlined' type='text' label='username' size='small' />
                        <TextField id='harp-password' placeholder='example: aee@45ber_3&amp;4' className='my-3' variant='outlined' type='password' label='password' size='small' />
                        <div className={`${(pagestate === 0) ? 'd-flex' : 'd-none'} align-items-center`}>
                            <Checkbox />
                            <Typography variant='subtitle1' color='text.primary'>&nbsp;Remember Me</Typography>
                        </div>
                        <div className={`${(pagestate === 0) ? '' : 'd-none '}my-3 d-flex justify-content-center`}><Button onClick={loginButton} variant='contained'>Login</Button></div>
                        <div className={`${(pagestate === 1) ? '' : 'd-none '}my-3 d-flex justify-content-center`}><Button onClick={signupButton} variant='contained'>Sign Up</Button></div>
                        <hr />
                        <Button className='my-2 py-2' sx={{ bgcolor: 'error.main', '&:hover': { bgcolor: 'error.dark' }, '&:active': { bgcolor: 'error.dark' } }} variant='contained' startIcon={<GoogleIcon />}>sign in with google</Button>
                        <Button className={`${(pagestate === 0) ? '' : 'd-none '}mt-2 py-2`} onClick={setToCreateAccState} variant='contained' startIcon={<AccountBoxIcon />}>create account</Button>
                        <Button className={`${(pagestate === 1) ? '' : 'd-none '}mt-2 py-2`} onClick={setToLoginAccState} variant='contained' startIcon={<AccountBoxIcon />}>have an account already</Button>
                    </div>
                </div>
            </div>
            <Modal
                open={modalstate}
                onClose={() => { setModalState(false); }}
            >
                <Box className='d-flex flex-column align-items-center modal-popup' sx={{
                    position: 'absolute',
                    top: '40%',
                    left: '50%',
                    opacity: '0.1',
                    transform: 'translate(-50%, -50%)',
                    width: 400,
                    bgcolor: 'background.paper',
                    boxShadow: 24,
                    p: 4,
                    outline: 'none'
                }}>
                    <Box className='d-flex justify-content-center'>
                        <Box className='p-2' sx={{ border: '1px solid rgb(100, 100, 100, 0.3)', borderRadius: '50%' }}>
                            <CheckIcon sx={{ fontSize: '2rem', strokeWidth: 2, stroke: green[500], fill: green[500] }} />
                        </Box>
                    </Box>
                    <Typography className='mt-3' id="modal-modal-title" variant="h6" component="h2">
                        Registration Successful
                    </Typography>
                    <Typography id="modal-modal-description" sx={{ mt: 2, textAlignLast: 'center', textAlign: 'center' }}>
                        Thank You for registering your account and giving your email and password!
                    </Typography>
                </Box>
            </Modal>
        </>
    );
}

export default Login;