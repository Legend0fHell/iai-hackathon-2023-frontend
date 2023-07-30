import { Box, Stack, Typography } from "@mui/material";
import { CARD_HEIGHT, CARD_WIDTH } from "../../config/game";
import Spritesheet from "react-responsive-spritesheet";
import { useGameContext } from "../../contexts/game";
import CardStat from "./CardStat";

export default function Card({ card, onClick }) {
  const image = card.type == "player" ? card.character.name : card.mob.name;
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
                {card.mob.death ? (
                  <Typography
                    variant="subtitle2"
                    color="white"
                    fontFamily="Pixel"
                  >
                    {card.mob.reward}
                  </Typography>
                ) : (
                  <CardStat icon="health" value={card.mob.health} />
                )}
              </Stack>
            )}
          </Box>
          <Typography
            align="center"
            variant="caption"
            color={card.type == "player" ? "#f1c40f" : "#e6e6e6"}
            fontFamily="Pixel"
          >
            {card.type == "player"
              ? card.character.displayName
              : card.mob.death
              ? "Gem"
              : card.mob.displayName}
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
          {card.type == "player" ? (
            <Spritesheet
              image={`/assets/game/images/${image}.png`}
              widthFrame={24}
              heightFrame={24}
              fps={6}
              startAt={card.character.spritesheet.idle[0]}
              endAt={card.character.spritesheet.idle[1]}
              style={{
                imageRendering: "pixelated",
              }}
              loop
            />
          ) : (
            card.type == "mob" &&
            (!card.mob.death ? (
              <Spritesheet
                image={`/assets/game/images/${image}.png`}
                widthFrame={24}
                heightFrame={24}
                fps={6}
                startAt={card.mob.spritesheet.idle[0]}
                endAt={card.mob.spritesheet.idle[1]}
                style={{
                  imageRendering: "pixelated",
                }}
                loop
              />
            ) : (
              <img
                src={`/assets/game/images/gem.png`}
                style={{
                  imageRendering: "pixelated",
                  width: "100%",
                  height: "100%",
                }}
              />
            ))
          )}
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
