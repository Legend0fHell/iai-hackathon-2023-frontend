import React from "react";
import {
    Typography,
    Box,
    Button,
    Container,
    Dialog,
    DialogContent,
    Select,
    MenuItem,
    InputLabel,
    FormControl,
    InputAdornment,
    IconButton,
    OutlinedInput
}
    from '@mui/material';
import { Input } from 'antd';
import SearchIcon from '@mui/icons-material/Search';
import CachedIcon from '@mui/icons-material/Cached';
import Grid from '@mui/material/Unstable_Grid2'; // Grid version 2
import Image from "next/image";

// Icons
import PeopleIcon from '@mui/icons-material/People';

// Components
import GroupCard from "../../components/Group/GroupCard";

import image1 from '../../assets/images/login_bg.jpg'
import { set } from "lodash";

const GroupPage = () => {
    const [searchData, setSearchData] = React.useState('');
    const [open, setOpen] = React.useState(false);

    const [data, setData] = React.useState('');
    const [member, setMember] = React.useState()
    const [code, setCode] = React.useState()

    const handleChange = (e) => {
        console.log(e.target.value);
        setSearchData(e.target.value)
    }

    const handleFormChange = (e) => {
        let value = e.target.value;
        setData(value)
    }

    const handleSelect = (e) => {
        setMember(e.target.value)
    }

    const handleRandomCode = (e) => {
        let code = Math.floor(100000 + Math.random() * 900000);
        setCode(code)
    }

    const handleClose = () => {
        setOpen(false);
        setData('')
        setMember()
        setCode()
    };

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleSubmit = () => {
        let group_data = {
            'game_name' : data,
            'members': member,
            'code': code
        }
        console.log(group_data)
        console.log('Submit')
    }

    return (
        <>
            <Box component='section' className="GroupSection" sx={(theme) => ({
                backgroundColor: '#F0F4FF',
            })}>
                <Container maxWidth='xl' sx={{ padding: '2% 2% !important' }} >
                    {/* Title Section */}
                    <Box sx={{
                        display: 'flex',
                        gap: '32px',
                        alignItems: 'center',
                        paddingBottom: '32px',
                        borderBottom: '2px solid #BDCADB'
                    }} >
                        <Typography variant='h4' sx={{
                            fontFamily: 'Poppins, sans-serif',
                            color: '#476285',
                            fontWeight: 400,
                            lineHeight: '36px'
                        }} >
                            All Groups
                        </Typography>
                        <Button
                            variant='contained'
                            onClick={handleClickOpen}
                            sx={{
                                backgroundColor: '#CDE2FE',
                                color: '#11315B',
                                textTransform: 'capitalize',
                                fontSize: '16px',
                                padding: '10px 24px',
                                borderRadius: '12px',
                                boxShadow: 'none',
                                '&:hover': {
                                    backgroundColor: '#CDE2FE',
                                    color: '#11315B',
                                    boxShadow: '0px 2px 4px -1px rgba(0,0,0,0.2), 0px 4px 5px 0px rgba(0,0,0,0.14), 0px 1px 10px 0px rgba(0,0,0,0.12)'
                                }
                            }}
                        >
                            Create New Group
                        </Button>
                    </Box>

                    {/* Body */}
                    <Box>
                        <Grid container sx={{
                            padding: '2% 0'
                        }} >
                            <Grid xs={3} sx={{ paddingRight: '3%' }} >
                                <Input size="large" onChange={handleChange} placeholder="Search" prefix={<SearchIcon />} />
                                <Button
                                    variant='contained'
                                    sx={{
                                        marginTop: '16px',
                                        backgroundColor: '#CDE2FE',
                                        color: '#11315B',
                                        textTransform: 'capitalize',
                                        // padding: '10px 20px',
                                        borderRadius: '12px',
                                        fontWeight: 'bold',
                                        width: '100%',
                                        boxShadow: 'none',
                                        '&:hover': {
                                            backgroundColor: '#CDE2FE',
                                            color: '#11315B',
                                            boxShadow: '0px 2px 4px -1px rgba(0,0,0,0.2), 0px 4px 5px 0px rgba(0,0,0,0.14), 0px 1px 10px 0px rgba(0,0,0,0.12)'
                                        }
                                    }}
                                >
                                    Reset
                                </Button>
                            </Grid>
                            <Grid xs={9} sx={{ paddingLeft: '1%' }}>
                                <GroupCard />
                                <GroupCard />
                                <GroupCard />
                                <GroupCard />
                                <GroupCard />
                            </Grid>
                        </Grid>
                    </Box>

                    {/* Pop Up Create Game */}
                    <Dialog
                        fullWidth={true}
                        maxWidth='md'
                        open={open}
                        onClose={handleClose}

                    >
                        <DialogContent sx={{ padding: '0px' }} >
                            <Box sx={{
                                backgroundColor: '#F0F4FF',
                                padding: '4%'
                            }} >
                                <Grid container sx={{}} spacing={8} >
                                    <Grid xs={5}>
                                        <Box sx={{
                                            display: 'flex',
                                            justifyContent: 'center'
                                        }} >
                                            <Box>
                                                <Typography variant='h6' sx={{
                                                    fontFamily: 'Poppins, sans-serif',
                                                    color: '#11315B',
                                                    fontWeight: 'bold',
                                                    paddingBottom: '16px'
                                                }} >
                                                    Preview
                                                </Typography>

                                                <Box sx={{
                                                    backgroundColor: '#fff',
                                                    borderRadius: '16px',
                                                    width: 'fit-content',
                                                    padding: '16px',
                                                    borderRadius: '16px'
                                                }} >
                                                    <Image src={image1} width={280} height={280} alt='image' style={{
                                                        objectFit: 'cover',
                                                        borderRadius: '16px'
                                                    }} />
                                                    <Box sx={{ paddingTop: '32px' }} >
                                                        <Typography variant='body2' sx={{
                                                            fontFamily: 'Poppins, sans-serif',
                                                            color: '#9D9BB9',

                                                        }} >
                                                            Game name
                                                        </Typography>
                                                        <Input size="large" id='game_name' onChange={handleFormChange} placeholder="Game name" />
                                                    </Box>
                                                </Box>
                                            </Box>

                                        </Box>

                                    </Grid>
                                    <Grid xs={7}>
                                        <Typography variant='h4' sx={{
                                            color: '#21204A',
                                            fontWeight: 'bold',
                                            fontFamily: 'Poppins, sans-serif',
                                            paddingBottom: '16px'
                                        }} >
                                            Create New Group
                                        </Typography>
                                        <Box sx={{
                                            display: 'flex',
                                            flexDirection: 'column',

                                        }} >
                                            <Typography variant='body1' sx={{
                                                fontFamily: 'Poppins, sans-serif',
                                                color: '#11315B',
                                                paddingBottom: '12px',
                                                fontWeight: 'bold'
                                            }}>
                                                Number of members
                                            </Typography>
                                            <FormControl sx={{ width: '30ch', paddingBottom: '16px' }} required>
                                                <InputLabel id="demo-simple-select-label">Age</InputLabel>
                                                <Select
                                                    id="nums_of_member"
                                                    value={member}
                                                    label="Age"
                                                    onChange={handleSelect}
                                                >
                                                    <MenuItem value={10}>10</MenuItem>
                                                    <MenuItem value={20}>20</MenuItem>
                                                    <MenuItem value={30}>30</MenuItem>
                                                </Select>
                                            </FormControl>

                                            <Typography variant='body1' sx={{
                                                fontFamily: 'Poppins, sans-serif',
                                                color: '#11315B',
                                                fontWeight: 'bold'
                                            }} >
                                                Group Code
                                            </Typography>
                                            <Typography variant='body2' sx={{
                                                fontFamily: 'Poppins, sans-serif',
                                                color: '#6E84AB',
                                                paddingBottom: '12px'
                                            }} >
                                                Other people use this code to join group
                                            </Typography>

                                            <FormControl sx={{ width: '30ch', paddingBottom: '16px' }} variant="outlined" >
                                                {/* <InputLabel htmlFor="outlined-adornment-password">{code}</InputLabel> */}
                                                <OutlinedInput
                                                    id="outlined-adornment-password"
                                                    type='text'
                                                    disabled={true}
                                                    value={code}
                                                    required
                                                    endAdornment={
                                                        <InputAdornment position="end">
                                                            <IconButton
                                                                aria-label="toggle password visibility"
                                                                onClick={handleRandomCode}
                                                                edge="end"
                                                            >
                                                                <CachedIcon />
                                                            </IconButton>
                                                        </InputAdornment>
                                                    }
                                                    label="Game Code"

                                                />
                                            </FormControl>

                                            <Button
                                                variant='contained'
                                                onClick={handleSubmit}
                                                sx={{
                                                    width: '25ch',
                                                    backgroundColor: '#CDE2FE',
                                                    color: '#11315B',
                                                    textTransform: 'capitalize',
                                                    fontSize: '16px',
                                                    padding: '10px 24px',
                                                    borderRadius: '12px',
                                                    boxShadow: 'none',
                                                    '&:hover': {
                                                        backgroundColor: '#CDE2FE',
                                                        color: '#11315B',
                                                        boxShadow: '0px 2px 4px -1px rgba(0,0,0,0.2), 0px 4px 5px 0px rgba(0,0,0,0.14), 0px 1px 10px 0px rgba(0,0,0,0.12)'
                                                    }
                                                }}
                                            >
                                                Create
                                            </Button>
                                        </Box>
                                    </Grid>
                                </Grid>
                            </Box>
                        </DialogContent>
                    </Dialog>
                </Container>
            </Box>
        </>
    )
}

export default GroupPage;