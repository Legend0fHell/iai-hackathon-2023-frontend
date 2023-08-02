import {
  Box,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { fs } from "../../config/firebaseInit";

export default function New() {
  const [groups, setGroups] = useState([]);
  const [group, setGroup] = useState("Select a group");

  useEffect(() => {
    async function getGroups() {
      const query = await getDocs(collection(fs, "group"));

      const groups = [];
      query.forEach((doc) => {
        groups.push(doc.data());
      });
      setGroups(groups);
    }

    getGroups();
  }, []);

  return (
    <Stack alignItems="center">
      <Box sx={{ p: 2 }}>
        <Typography variant="h4">Create a new quiz</Typography>

        <Box>
          <InputLabel id="group-label">Select a group</InputLabel>
          <Select
            labelId="group-label"
            value={group}
            onChange={(e) => setGroup(e.target.value)}
            sx={{ width: "100%" }}
          >
            {groups.map((group) => (
              <MenuItem key={group.groupId} value={group.name}>
                {group.name}
              </MenuItem>
            ))}
          </Select>
        </Box>
      </Box>
    </Stack>
  );
}
