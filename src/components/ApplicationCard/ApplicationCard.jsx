import { Box, Grid, Typography, Button } from "@mui/material";
import { makeStyles } from "tss-react/mui";
import { getTimeOfPost } from "../../assets/helpers/helper";

const useStyle = makeStyles()((theme) => ({
  wrapper: {
    border: "1px solid #e8e8e8",
    transition: "0.18s ease-in",
    "&:hover": {
      boxShadow: "0px 5px 25px rgba(0, 0, 0, 0.1)",
      borderLeft: "4px solid #4d64e4",
    },
  },
}));

const ApplicationCard = (props) => {
  const { classes } = useStyle();
  const { name, appliedOn, resume, email, contact } = props;
  return (
    <Box p={2} px={10} className={classes.wrapper}>
      <Grid container alignItems="center">
        <Grid item xs>
          <Typography variant="subtitle1">{name}</Typography>
          <Typography variant="caption">
            {getTimeOfPost(appliedOn)} ago
          </Typography>
        </Grid>
        <Grid
          item
          xs
          display="flex"
          flexDirection="column"
          justifyContent="center"
        >
          <Typography variant="subtitle1">{email}</Typography>
          <Typography variant="subtitle1">{contact}</Typography>
        </Grid>
        <Grid item>
          <Button
            style={{ fontWeight: "bold" }}
            variant="outlined"
            color="secondary"
            href={resume}
            target="_blank"
          >
            View Resume
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
};
export default ApplicationCard;
