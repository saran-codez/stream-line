import { Box, Grid, Typography, Button } from "@mui/material";
import { useRef } from "react";
import { useNavigate } from "react-router-dom";
import { signOutEmail } from "../../firebase/auth";
import PostJobModal from "../PostJobModal/PostJobModal";
const Header = ({ email, recruiter }) => {
  const navigate = useNavigate();
  const postJobModalRef = useRef();
  return (
    <Box py={10} bgcolor="secondary.main" color="white">
      <PostJobModal ref={postJobModalRef} />
      <Typography
        textAlign="end"
        sx={{ position: "absolute", top: "5px", right: "10px" }}
      >
        {email}
      </Typography>
      <Grid container justifyContent="center">
        <Grid item xs={10}>
          <Box display="flex" justifyContent="space-between">
            <Typography variant="h4">
              StreamLine
              {recruiter ? (
                <Typography variant="caption">for recruiters</Typography>
              ) : null}
            </Typography>
            <Box display="flex" gap={2}>
              {recruiter ? (
                <Button
                  style={{ fontWeight: "bold" }}
                  variant="contained"
                  color="primary"
                  disableElevation
                  onClick={postJobModalRef.current?.openModal}
                >
                  Post a job
                </Button>
              ) : (
                <Button
                  style={{ fontWeight: "bold" }}
                  variant="contained"
                  href="https://streamline-recommender.onrender.com/"
                  target="_self"
                  color="primary"
                  disableElevation
                >
                  Recommend jobs
                </Button>
              )}
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
