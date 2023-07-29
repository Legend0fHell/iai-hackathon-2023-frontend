import { Box, Stack } from "@mui/material";
import { CARD_HEIGHT, CARD_WIDTH } from "../../config/game";
import Card from "./Card";

export default function GameBoard() {
  const BOARD = [
    [0, 0, 0],
    [0, 0, 0],
    [0, 0, 0],
  ];
  return (
    <Stack
      alignItems="center"
      sx={{
        bgcolor: "#34495e",
        mt: 1,
        mb: 2,
        p: 2,
        borderRadius: 2,
      }}
    >
      <Box
        sx={{
          borderRadius: 2,
          width: CARD_WIDTH * 3,
          height: CARD_HEIGHT * 3,
          position: "relative",
        }}
      >
        {BOARD.map((row, y) => row.map((card, x) => <Card x={x} y={y} />))}
      </Box>
    </Stack>
  );
}
