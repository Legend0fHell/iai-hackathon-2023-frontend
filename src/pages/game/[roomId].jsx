import { Box, Stack, Typography } from "@mui/material";
import StatBar from "../../components/game/StatBar";
import InventoryBar from "../../components/game/InventoryBar";
import GameBoard from "../../components/game/GameBoard";
import { GAME_WIDTH } from "../../config/game";
import { GameProvider } from "../../contexts/game";
import CoreGame from "../../components/CoreGame";

const GamePage = () => {
  return (
    <GameProvider>
      <>
        <Stack
          direction="column"
          alignItems="center"
          justifyItems="center"
          sx={{
            width: "100vw",
            height: "100vh",
            backgroundColor: "#2c3e50",
          }}
        >
          <Box sx={{ width: `${GAME_WIDTH}px` }}>
            <StatBar />
            <InventoryBar />
            <GameBoard />
          </Box>
        </Stack>
        <CoreGame />
      </>
    </GameProvider>
  );
};

export default GamePage;
