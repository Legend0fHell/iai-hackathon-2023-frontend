import { Box } from "@mui/material";
import GameRoomMember from "../../../components/GameRoomMember/GameRoomMember";
import city from "../../../assets/images/city.gif";
import { useCallback, useEffect } from "react";
import { useRouter } from "next/router";
import { socket } from "../../../models/wsEventListener";

export default function GameRoom() {
  const router = useRouter();
  console.log(router.query.roomId)
  const startGame = useCallback(() => {
    console.log('Start')
    socket.emit("post-start");
  }, []);

  useEffect(() => {
    socket.emit(
      "post-joinRoom",
      localStorage.getItem("uid"),
      router.query.roomId
    );

    setTimeout(() => {
      socket.emit("post-ready", 1);
    }, 50);

    socket.on("get-start", (state) => {
      console.log(state);

      if (state == 1) {
        socket.emit("post-ready", 2);
      } else {
        router.push(`/game/${router.query.roomId}`);
      }
    });
  }, []);

  return (
    <Box
      component="section"
      sx={{
        height: "100vh",
      }}
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
        <GameRoomMember onStart={startGame} />
      </Box>
    </Box>
  );
}
