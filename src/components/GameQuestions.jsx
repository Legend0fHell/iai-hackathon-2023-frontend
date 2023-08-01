import React, { useEffect, useState } from "react";
import {
    Typography,
    Box,
    Button
}
    from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2'; // Grid version 2

const GameQuestions = ({ data, handleOnClick, correct, answer, message }) => {

    return (
        <Box sx={{
            backgroundColor: '#000',
            padding: '2%',
            width:'100%'
        }}>
            <Typography variant='h5' sx={{
                fontFamily: 'VT323, sans-serif',
                color: correct,
                fontSize: '30px'
            }} >
                {data.question ? data.question : 'Câu 1: Bộ phận nào trong số các bộ phận sau đây thuộc hệ hô hấp ?'}
            </Typography>
            {answer ? (
                <Typography variant='body1' sx={{
                fontFamily: 'VT323, sans-serif',
                color: 'rgba(255, 255, 255, 0.60)',
                fontSize: '30px'
            }} >
                {message}
            </Typography>
            ):(null)}
            <Grid container sx={{ 
                padding: '2% 2%', 
                display: answer ? 'none' : 'flex'
            }}  >
                <Grid xs={6} sx={{ padding: '0 32px' }} >
                    <Button
                        onClick={handleOnClick}
                        variant="outlined"
                        value={0}
                        sx={{
                            transition: '0.5s',
                            fontFamily: 'VT323, sans-serif',
                            color: 'rgba(255, 255, 255, 0.60)',
                            fontSize: '20px',
                            borderColor: 'rgba(255, 255, 255, 0.60)',
                            margin: '8px',
                            width: '100%',
                            justifyContent: 'flex-start',
                            '&:hover': {
                                borderColor: '#fff',
                                color: '#fff'
                            }
                        }}>
                        A. {data.answers[0] ? data.answers[0] : 'Gan'}
                    </Button>
                </Grid>
                <Grid xs={6} sx={{ padding: '0 32px' }} >
                    <Button
                        onClick={handleOnClick}
                        variant="outlined"
                        value={1}
                        sx={{
                            transition: '0.5s',
                            fontFamily: 'VT323, sans-serif',
                            color: 'rgba(255, 255, 255, 0.60)',
                            fontSize: '20px',
                            borderColor: 'rgba(255, 255, 255, 0.60)',
                            margin: '8px',
                            width: '100%',
                            justifyContent: 'flex-start',
                            '&:hover': {
                                borderColor: '#fff',
                                color: '#fff'
                            }
                        }}>
                        B. {data.answers[1] ? data.answers[1] : 'Dạ Dày'}
                    </Button>
                </Grid>
                <Grid xs={6} sx={{ padding: '0 32px' }} >
                    <Button
                        onClick={handleOnClick}
                        variant="outlined"
                        value={2}
                        sx={{
                            transition: '0.5s',
                            fontFamily: 'VT323, sans-serif',
                            color: 'rgba(255, 255, 255, 0.60)',
                            fontSize: '20px',
                            borderColor: 'rgba(255, 255, 255, 0.60)',
                            margin: '8px',
                            width: '100%',
                            justifyContent: 'flex-start',
                            '&:hover': {
                                borderColor: '#fff',
                                color: '#fff'
                            }
                        }}>
                        C. {data.answers[2] ? data.answers[2] : 'Não Bộ'}
                    </Button>
                </Grid>
                <Grid xs={6} sx={{ padding: '0 32px' }} >
                    <Button
                        onClick={handleOnClick}
                        variant="outlined"
                        // className = {}
                        value={3}
                        sx={{
                            transition: '0.5s',
                            fontFamily: 'VT323, sans-serif',
                            color: 'rgba(255, 255, 255, 0.60)',
                            fontSize: '20px',
                            borderColor: 'rgba(255, 255, 255, 0.60)',
                            margin: '8px',
                            width: '100%',
                            justifyContent: 'flex-start',
                            '&:hover': {
                                borderColor: '#fff',
                                color: '#fff'
                            }
                        }}>
                        D. {data.answers[3] ? data.answers[3] : 'Phổi'}
                    </Button>
                </Grid>
            </Grid>
        </Box>
    )
}

export default GameQuestions;