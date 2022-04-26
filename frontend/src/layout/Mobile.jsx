import { Box } from '@mui/material';

function Mobile(props) {
    const style = {
        display: {
            xs: 'flex',
            sm: 'flex',
            md: 'none',
            lg: 'none',
            xl: 'none',
        }
        // height: '100%',
        // width: '100%'
    };
    return (
        <>
            <Box className={props.className} sx={{...style, ...props.style}} bgcolor={props.bgcolor}>
                {props.children}
            </Box>
        </>);
}

export default Mobile;