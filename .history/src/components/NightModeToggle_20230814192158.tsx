import { Box, IconButton } from "@mui/material";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";
import { useThemeContext } from "../theme/ThemeContextProvider";
import Switch from '@mui/material/Switch';

const NightModeToggle = () => {
    const { mode, toggleColorMode } = useThemeContext();
    const label = { inputProps: { 'aria-label': 'Color switch demo' } };

    return (
        <Box

            {mode} mode
            <Switch {...label} defaultChecked color="default" onClick={toggleColorMode} />
        </Box >
    );
};

export default NightModeToggle;