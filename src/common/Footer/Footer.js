import * as React from 'react';
import { Container, Typography, Box, Button, TextField } from '@mui/material';
import { useRouter } from 'next/router'
import { FacebookOutlined } from '@ant-design/icons';
// import { useRouter } from 'next/router'

export const Footer = () => {
    const links = ['/', '/library', '/project/ebs']
    const pages = ['Trang chủ', 'Thư viện', 'Dự án']
    const router = useRouter()
    console.log(router.pathname)

    return (
        <Box component="footer" sx={{ background: '#333333' }}>
            <Container maxWidth='xl'>
                <Box sx={(theme) => ({
                    pt: '4%',
                    pb: '2%',
                    [theme.breakpoints.down("md")]: {
                        pb: '4%'
                    },
                })} >
                    <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                        <Typography component='a' href='/' variant='h4' sx={(theme) => ({
                            fontFamily: 'Inter, sans-serif',
                            fontWeight: 700,
                            textDecoration: 'none',
                            fontSize: '1.5rem',
                            color: '#FFFFFF',
                            mx: 'auto',
                            [theme.breakpoints.down("md")]: {
                                fontSize: '1rem',
                            },
                            [theme.breakpoints.down("sm")]: {
                                fontSize: '0.8rem',
                            },
                        })}>
                            AnimalShelter
                        </Typography>
                    </Box>
                    <Box sx={(theme) => ({
                        pt: '2%',
                        display: 'flex',
                        justifyContent: 'center',
                        flexGrow: 1
                    })}>
                        {pages.map((page, index) => (
                            <Box component='span' key={page} sx={{ px: '3%' }} >
                                <Typography
                                    component='a'
                                    href={links[index]}
                                    variant='body1'
                                    className={router.pathname == links[index] && 'footer_bold'}
                                    sx={(theme) => ({
                                        fontFamily: 'Inter, sans-serif',
                                        fontWeight: 400,
                                        fontSize: '1rem',
                                        color: '#FFFFFF',
                                        [theme.breakpoints.down("md")]: {
                                            fontSize: '0.8rem',
                                        },
                                        [theme.breakpoints.down("sm")]: {
                                            fontSize: '0.6rem',
                                        },
                                    })}
                                >
                                    {page}
                                </Typography>
                            </Box>
                        ))}
                    </Box>
                </Box>
                <Box sx={{
                    borderTop: '0.5px solid #FFFFFF'
                }}>
                    <Box sx={(theme) => ({
                        display: 'flex',
                        justifyContent: 'space-between',
                        py: '2%',
                        [theme.breakpoints.down("md")]: {
                            pt: '3%'
                        },
                    })}>
                        <Typography variant='body2'
                            sx={(theme) => ({
                                fontFamily: 'Inter, sans-serif',
                                fontSize: '0.875rem',
                                fontWeight: '400',
                                color: '#D9DBE1',
                                [theme.breakpoints.down("md")]: {
                                    fontSize: '0.65rem',
                                },
                            })}
                        >
                            © 2022 Animal Shelter. All rights reserved
                        </Typography>
                        <Box component='a' href='https://www.facebook.com/minhpmdev/' target={'_blank'}>
                            <FacebookOutlined spin={true} style={{ color: '#D9DBE1' }} />
                        </Box>
                    </Box>

                </Box>
            </Container>
        </Box>
    );
}
