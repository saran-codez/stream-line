import { Box, Grid, Typography, Button } from "@mui/material";
const Header = ({ openModal }) => {
  return (
    <Box py={10} bgcolor="secondary.main" color="white">
      <Grid container justifyContent="center">
        <Grid item xs={10}>
          <Box display="flex" justifyContent="space-between">
            <Typography variant="h4">StreamLine</Typography>
            <Button
              style={{ fontWeight: "bold" }}
              variant="contained"
              color="primary"
              disableElevation
              onClick={openModal}
            >
              Post a job
            </Button>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};
export default Header;
