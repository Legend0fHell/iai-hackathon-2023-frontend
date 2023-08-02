import { Box, Typography } from "@mui/material";

export default function NodeContent({ nodes, ...props }) {
  return (
    <Typography variant="caption" fontFamily="Pixel" {...props}>
      {nodes.map((node, index) => {
        return (
          <Box
            sx={{
              textTransform: "none",
            }}
            key={index}
          >
            {node}
          </Box>
        );
      })}
    </Typography>
  );
}
