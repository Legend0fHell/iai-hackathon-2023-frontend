// import type { NextPage } from "next";
import React from "react";
import { useRouter } from "next/router";
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

const GameCard = ({ img_src, data }) => {
    const router = useRouter();
    const handleJoin = (e) => {
        if(data == null || data.rid == null || data.rid == "") return;
        fetch("http://127.0.0.1:5678/room/join", {
          method: "POST",
          body: JSON.stringify({
            uid: localStorage.getItem("uid"),
            data: data.rid,
          }),
          headers: {
            "Content-type": "application/json; charset=UTF-8",
          },
        })
          .then((response) => response.json())
          .then((json) => {
            console.log(json.msg);
            if(json.msg.charAt(0) == 'o') router.push(`/gameroom/${data.rid}`);
            else alert(json.msg);
          });
    }   
    console.log('data:', data)
    if (data) {
        if (data.ended == false) {
            return (
                <Grid xs={6} >
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
                                    {data.name ? data.name : 'Black Title'}
                                </Typography>
                                <Typography variant='body2' sx={{ fontFamily: 'Poppins, sans-serif', color: '#9D9BB9' }}>
                                    {data.desc ? data.desc : 'Blank Desc'}
                                </Typography>
                            </Box>
                            <Button
                                component='a'
                                variant='contained' sx={{
                                    backgroundColor: '#0698F9',
                                    borderRadius: '0px',
                                    padding: '10px 24px'
                                }}
                                onClick={handleJoin}>
                                
                                JOIN
                            </Button>
                        </Box>
                    </Box>
                </Grid>
            )
        }
    }
}

export default GameCard