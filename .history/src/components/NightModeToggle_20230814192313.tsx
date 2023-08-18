import { Box, IconButton } from "@mui/material";
import { useThemeContext } from "../theme/ThemeContextProvider";
import Switch from '@mui/material/Switch';

const NightModeToggle = () => {
    const { mode, toggleColorMode } = useThemeContext();
    const label = { inputProps: { 'aria-label': 'Color switch demo' } };

    return (
        <>
            <Switch {...label} defaultChecked color="default" onClick={toggleColorMode} />
        </>
    );
};

export default NightModeToggle;