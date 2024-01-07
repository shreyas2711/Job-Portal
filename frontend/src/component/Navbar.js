import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import WorkIcon from '@mui/icons-material/Work';
import { Link} from 'react-router-dom';
import { useTheme } from '@emotion/react';
// import { useDispatch ,useSelector } from 'react-redux';
// import { userLogoutAction } from '../redux/actions/userAction';
import { useState } from 'react';

const pages = ['Home', 'Log In'];


function Navbar() {

    // const navigate = useNavigate();

    //hide/ show button(login)

    // const {userInfo} = useSelector(state=>state.signIn);
    const [isAuth, setIsAuth] = useState(localStorage.getItem("isAuth") === 'true');

    // const dispatch = useDispatch();
    // const navigate = useNavigate;
    const { palette } = useTheme();
    const [anchorElNav, setAnchorElNav] = React.useState(null);
    const [anchorElUser, setAnchorElUser] = React.useState(null);

    const handleOpenNavMenu = (event) => {
        setAnchorElNav(event.currentTarget);
    };
    const handleOpenUserMenu = (event) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

    // logout user
    // const logOutuser = ()=>{

    //     dispatch(userLogoutAction())
    //     window.location.reload(true);
    //     setTimeout(()=>{
    //     navigate('/');
    //     },500)
       
    // }

    const logOutuser = () => {
        // Clear the authentication token from localStorage
        console.log('Before clearing cookie:', document.cookie);
        // document.cookie = 'token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; Secure;';
        // console.log('After clearing cookie:', document.cookie);


        // window.localStorage.clear();
        localStorage.removeItem('authToken');
    
        // Update the state to reflect the logout
        localStorage.setItem('isAuth', false);
        setIsAuth(false); 
       
    
        // Reload the page
        window.location.reload(true);
    
        // Redirect to the login page
        window.location.pathname = "/";
    };
    


    return (
        <AppBar position="static" style={{marginTop:'-1rem',height:'6rem'}}>
            <Container  >
                {/* principal Menu */}
                <Toolbar disableGutters>
                    <WorkIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 ,marginRight:'2rem'}} />
                    <Typography
                        variant="h6"
                        noWrap
                        component="a"
                        href="/"
                        sx={{
                            mr: 2,
                            display: { xs: 'none', md: 'flex' },
                            fontFamily: 'monospace',
                            fontWeight: 700,
                            letterSpacing: '.3rem',
                            color: 'inherit',
                            textDecoration: 'none',
                            margin:'0px'
                            
                        }}
                    >
                        JOB PORTAL
                    </Typography>

                    <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' }}}>
                        <IconButton
                            size="large"
                            aria-label="account of current user"
                            aria-controls="menu-appbar"
                            aria-haspopup="true"
                            onClick={handleOpenNavMenu}
                            color="inherit"
                        >
                            <MenuIcon />
                        </IconButton>
                        <Menu
                            id="menu-appbar"
                            anchorEl={anchorElNav}
                            anchorOrigin={{
                                vertical: 'bottom',
                                horizontal: 'left',
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'left',
                            }}
                            open={Boolean(anchorElNav)}
                            onClose={handleCloseNavMenu}
                            sx={{
                                display: { xs: 'block', md: 'none' },
                            }}
                        >
                            {pages.map((page) => (
                                <MenuItem key={page} onClick={handleCloseNavMenu}>
                                    <Typography textAlign="center">{page}</Typography>
                                </MenuItem>
                            ))}
                        </Menu>
                    </Box>
                    <WorkIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} />
                    <Typography
                        variant="h6"
                        noWrap
                        component="a"
                        href=""
                        sx={{
                            mr: 2,
                            display: { xs: 'flex', md: 'none' },
                            flexGrow: 1,
                            fontFamily: 'monospace',
                            fontWeight: 700,
                            letterSpacing: '.2rem',
                            color: 'inherit',
                            textDecoration: 'none',
                        }}
                    >
                        JOB PORTAL
                    </Typography>
                    <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex',margin:'14px',  } }}>
                        {/* menu desktop */}

                        <Button
                            onClick={handleCloseNavMenu}
                            sx={{ my: 2, color: 'white', display: 'block' }}>
                            <Link to="/" style={{ color: 'white', textDecoration: "none" }}>
                                Home
                            </Link>
                        </Button>

                        {isAuth ? (
                                    <Box sx={{margin:'7px'}}>
                                    <div className="button-createpost">
                                    <Button 
                                    onClick={handleCloseNavMenu}
                                    sx={{ my: 2, color: 'white', display: 'block'}}
                                    >
                                    <Link to="/createpost" style={{ color: 'white', textDecoration: 'none' }}>
                                        CreatePost
                                    </Link>
                                    </Button>
                                    </div>
                                </Box>
                                ) : null}

                       </Box>
                    <Box sx={{ flexGrow: 0 ,marginTop:'27px' }}>
                        <Tooltip title="Open settings">
                            <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                                <Avatar alt="Remy Sharp" src="" />
                            </IconButton>
                        </Tooltip>
                        <Menu
                            sx={{ mt: '45px' }}
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

                            <MenuItem onClick={handleCloseUserMenu}>
                                <Typography textAlign="center"><Link style={{ textDecoration: "none", color: palette.primary.main }} to="/admin/dashboard">Dashboard</Link></Typography>
                            </MenuItem>

                            {
                                !isAuth ?(
                            <Link to={"/login"}> <MenuItem onClick={handleCloseUserMenu}>
                              <Typography textAlign="center"><Link style={{ textDecoration: "none", color: palette.primary.main }} to="/login">Log In</Link></Typography>
                                   </MenuItem> </Link>) :(

                            <MenuItem onClick={logOutuser} >
                                <Typography style={{ textDecoration: "none", color: palette.primary.main }} textAlign="center">Log Out</Typography>
                            </MenuItem>
                                   )
                            }



                        </Menu>
                    </Box>
                </Toolbar>
            </Container>
        </AppBar>
    );
}
export default Navbar;