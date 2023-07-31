import { Box, Stack, Typography } from "@mui/material";
import { CARD_HEIGHT, CARD_WIDTH } from "../../config/game";
import Spritesheet from "react-responsive-spritesheet";
import { useGameContext } from "../../contexts/game";
import CardStat from "./CardStat";

export default function Card({ card, onClick }) {
  const { weapon } = useGameContext();

  return (
    <Box
      draggable={false}
      sx={{
        userSelect: "none",
        position: "absolute",
        left: card.x * CARD_WIDTH,
        top: card.y * CARD_HEIGHT,
        width: CARD_WIDTH,
        height: CARD_HEIGHT,
        p: 1,
        transitionDuration: "0.5s",
      }}
    >
      <Box
        sx={{
          width: "100%",
          height: "100%",
          borderRadius: 1,
          position: "relative",
          cursor: "pointer",
          "&:hover": {
            bgcolor: "white",
          },
        }}
        onClick={onClick}
      >
        <Stack
          direction="column"
          justifyContent="space-between"
          sx={{
            position: "absolute",
            top: 0,
            left: 0,
            zIndex: 1,
            width: "100%",
            height: "100%",
            p: 1,
            py: 1.5,
          }}
        >
          <Box>
            {card.type == "mob" && (
              <Stack
                direction="row"
                alignItems="center"
                sx={{ float: "right", px: 1 }}
                spacing={1}
              >
                <CardStat icon="health" value={card.data.health} />
              </Stack>
            )}
          </Box>
          <Typography
            align="center"
            variant="caption"
            color={card.type == "player" ? "#f1c40f" : "#e6e6e6"}
            fontFamily="Pixel"
          >
            {card.data.displayName}
          </Typography>
        </Stack>
        <Box
          sx={{
            position: "absolute",
            left: "0",
            top: "-10%",
            zIndex: 1,
            width: "100%",
            height: "100%",
            transform: "scale(0.75)",
          }}
        >
          <Spritesheet
            image={`/assets/game/images/${card.data.name}.png`}
            widthFrame={card.data.spritesheet.width}
            heightFrame={card.data.spritesheet.height}
            fps={6}
            startAt={
              card.data.spritesheet.idle ? card.data.spritesheet.idle[0] + 1 : 0
            }
            endAt={
              card.data.spritesheet.idle ? card.data.spritesheet.idle[1] + 1 : 1
            }
            style={{
              imageRendering: "pixelated",
              transform: `scale(${card.data.spritesheet.scale || 1})`,
            }}
            loop
          />
        </Box>
        {card.type == "player" && weapon != null && (
          <Box
            sx={{
              position: "absolute",
              left: "15px",
              top: "50%",
              transform: "translateY(-50%)",
              zIndex: 1,
            }}
          >
            <img
              src={`/assets/game/images/${weapon.name}.png`}
              width={32}
              height={64}
              style={{
                imageRendering: "pixelated",
              }}
            />
          </Box>
        )}
        <Box
          sx={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            zIndex: 0,
          }}
        >
          <img
            src={`/assets/game/images/card_${
              card.type == "player" ? 0 : 1
            }.png`}
            draggable={false}
            style={{
              imageRendering: "pixelated",
              objectFit: "contain",
              width: "100%",
              height: "100%",
            }}
          />
        </Box>
      </Box>
    </Box>
  );
}
