// import type { NextPage } from "next";
import React from "react";
import {
    Typography,
    Box,
    Button
}
    from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2'; // Grid version 2
import Image from "next/image";
import PropTypes from 'prop-types';

import GameMasterPlayerCard from "../GameMasterPlayerCard/GameMasterPlayerCard";

// Images
import users from '../../assets/images/users.png'
import city from '../../assets/images/city.gif'

const Leaderboard = ({data}) => {
    let trash_data = [
        {
            rank: 1,
            ava_src: 'https://i.natgeofe.com/n/548467d8-c5f1-4551-9f58-6817a8d2c45e/NationalGeographic_2572187_2x3.jpg',
            name: 'Nhat Minh',
            progress: 70,
            cleartime: '31 min 42 s'
        },
        {
            rank: 2,
            ava_src: 'data:image/jpeg;base64,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',
            name: 'Minh Nhat',
            progress: 80,
            cleartime: ''
        }
    ]

    return (
        <Box sx={{
            width: '80%',
            height: '400px',
            backgroundColor: 'rgba(36, 36, 36, 0.70)',
            borderRadius: '5px',
            marginTop: '4%'
        }} >
            <Box sx={{
                width: '100%',
                backgroundColor: 'rgba(36, 36, 36, 0.85)',
                display: 'flex',
                padding: '20px',
                justifyContent: 'space-between',
                borderRadius: '5px 5px 0px 0px'
            }} >
                <Box sx={{
                    display: 'flex',
                    gap: '16px'
                }} >
                    <Image src={users} width={24} height={24} style={{

                    }} />
                    <Typography variant='h6' sx={{
                        color: '#fff',
                        fontFamily: 'Poppins, sans-serif'
                    }}>
                         players
                    </Typography>
                </Box>
                {/* After finish game => This appear to let game master back to dashboard */}
                <Button
                    component='a'
                    href='/dashboard'
                    variant='outlined'
                    sx={{
                        border: '1px solid #E4E4E4',
                        color: '#fff',
                        '&:hover': {
                            borderColor: '#fff'
                        }
                    }}>
                    Back to Dashboard
                </Button>

            </Box>

            <Box sx={{
                padding: '16px 32px'
            }} >
                <Grid container sx={{ borderBottom: '1px solid #fff' }} >
                    <Grid xs={1}>
                        <Typography variant='h6' sx={{
                            fontFamily: 'Poppins, sans-serif',
                            color: '#fff'
                        }}>
                            Rank
                        </Typography>
                    </Grid>
                    <Grid xs={3}>
                        <Typography variant='h6' sx={{
                            fontFamily: 'Poppins, sans-serif',
                            color: '#fff'
                        }}>
                            Name
                        </Typography>
                    </Grid>
                    <Grid xs={2}>
                        <Typography variant='h6' sx={{
                            fontFamily: 'Poppins, sans-serif',
                            color: '#fff'
                        }}>
                            Points
                        </Typography>
                    </Grid>
                    <Grid xs={2}>
                        <Typography variant='h6' sx={{
                            fontFamily: 'Poppins, sans-serif',
                            color: '#fff'
                        }}>
                            Progress
                        </Typography>
                    </Grid>
                    <Grid xs={2}>
                        <Typography variant='h6' sx={{
                            fontFamily: 'Poppins, sans-serif',
                            color: '#fff'
                        }}>
                            Answered
                        </Typography>
                    </Grid>
                </Grid>

                <Box sx={{ padding: '20px 0', display: 'flex', flexDirection: 'column', gap: '16px' }}>
                    {data.map((item, index) => {
                        return (
                            <GameMasterPlayerCard data={item} key={index} />
                        )
                    })}
                </Box>


            </Box>

        </Box>
    )
};

export default Leaderboard;