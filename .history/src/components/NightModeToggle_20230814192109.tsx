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
            sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                bgcolor: "background.default",
                color: "text.primary",
                borderColor: "text.primary",
                border: "1px solid",
                borderRadius: 25,
                p: 2,
            }}
        >
            {mode} mode
            <Switch {...label} defaultChecked color="default" onClick={toggleColorMode} />
            <IconButton sx={{ ml: 1 }} color="inherit">
                {mode === "dark" ? <Brightness7Icon /> : <Brightness4Icon />}
            </IconButton>
        </Box>
    );
};

export default NightModeToggle;