import React from 'react';
import {AppBar, Toolbar, Typography, Button, IconButton, Menu, MenuItem, Link} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import {useSelector} from "react-redux";

const Navbar = ({color, header, search = true, account = true, home=false, contact = false, about = false, shop = false, accountModel}) => {
    const [anchorEl, setAnchorEl] = React.useState(null);
    const user = useSelector((state) => state.auth.user);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <AppBar position="static" sx={{backgroundColor: color}}>

            <Toolbar>
                <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                    {header}
                </Typography>
                {search === true && <Button color="inherit">Search</Button>}
                <IconButton
                    size="large"
                    edge="end"
                    color="inherit"
                    aria-label="menu"
                    aria-controls="menu-appbar"
                    aria-haspopup="true"
                    onClick={handleClick}
                >
                    <MenuIcon />
                </IconButton>
                <Menu
                    id="menu-appbar"
                    anchorEl={anchorEl}
                    anchorOrigin={{
                        vertical: 'top',
                        horizontal: 'right',
                    }}
                    keepMounted
                    transformOrigin={{
                        vertical: 'top',
                        horizontal: 'right',
                    }}
                    open={Boolean(anchorEl)}
                    onClose={handleClose}
                >
                    {account && user && <MenuItem onClick={handleClose}><Link href={"/account"}>Account</Link></MenuItem>}
                    {account && user && <MenuItem onClick={handleClose}><Link href={"/account/builder/" + user.user_id}>Builder</Link></MenuItem>}
                    {account && !user && <MenuItem onClick={handleClose}><Link href={"/signup"}>Signup</Link></MenuItem>}
                    {account && !user && <MenuItem onClick={handleClose}><Link href={"/login"}>Login</Link></MenuItem>}
                    {account && user && <MenuItem onClick={handleClose}><Link href={"/logout"}>Logout</Link></MenuItem>}
                    {home && <MenuItem onClick={handleClose}><Link href={"/account/" + accountModel.id}>Home</Link></MenuItem>}
                    {shop && <MenuItem onClick={handleClose}><Link href={"/account/shop/" + accountModel.id}>Shop</Link></MenuItem>}
                    {about && <MenuItem onClick={handleClose}>About</MenuItem>}
                    {contact && <MenuItem onClick={handleClose}>Contact</MenuItem>}
                </Menu>
            </Toolbar>
        </AppBar>
    );
};

export default Navbar;