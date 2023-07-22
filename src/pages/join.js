// import type { NextPage } from "next";
import React from "react";
import {
    Typography,
    Box,
    Button,
    TextField
}
    from '@mui/material';

// Images
import city from '../assets/images/city.gif'

const Join = () => {
    const [code, setCode] = React.useState()

    const handleChange = (e) => {
        e.preventDefault();
        let data = e.target.value;
        setCode(data)
    }

    return (
        <>
            <Box component='section' sx={(theme) => ({
                height: '100vh',
            })}
            >
                <Box sx={{
                    height: '100%',
                    backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.20), rgba(0, 0, 0, 0.40)), url(${city.src})`,
                    backgroundSize: 'contain',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                    paddingBottom:'4%',
                    gap:'32px',
                    
                }}
                >
                    <Typography
                        variant='h1'
                        sx={{
                            color: '#fff',
                            fontFamily: 'VT323, monospace',
                            lineHeight: 'normal',
                            textShadow: '0px 4px rgba(0, 0, 0, 0.25)',
                            fontSize: '10rem'
                        }}
                    >
                        JOIN GAME
                    </Typography>

                    <Box sx={{
                        display: 'flex',
                        backgroundColor: '#fff',
                        width: '35%',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        padding: '0 4px',
                        boxShadow: '0px 4px 4px 0px rgba(0, 0, 0, 0.25)'
                    }} >
                        <TextField
                            label="Enter Code Here (Number Only)"
                            variant="filled"
                            value={code}
                            type='number'
                            onChange={handleChange}
                            sx={{
                                width: '100%',
                                fontWeight: 'bold',
                                '& > div': {
                                    backgroundColor: '#fff',
                                    borderRadius: '0px',
                                    border: '0px',
                                },
                                '& > label': {
                                    fontFamily: 'Poppins, sans-serif',
                                    fontWeight: 600,
                                    lineHeight: '24px',
                                },
                            }}
                        />
                        <Button
                            variant='contained'
                            sx={{
                                borderRadius: '0px',
                                padding: '10px 32px',
                                width: 'fit-content',
                                height: 'fit-content',
                                backgroundColor: '#0698F9'
                            }}
                        >
                            JOIN
                        </Button>
                    </Box>
                </Box>
            </Box>
        </>
    )
};

export default Join;