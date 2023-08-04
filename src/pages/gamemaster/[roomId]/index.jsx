// import type { NextPage } from "next";
import React from "react";
import {
  Container,
  Typography,
  Box,
  Button,
} from "@mui/material";

import Leaderboard from "../../../components/Leaderboard/Leaderboard";

// Images
// import character from "../../assets/images/character.png";
// import gem from "../../assets/images/gem.png";
import city from "../../../assets/images/city.gif";


const GameMaster = () => {
  return (
    <>
      <Box
        component="section"
        sx={(theme) => ({
          height: "100vh",
        })}
      >
        <Box
          sx={{
            height: "100%",
            backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.20), rgba(0, 0, 0, 0.40)), url(${city.src})`,
            backgroundSize: "contain",
            display: "flex",
            flexDirection: "column",
            // justifyContent: 'center',
            alignItems: "center",
            paddingBottom: "4%",
          }}
        >

          <Leaderboard/>

        </Box>
      </Box>
    </>
  );
};

export default GameMaster;
