import React, { useState } from "react";
import { Link } from "react-router-dom";
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import AddIcon from '@mui/icons-material/Add';
import IconButton from '@mui/material/IconButton';
import AdbIcon from '@mui/icons-material/Adb';

function Navbar() {
    const pages = [
        { label: 'Home', link: '/' },
        { label: 'Create', link: '/create' },
        { label: 'Quest', link: '/quest' },
    ];

    const settings = ['Profile', 'Account', 'Dashboard', 'Logout'];
    const [anchorElUser, setAnchorElUser] = useState(null);

    const handleOpenUserMenu = (event) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

    return (
        <AppBar position="static" sx={{ height: '50px', flexGrow: 1, position: 'fixed', top: 0, right: 0 }}>
            <Toolbar disableGutters>
                <Box sx={{ flexGrow: 1, display: 'flex', alignItems: 'center' }}>
                    {pages.map((page) => (
                        <Button
                            key={page.label}
                            component={Link}
                            to={page.link}
                            sx={{ mx: 1, color: 'white', textDecoration: 'none' }}
                        >
                            {page.label}
                        </Button>
                    ))}
                </Box>

                <Box sx={{ flexGrow: 0 }}>
                    <Tooltip title="Open settings">
                        <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                            <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
                        </IconButton>
                    </Tooltip>
                    <Menu
                        id="menu-appbar"
                        anchorEl={anchorElUser}
                        anchorOrigin={{
                            vertical: 'top',
                            horizontal: 'right',
                        }}
                        keepMounted
                        transformOrigin={{
                            vertical: 'top',
                            horizontal: 'right',
                        }}
                        open={Boolean(anchorElUser)}
                        onClose={handleCloseUserMenu}
                    >
                        {settings.map((setting) => (
                            <MenuItem key={setting} onClick={handleCloseUserMenu}>
                                <Typography textAlign="center">{setting}</Typography>
                            </MenuItem>
                        ))}
                    </Menu>
                </Box>
            </Toolbar>
        </AppBar>
    );
}

export default Navbar;
