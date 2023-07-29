import { Box, Stack, Typography } from "@mui/material";
import IconStat from "./IconStat";
import { useGameContext } from "../../contexts/game";
import Iconify from "../Inconify";

export default function StatBar() {
  const { health, armor, gem, character, poison, fire } = useGameContext();

  return (
    <Stack
      sx={{
        background: "#34495e",
        mt: 2,
        px: 2,
        py: 1,
        borderRadius: 2,
      }}
      direction="row"
      justifyItems="center"
      justifyContent="space-between"
      spacing={2}
    >
      <Stack direction="row" alignItems="center" spacing={3}>
        <IconStat
          icon="health"
          width={75}
          value={`${health}/${character.maxHealth}`}
        />
        <IconStat icon="armor" width={35} value={armor} />
        <Stack direction="row" spacing={1}>
          {poison > 0 && (
            <Box sx={{ bgcolor: "#2c3e50", borderRadius: 1, p: 0.5 }}>
              <Iconify icon="mdi:poison" sx={{ color: "#27ae60" }} />
            </Box>
          )}
          {fire > 0 && (
            <Box sx={{ bgcolor: "#2c3e50", borderRadius: 1, p: 0.5 }}>
              <Iconify
                icon="game-icons:burning-skull"
                sx={{ color: "#e84118" }}
              />
            </Box>
          )}
        </Stack>
      </Stack>
      <Box>
        <Stack direction="row">
          <Typography
            variant="subtitle1"
            color="white"
            fontFamily="Pixel"
            sx={{ mr: 0.5, color: "#4cd137" }}
          >
            {gem}
          </Typography>
          <img
            src={`/assets/game/icons/gem.png`}
            alt="icon"
            width={24}
            height={24}
            style={{
              imageRendering: "pixelated",
              marginTop: "5px",
            }}
          />
        </Stack>
      </Box>
    </Stack>
  );
}
