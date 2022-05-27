import { Box, Modal, Typography } from "@mui/material";
import CheckIcon from '@mui/icons-material/Check';
import { green } from '@mui/material/colors'


function RegisterSuccess(props){

    return(
        <>
            <Modal
                open={props.open}
                // onClose={() => { setModalState(false); window.location.href = '/' }}
                onClose={props.onClose}
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

export default RegisterSuccess;