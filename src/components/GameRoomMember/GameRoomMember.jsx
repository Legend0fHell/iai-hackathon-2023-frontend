// import type { NextPage } from "next";
import React from "react";
import { Typography, Box, Button, Avatar } from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2"; // Grid version 2

// Images
import cat from "../../assets/images/cat.jpg";
import city from "../../assets/images/city.gif";

const Join = ({ onStart }) => {
  return (
    <>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "8px",
          paddingTop: "4%",
        }}
      >
        <Typography
          variant="h1"
          sx={{
            color: "#fff",
            fontFamily: "VT323, monospace",
            lineHeight: "normal",
          }}
        >
          Game: Giải tích I
        </Typography>

        <Typography
          variant="h4"
          sx={{
            color: "#fff",
            fontFamily: "Poppins, sans-serif",
          }}
        >
          Code: 85674385
        </Typography>
      </Box>

      <Grid
        container
        sx={{
          gap: "128px",
          paddingTop: "48px",
        }}
      >
        <Grid
          xs={4}
          sx={{
            display: "flex",
            width: "fit-content",
            gap: "16px",
            alignItems: "center",
          }}
        >
          <Avatar
            alt="Remy Sharp"
            src={`url(${cat.src})`}
            sx={{
              boxShadow:
                "0px 0px 0.5px 0px rgba(13, 15, 17, 0.10) inset, 6px 12px 24px 0px rgba(102, 146, 204, 0.08)",
              border: "2px solid #fff",
              width: "56px",
              height: "56px",
            }}
          />
          <Typography
            variant="body1"
            sx={{
              color: "#fff",
              fontFamily: "Poppins, sans-serif",
              fontSize: "24px",
              fontWeight: "bold",
            }}
          >
            Phuong Pham
          </Typography>
        </Grid>

        <Grid
          xs={4}
          sx={{
            display: "flex",
            width: "fit-content",
            gap: "16px",
            alignItems: "center",
          }}
        >
          <Avatar
            alt="Remy Sharp"
            src={`url(${cat.src})`}
            sx={{
              boxShadow:
                "0px 0px 0.5px 0px rgba(13, 15, 17, 0.10) inset, 6px 12px 24px 0px rgba(102, 146, 204, 0.08)",
              border: "2px solid #fff",
              width: "56px",
              height: "56px",
            }}
          />
          <Typography
            variant="body1"
            sx={{
              color: "#fff",
              fontFamily: "Poppins, sans-serif",
              fontSize: "24px",
              fontWeight: "bold",
            }}
          >
            Phuong Pham
          </Typography>
        </Grid>

        <Grid
          xs={4}
          sx={{
            display: "flex",
            width: "fit-content",
            gap: "16px",
            alignItems: "center",
          }}
        >
          <Avatar
            alt="Remy Sharp"
            src={`url(${cat.src})`}
            sx={{
              boxShadow:
                "0px 0px 0.5px 0px rgba(13, 15, 17, 0.10) inset, 6px 12px 24px 0px rgba(102, 146, 204, 0.08)",
              border: "2px solid #fff",
              width: "56px",
              height: "56px",
            }}
          />
          <Typography
            variant="body1"
            sx={{
              color: "#fff",
              fontFamily: "Poppins, sans-serif",
              fontSize: "24px",
              fontWeight: "bold",
            }}
          >
            Phuong Pham
          </Typography>
        </Grid>
      </Grid>

      <Button
        variant="contained"
        onClick={onStart}
        sx={{
          backgroundColor: "#fff",
          borderRadius: "5px",
          padding: "12px 24px",
          boxShadow:
            "0px 1px 2px 0px rgba(0, 0, 0, 0.24), 0px 1px 3px 0px rgba(0, 0, 0, 0.12)",
          color: "#000",
          fontFamily: "Poppins, sans-serif",
          fontWeight: "bold",
          marginTop: "32px",
        }}
      >
        Start Game
      </Button>
    </>
  );
};

export default Join;
