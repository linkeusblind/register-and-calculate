import React from 'react';
import TextField from '@mui/material/TextField';


const CalculateItem: React.FC = () => {
    return (
        <>
            <div>CalculateItem</div>
            <TextField inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }} />
        </>
    )
};


export default CalculateItem;