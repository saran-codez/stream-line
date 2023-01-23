import { Box, Grid, Typography, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { signOutEmail } from "../../firebase/auth";
const Header = ({ openModal }) => {
  const navigate = useNavigate();
  return (
    <Box py={10} bgcolor="secondary.main" color="white">
      <Grid container justifyContent="center">
        <Grid item xs={10}>
          <Box display="flex" justifyContent="space-between">
            <Typography variant="h4">StreamLine</Typography>
            <Box display="flex" gap={2}>
              <Button
                style={{ fontWeight: "bold" }}
                variant="contained"
                color="primary"
                disableElevation
                onClick={openModal}
              >
                Post a job
              </Button>
              <Button
                style={{ fontWeight: "bold" }}
                variant="contained"
                color="info"
                disableElevation
                onClick={() => {
                  signOutEmail();
                  navigate("/");
                }}
              >
                Sign Out
              </Button>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};
export default Header;
