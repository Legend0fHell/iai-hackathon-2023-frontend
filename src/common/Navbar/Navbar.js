import * as React from 'react';
import { AppBar, Container, Typography, Toolbar, Menu, MenuItem, Box, Button, IconButton, Avatar, } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { useRouter } from 'next/router'
import { logout } from "@/models/auth";

// Images
import cat from '../../assets/images/cat.jpg'

export const Navbar = ({ userData }) => {
    const links = ['#hero_section', '#main_feature_section', '#benefit_section']
    const pages = ['Get Started', 'Learn More', 'Activities']
    const [anchorElNav, setAnchorElNav] = React.useState(null);
    const router = useRouter()
    const removeRoutes = ['/login','/register']

    const handleOpenNavMenu = (event) => {
        setAnchorElNav(event.currentTarget);
    };

    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };

    if (!removeRoutes.includes(router.pathname)) {
        return (
            <nav>
                <AppBar position='static' sx={{ backgroundColor: '#21204A!important' }} >
                    <Container maxWidth='xl'
                        sx={{
                            padding: '0 2% !important'
                        }} >
                        <Toolbar disableGutters>
                            <Typography
                                variant='h6'
                                noWrap
                                component='a'
                                href="/"
                                sx={{
                                    mr: 2,
                                    display: { xs: 'none', md: 'flex' },
                                    fontFamily: 'Andy, sans-serif',
                                    fontWeight: 700,
                                    textDecoration: 'none',
                                    color: '#fff',
                                    fontSize: 32,
                                }}
                            >
                                Testeria
                            </Typography>

                            <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }} >
                                <IconButton
                                    size="large"
                                    aria-label="account of current user"
                                    aria-controls="menu-appbar"
                                    aria-haspopup="true"
                                    onClick={handleOpenNavMenu}
                                    color="default"
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
                                    {pages.map((page, index) => (
                                        <MenuItem key={page} component={'a'} href={links[index]} onClick={handleCloseNavMenu}>
                                            <Typography textAlign="center" sx={{
                                                fontFamily: 'Inter, sans-serif',
                                                color: '#FFFFFF !important',
                                                textTransform: 'capitalize!important',
                                            }}>{page}</Typography>
                                        </MenuItem>
                                    ))}
                                </Menu>
                            </Box>

                            <Typography
                                variant='h6'
                                noWrap
                                component='a'
                                href="/"
                                sx={(theme) => ({
                                    mr: 2,
                                    display: { xs: 'flex', md: 'none' },
                                    flexGrow: 1,
                                    fontWeight: 700,
                                    fontFamily: 'Andy, sans-serif',
                                    color: '#fff',
                                    textDecoration: 'none',
                                    fontSize: '1.5rem',
                                    [theme.breakpoints.down("md")]: {
                                        fontSize: '1rem',
                                    },
                                    [theme.breakpoints.down("sm")]: {
                                        fontSize: '0.8rem',
                                        mr: 0,
                                    },
                                })}
                            >
                                Testeria
                            </Typography>

                            <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' }, justifyContent: 'center' }}>
                                {pages.map((page, index) => (
                                    <Button
                                        key={page}
                                        onClick={handleCloseNavMenu}
                                        component='a'
                                        href={links[index]}
                                        sx={(theme) => ({
                                            my: 2,
                                            display: 'block',
                                            textTransform: 'capitalize!important',
                                            fontFamily: 'Inter, sans-serif',
                                            padding: "6px 32px",
                                            color: '#BDCADB',
                                            "&:hover": {
                                                color: '#FFF',
                                            },

                                        })}
                                        className={router.pathname == links[index] && 'nav_bold'}
                                    >
                                        {page}
                                    </Button>
                                ))}
                            </Box>

                            <Box sx={{ flexGrow: 0, display: 'flex', gap: '16px' }}>
                                <Button
                                    variant='contained'
                                    sx={(theme) => ({
                                        backgroundColor: 'transparent',
                                        border: '1px solid #fff',
                                        color: '#BDCADB',
                                        borderRadius: '0px',
                                        textTransform: 'capitalize!important',
                                        fontFamily: 'Inter, san-serif',
                                        [theme.breakpoints.down("md")]: {
                                            fontSize: '0.6rem',
                                        },
                                        [theme.breakpoints.down("sm")]: {
                                            fontSize: '0.5rem',
                                        },
                                        "&:hover": {
                                            color: '#fff'
                                        }
                                    })}
                                >
                                    Enter Code
                                </Button>


                                {userData.uid ? (
                                    <IconButton
                                        onClick={logout}
                                        sx={{ padding: '0px' }} >
                                        <Avatar alt="Cat" src={cat.src} sx={{
                                            border: '1px solid #fff',
                                        }} />
                                    </IconButton>
                                ) : (
                                    <Button
                                        component='a'
                                        href='/login'
                                        variant='contained'
                                        sx={(theme) => ({
                                            backgroundColor: '#9A62FF',
                                            fontColor: '#BDCADB',
                                            borderRadius: '0px',
                                            textTransform: 'capitalize!important',
                                            fontFamily: 'Inter, san-serif',
                                            paddingRight: '28px',
                                            paddingLeft: '28px',
                                            [theme.breakpoints.down("md")]: {
                                                fontSize: '0.6rem',
                                            },
                                            [theme.breakpoints.down("sm")]: {
                                                fontSize: '0.5rem',
                                            },
                                            "&:hover": {
                                                backgroundColor: '#9A62FF',
                                            }
                                        })}
                                    >
                                        Login
                                    </Button>
                                )}

                            </Box>

                        </Toolbar>
                    </Container>
                </AppBar>
            </nav>
        );
    }
}
