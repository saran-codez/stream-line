import {
  Dialog,
  DialogTitle,
  Box,
  IconButton,
  DialogContent,
  DialogActions,
  Typography,
  Grid,
  Button,
} from "@mui/material";
import { Close as CloseIcon } from "@mui/icons-material";
import { forwardRef, useImperativeHandle, useState } from "react";
import { makeStyles } from "tss-react/mui";

const useStyles = makeStyles()((theme) => ({
  skill__name: {
    marginRight: theme.spacing(0.5),
    padding: theme.spacing(0.75),
    fontSize: "14.5px",
    borderRadius: "4px",
    transition: "0.2s ease-in-out",
    cursor: "pointer",
    fontWeight: 600,
    background: theme.palette.secondary.main,
    color: "#fff",
  },
}));

const ViewJobModal = (props, ref) => {
  const initialState = {};
  useImperativeHandle(ref, () => ({
    openModal,
    closeModal,
  }));
  const [jobData, setJobData] = useState(initialState);
  const [isOpen, setIsOpen] = useState(false);
  const openModal = (data) => {
    setJobData(data);
    setIsOpen(true);
  };
  const { classes } = useStyles();

  const closeModal = () => {
    setIsOpen(false);
    setJobData(initialState);
  };

  return (
    <Dialog open={isOpen} fullWidth>
      <DialogTitle>
        <Box display="flex" justifyContent="space-between" alignItems="center">
          {jobData.title} @ {jobData.companyName}
          <IconButton onClick={() => closeModal()}>
            <CloseIcon />
          </IconButton>
        </Box>
      </DialogTitle>
      <DialogContent>
        <Box display="flex" gap={1} alignItems="center" my={0.5}>
          <Typography variant="body2">Posted On:</Typography>
          <Typography variant="body2">
            {new Date(jobData.postedOn).toLocaleDateString()}
          </Typography>
        </Box>
        <Box display="flex" gap={1} alignItems="center" my={0.5}>
          <Typography variant="body2">Job type:</Typography>
          <Typography variant="body2">{jobData.type}</Typography>
        </Box>
        <Box display="flex" gap={1} alignItems="center" my={0.5}>
          <Typography variant="body2">Job Location:</Typography>
          <Typography variant="body2">{jobData.location}</Typography>
        </Box>
        <Box display="flex" gap={1} alignItems="center" my={0.5}>
          <Typography variant="body2">Job Description:</Typography>
          <Typography variant="body2">{jobData.description}</Typography>
        </Box>
        <Box display="flex" gap={1} alignItems="center" my={0.5}>
          <Typography variant="body2">Company Name:</Typography>
          <Typography variant="body2">{jobData.companyName}</Typography>
        </Box>
        <Box display="flex" gap={1} alignItems="center" my={0.5}>
          <Typography variant="body2">Company URL:</Typography>
          <Typography variant="body2">
            <a href={jobData.companyUrl} target="_blank">
              {jobData.companyUrl}
            </a>
          </Typography>
        </Box>
        <Box alignItems="center" my={0.5}>
          <Typography variant="body2" mb={0.3}>
            Skills Needed:
          </Typography>
          <Grid container>
            {jobData.skills?.map((skill, idx) => (
              <Grid item key={idx}>
                <Typography className={classes.skill__name}>{skill}</Typography>
              </Grid>
            ))}
          </Grid>
        </Box>
      </DialogContent>
      <DialogActions>
        <Button
          variant="outlined"
          color="secondary"
          href={jobData.link}
          target="_blank"
        >
          Apply
        </Button>
      </DialogActions>
    </Dialog>
  );
};
export default forwardRef(ViewJobModal);
