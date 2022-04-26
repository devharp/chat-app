import { Box } from '@mui/material';

function Desktop(props) {
    const style = {
        display: {
            xs: 'none',
            sm: 'none',
            md: 'flex',
            lg: 'flex',
            xl: 'flex',
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

export default Desktop;