import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Avatar from "@mui/material/Avatar";

import { useUserContext } from "@/components/auth/userStore";

const TopBar = () => {
  const { user } = useUserContext();

  return (
    <AppBar position="static">
      <Toolbar sx={{ justifyContent: "space-between" }}>
        <Box>
          <Typography variant="h5" fontFamily="monospace" noWrap>
            TodoTitan
          </Typography>
        </Box>
        {user && (
          <Box>
            <Avatar alt={user.username} src={user.avatarUrl} />
          </Box>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default TopBar;
