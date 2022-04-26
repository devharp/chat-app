import { Box } from "@mui/material";
import { useState } from "react";

function HarpToggleButton(props) {
    return (
        <>
            <Box className={`d-flex align-items-center ${(props.open) ? 'justify-content-end' : 'justify-content-start'}`} sx={{ cursor: 'pointer', padding: '0rem 0.25rem', height: '1.25rem', width: '2.5rem', borderRadius: '0.675rem', bgcolor: ((props.open) ? ('primary.main') : ('rgba(200, 200, 200, 0.8)')) }}>
                <div style={{ height: '0.8rem', width: '0.8rem', borderRadius: '50%', backgroundColor: 'white' }}></div>
            </Box>
        </>
    );
}

export default HarpToggleButton;