import { Box, Button, Grid, Typography } from "@mui/material";
import { makeStyles } from "tss-react/mui";
import {
  differenceInDays,
  differenceInHours,
  differenceInMinutes,
  differenceInSeconds,
  parseISO,
} from "date-fns";
import ViewJobModal from "../ViewJobModal/ViewJobModal";

const useStyle = makeStyles()((theme) => ({
  wrapper: {
    border: "1px solid #e8e8e8",
    transition: "0.18s ease-in",
    "&:hover": {
      boxShadow: "0px 5px 25px rgba(0, 0, 0, 0.1)",
      borderLeft: "4px solid #4d64e4",
    },
  },
  company__name: {
    fontSize: "13.5px",
    backgroundColor: theme.palette.primary.main,
    padding: theme.spacing(0.75),
    borderRadius: "5px",
    display: "inline-block",
    fontWeight: 600,
  },
  skill__name: {
    margin: theme.spacing(0.5),
    padding: theme.spacing(0.75),
    fontSize: "14.5px",
    borderRadius: "4px",
    transition: "0.1s ease-in-out",
    cursor: "pointer",
    fontWeight: 600,
    background: theme.palette.secondary.main,
    color: "#fff",
  },
}));

const JobCard = (props) => {
  const { title, companyName, skills, postedOn, type, location, modalHandler } =
    props;
  const { classes } = useStyle();
  const getTimeOfPost = () => {
    const parsed = parseISO(postedOn);
    const diffInDays = differenceInDays(Date.now(), parsed);
    const diffInHours = differenceInHours(Date.now(), parsed);
    const diffInMin = differenceInMinutes(Date.now(), parsed);
    const diffInSec = differenceInSeconds(Date.now(), parsed);

    if (diffInDays > 0) return `${diffInDays}d`;
    if (diffInHours > 0) return `${diffInHours}h`;
    if (diffInMin > 0) return `${diffInMin}m`;
    if (diffInSec > 0) return `${diffInSec}s`;
  };

  return (
    <Box p={2} className={classes.wrapper}>
      <Grid container alignItems="center">
        <Grid item xs>
          <Typography variant="subtitle1">{title}</Typography>
          <Typography className={classes.company__name} variant="subtitle2">
            {companyName}
          </Typography>
        </Grid>
        <Grid item container xs>
          {skills?.map((skill, idx) => (
            <Grid item key={idx}>
              <Typography className={classes.skill__name}>{skill}</Typography>
            </Grid>
          ))}
        </Grid>
        <Grid item container direction="column" alignItems="flex-end" xs>
          <Grid item>
            <Typography variant="caption">
              {getTimeOfPost()} ago | {type} | {location}
            </Typography>
          </Grid>
          <Grid item>
            <Button
              style={{ fontWeight: "bold" }}
              variant="outlined"
              color="secondary"
              onClick={() => modalHandler.openModal(props)}
            >
              Apply
            </Button>
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
};
export default JobCard;
