import {
  Dialog,
  DialogContent,
  DialogTitle,
  TextField,
  Grid,
  MenuItem,
  Typography,
  Box,
  DialogActions,
  Button,
  IconButton,
  CircularProgress,
} from "@mui/material";
import { Close as CloseButton } from "@mui/icons-material";
import { makeStyles } from "tss-react/mui";
import { forwardRef, useEffect, useImperativeHandle, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { postJob } from "../../redux/jobsSlice";

const useStyle = makeStyles()((theme) => ({
  skill__name: {
    margin: theme.spacing(0.5),
    padding: theme.spacing(0.75),
    fontSize: "12px",
    borderRadius: "5px",
    transition: "0.3s",
    cursor: "pointer",
    fontWeight: 600,
    border: `1px solid ${theme.palette.secondary.main}`,

    "&:hover": {
      backgroundColor: theme.palette.secondary.main,
      color: "#fff",
    },
  },
  included: {
    backgroundColor: theme.palette.secondary.main,
    color: "#fff",
  },
}));

const PostJobModal = (props, ref) => {
  const skills = [
    "Javascript",
    "React",
    "Node",
    "Vue",
    "Firebase",
    "MongoDB",
    "SQL",
    "Others",
  ];
  const { classes } = useStyle();
  const dispatch = useDispatch();
  const { isPosting } = useSelector((state) => state.jobs);
  const initialState = {
    title: "",
    type: "Full Time",
    location: "Remote",
    companyName: "",
    companyUrl: "",
    link: "",
    description: "",
    skills: [],
  };
  const [jobDetails, setJobDetails] = useState(initialState);
  const [isOpen, setIsOpen] = useState(false);
  const openModal = () => setIsOpen(true);

  const closeModal = () => {
    setIsOpen(false);
    setJobDetails(initialState);
  };

  useImperativeHandle(ref, () => ({ openModal, closeModal }));

  const handleChange = (e) => {
    setJobDetails({ ...jobDetails, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    for (const field in jobDetails) {
      if (typeof jobDetails[field] === "string" && !jobDetails[field]) return;
      else if (jobDetails.skills.length === 0) return;
    }
    dispatch(postJob(jobDetails));
    closeModal();
  };

  const toggleSkill = (skill) =>
    jobDetails.skills.includes(skill)
      ? setJobDetails({
          ...jobDetails,
          skills: jobDetails.skills.filter((skillElem) => skillElem !== skill),
        })
      : setJobDetails({ ...jobDetails, skills: [...jobDetails.skills, skill] });

  return (
    <div>
      <Dialog open={isOpen} fullWidth>
        <DialogTitle>
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
          >
            Post Job
            <IconButton onClick={closeModal}>
              <CloseButton />
            </IconButton>
          </Box>
        </DialogTitle>
        <DialogContent>
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <TextField
                name="title"
                onChange={handleChange}
                value={jobDetails.title}
                autoComplete="off"
                label="Job Title *"
                variant="filled"
                color="secondary"
                InputProps={{ disableUnderline: true }}
                fullWidth
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                label="Job Type *"
                onChange={handleChange}
                select
                name="type"
                value={jobDetails.type}
                variant="filled"
                color="secondary"
                InputProps={{ disableUnderline: true }}
                fullWidth
              >
                <MenuItem value="Full Time">Full Time</MenuItem>
                <MenuItem value="Part Time">Part Time</MenuItem>
                <MenuItem value="Contract">Contract</MenuItem>
              </TextField>
            </Grid>
            <Grid item xs={6}>
              <TextField
                autoComplete="off"
                onChange={handleChange}
                label="Company Name *"
                name="companyName"
                value={jobDetails.companyName}
                variant="filled"
                color="secondary"
                InputProps={{ disableUnderline: true }}
                fullWidth
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                onChange={handleChange}
                autoComplete="off"
                label="Company URL *"
                name="companyUrl"
                value={jobDetails.companyUrl}
                variant="filled"
                color="secondary"
                InputProps={{ disableUnderline: true }}
                fullWidth
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                autoComplete="off"
                label="Job Location *"
                onChange={handleChange}
                name="location"
                value={jobDetails.location}
                select
                variant="filled"
                color="secondary"
                InputProps={{ disableUnderline: true }}
                fullWidth
              >
                <MenuItem value="Remote">Remote</MenuItem>
                <MenuItem value="In-office">In-office</MenuItem>
              </TextField>
            </Grid>
            <Grid item xs={6}>
              <TextField
                label="Link to Apply *"
                onChange={handleChange}
                autoComplete="off"
                name="link"
                value={jobDetails.link}
                variant="filled"
                color="secondary"
                InputProps={{ disableUnderline: true }}
                fullWidth
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Job Description *"
                onChange={handleChange}
                autoComplete="off"
                name="description"
                value={jobDetails.description}
                multiline
                rows={3}
                variant="filled"
                color="secondary"
                fullWidth
                InputProps={{ disableUnderline: true }}
              />
            </Grid>
          </Grid>
          <Box mt={2}>
            <Typography>Skills</Typography>
            <Box display="flex">
              {skills.map((skill, idx) => (
                <Box key={idx} onClick={() => toggleSkill(skill)}>
                  <Typography
                    className={`${classes.skill__name} ${
                      jobDetails.skills.includes(skill) && classes.included
                    }`}
                  >
                    {skill}
                  </Typography>
                </Box>
              ))}
            </Box>
          </Box>
        </DialogContent>
        <DialogActions>
          <Box display="flex" width="100%" justifyContent="space-between">
            <Typography variant="caption" color="red">
              *Required fields
            </Typography>
            <Button
              onClick={handleSubmit}
              color="primary"
              variant="contained"
              disableElevation
              disabled={isPosting}
            >
              {isPosting ? (
                <CircularProgress color="secondary" size={22} />
              ) : (
                "Post a Job"
              )}
            </Button>
          </Box>
        </DialogActions>
      </Dialog>
    </div>
  );
};
export default forwardRef(PostJobModal);
