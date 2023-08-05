import { Box } from "@mui/material";
import GameRoomMember from "../../../components/GameRoomMember/GameRoomMember";
import city from "../../../assets/images/city.gif";
import { useCallback, useEffect, useState } from "react";
import { useRouter } from "next/router";
import { socket } from "../../../models/wsEventListener";

export default function GameRoom() {
  const router = useRouter();

  const [data, setData] = useState([]);
  const [role, setRole] = useState('');
  const [roomData, setRoomData] = useState('');

  const startGame = useCallback(() => {
    console.log('Start')
    socket.emit("post-start");
  }, []);

  const leaveGame = useCallback(() => {
    console.log('Leave');
    fetch("http://157.245.149.209:5678/room/leave", {
      method: "POST",
      body: JSON.stringify({
        'uid': localStorage.getItem("uid"),
        'data': router.query.roomId
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    })
      .then((response) => response.json())
      .then((json) => {
        router.push('/dashboard')
      });
  }, [])

  useEffect(() => {
    socket.emit(
      "post-joinRoom",
      localStorage.getItem("uid"),
      router.query.roomId
    );

    setTimeout(() => {
      socket.emit("post-ready", 1);
    }, 50);

    socket.on("get-join", (state) => {
      console.log('join state', state)
      setData(data => {
        let ball_data = {
          "user": state,
          "data": {
            "mode": 1
          }
        }
        return [...data, ball_data]
      })
    })

    socket.on("get-leave", (state) => {
      console.log('Leave State:', state);
      setData(data => {
        let tr_data = [...data]
        let ensure = false;
        console.log('Before data:', tr_data)
        tr_data.forEach((usr, idx) => {
          if (usr.user.uid == state && !ensure) {
            tr_data.splice(idx, 1);
            ensure = true;
          }
        })
        console.log('after data', tr_data)
        return tr_data;
      })
    })
  }, []);

  useEffect(() => {
    socket.on("get-start", (state) => {
      console.log(state);

      if (state == 1) {
        socket.emit("post-ready", 2);
      } else {
        console.log('role',role)
        if (role == "Admin") {
          console.log('Push Admin')
          router.push(`/gamemaster/${router.query.roomId}`);
        } else {
          console.log("Push Member")
          router.push(`/game/${router.query.roomId}`);
        }

      }
    });
  },[role])

  useEffect(() => {
    fetch("http://157.245.149.209:5678/room/userlist", {
      method: "POST",
      body: JSON.stringify({
        'uid': localStorage.getItem("uid"),
        'data': router.query.roomId
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    })
      .then((response) => response.json())
      .then((json) => {
        console.log('room list: ', json.data)
        setData(json.data);
      });

    fetch("http://157.245.149.209:5678/room/get", {
      method: "POST",
      body: JSON.stringify({
        'uid': localStorage.getItem("uid"),
        'data': router.query.roomId
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    })
      .then((response) => response.json())
      .then((json) => {
        let value = json.data;
        setRoomData(value)
        if (value.owner == localStorage.getItem("uid")) {
          setRole('Admin')
        } else {
          setRole('Member')
        }
      });
  }, [])

  if (data) {
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
          <GameRoomMember onStart={startGame} leaveGame={leaveGame} data={data} role={role} rid={router.query.roomId} roomData={roomData} />
        </Box>
      </Box>
    );
  }
}
