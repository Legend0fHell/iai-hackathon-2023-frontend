import { Box } from "@mui/material";
import { CARD_HEIGHT, CARD_WIDTH } from "../../config/game";

export default function Card({ x, y }) {
  return (
    <Box
      sx={{
        position: "absolute",
        left: x * CARD_WIDTH,
        top: y * CARD_HEIGHT,
        width: CARD_WIDTH,
        height: CARD_HEIGHT,
        p: 1,
      }}
    >
      <Box
        sx={{
          width: "100%",
          height: "100%",
          borderRadius: 1,
          bgcolor: "#2c3e50",
        }}
      ></Box>
    </Box>
  );
}
