// import type { NextPage } from "next";
import React, { useEffect, useState } from "react";
import {
    Typography,
    Box,
    Button,
} from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2'; // Grid version 2
import Image from "next/image";

// Images
import bg1 from '../../assets/images/login_bg.jpg'
import bg2 from '../../assets/images/register_bg.jpg'

const GroupCard = ({ img_src, title, description, code, data }) => {
    const [cardData, setCardData] = useState('');
    const [difficulty, setDifficulty] = useState('')

    if (data) {
        useEffect(() => {
            fetch("http://127.0.0.1:5678/room/get", {
                method: "POST",
                body: JSON.stringify({
                    'uid': localStorage.getItem("uid"),
                    'data': data.rid
                }),
                headers: {
                    "Content-type": "application/json; charset=UTF-8",
                },
            })
                .then((response) => response.json())
                .then((json) => {
                    setCardData(json.data)

                    if (json.data.diff < 0.4) {
                        let config = {
                            'mess': 'Easy',
                            'color': '#00D348'
                        }
                        setDifficulty(config)
                    } else if (json.data.diff > 0.6) {
                        let config = {
                            'mess': 'Hard',
                            'color': '#FC1E1E'
                        }
                        setDifficulty(config)
                    } else {
                        let config = {
                            'mess': 'Normal',
                            'color': '#E49B2E'
                        }
                        setDifficulty(config)
                    }
                });
        }, [])
        if (cardData) {
            return (
                <Box sx={{
                    backgroundColor: '#fff',
                    borderRadius: '16px',
                    padding: '12px',
                    width: 'fit-content',
                    width: '100%',
                    boxShadow: '0px 0px 0.5px 0px rgba(0, 0, 0, 0.10) inset, 6px 12px 18px 0px rgba(102, 146, 204, 0.08)'
                }}>
                    <Image src={img_src ? img_src : bg1} alt='background' style={{
                        aspectRatio: '16/12',
                        width: '100%',
                        height: 'auto',
                        borderRadius: '16px',
                        objectFit: 'cover'
                    }} />

                    <Box sx={{ display: 'flex', justifyContent: 'space-between', pt: 3 }} >
                        <Box>
                            <Typography variant='body1' sx={{ fontFamily: 'Poppins, sans-serif', fontWeight: 'bold', color: '#11315B' }}>
                                {cardData.name ? cardData.name : 'Blank Title'}
                            </Typography>
                            <Typography variant='body2' sx={{ fontFamily: 'Poppins, sans-serif', color: '#9D9BB9' }}>
                                {cardData.desc ? cardData.desc : 'Blank Description'}
                            </Typography>
                        </Box>
                        <Button
                            component='a'
                            href={`/gameroom/${data.rid}`}
                            variant='contained' sx={{
                                backgroundColor: '#0698F9',
                                borderRadius: '0px',
                                padding: '10px 24px'
                            }}>
                            JOIN
                        </Button>
                    </Box>

                    <Box sx={{
                        padding: '8px 16px',
                        backgroundColor: 'rgba(160, 160, 214, 0.10)',
                        display: 'flex',
                        justifyContent: 'space-between',
                        borderRadius: '12px',
                        marginTop: '16px',
                    }} >
                        <Box>
                            <Typography variant='body2' sx={{
                                fontFamily: 'Poppins, sans-serif',
                                color: '#9D9BB9'
                            }} >
                                Difficulty
                            </Typography>
                            <Typography variant='body1' sx={{
                                fontFamily: 'Poppins, sans-serif',
                                color: difficulty.color,
                                fontWeight: 'bold'
                            }} >
                                {difficulty.mess}
                            </Typography>
                        </Box>

                        <Box>
                            <Typography variant='body2' sx={{
                                fontFamily: 'Poppins, sans-serif',
                                color: '#9D9BB9'
                            }} >
                                Questions
                            </Typography>
                            <Typography variant='body1' sx={{
                                fontFamily: 'Poppins, sans-serif',
                                color: '#11315B',
                                fontWeight: 'bold'
                            }} >
                                {cardData.qnum ? cardData.qnum : '0'}
                            </Typography>
                        </Box>
                    </Box>
                </Box>
            )
        }
    }
}

export default GroupCard