// import type { NextPage } from "next";
import React, { useState, useEffect } from "react";
import { Container, Typography, Box, Button } from "@mui/material";

import { useRouter } from "next/router";
import Leaderboard from "../../../components/Leaderboard/Leaderboard";

// Images
// import character from "../../assets/images/character.png";
// import gem from "../../assets/images/gem.png";
import city from "../../../assets/images/city.gif";
import { socket } from "../../../models/wsEventListener";

const GameMaster = () => {
  const router = useRouter();

  const [dataRes, setData] = useState([]);
  const [qNum, setQNum] = useState(1);

  useState(() => {
    fetch("http://157.245.149.209:5678/room/get", {
      method: "POST",
      body: JSON.stringify({
        uid: localStorage.getItem("uid"),
        data: router.query.roomId,
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    })
      .then((response) => response.json())
      .then((json) => {
        let totQues = 1;
        console.log("num: ", json.data);
        if (json.data.qnum == 0) totQues = 1;
        else totQues = json.data.qnum;

        setQNum(totQues);

        fetch("http://157.245.149.209:5678/room/userlist", {
          method: "POST",
          body: JSON.stringify({
            uid: localStorage.getItem("uid"),
            data: router.query.roomId,
          }),
          headers: {
            "Content-type": "application/json; charset=UTF-8",
          },
        })
          .then((response) => response.json())
          .then((json) => {
            let data = [];
            data = json.data || [];
            let reme = -1;
            data.forEach((usr, idx) => {
              if (usr.data.mode == 9) reme = idx;
              else
                Object.assign(data[idx], {
                  rank: 0,
                  correctStreak: 0,
                  corCnt: 0,
                  totCnt: 0,
                  points: 0,
                  progress: 0,
                  qNum: totQues,
                });
            });
            if (reme > -1) data.splice(reme, 1);
            setData(data);
          });
      });
  }, []);

  useEffect(() => {
    socket.on(
      "get-playerData",
      (uid, correctStreak, corCnt, totCnt, points) => {
        setData((dataRes) => {
          dataRes.forEach((usr, idx) => {
            if (usr.user.uid == uid)
              Object.assign(dataRes[idx], {
                rank: 0,
                correctStreak,
                corCnt,
                totCnt,
                points,
                progress: ~~((totCnt / qNum) * 100),
                qNum,
              });
          });
          dataRes.sort((memA, memB) => {
            if (memA.points > memB.points) {
              return -1;
            } else return 1;
          });
          let rank = 1;
          dataRes.forEach((usr, idx) => {
            Object.assign(dataRes[idx], { rank: rank++ });
          });

          console.log("pls run: ", dataRes);

          let data = [...dataRes];
          return data;
        });
      }
    );
  }, [dataRes, qNum]);

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
          <Leaderboard data={dataRes} />
        </Box>
      </Box>
    </>
  );
};

export default GameMaster;
