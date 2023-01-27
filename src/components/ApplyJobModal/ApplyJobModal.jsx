import {
  Box,
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  IconButton,
  TextField,
  Typography,
} from "@mui/material";
import { Close as CloseButton } from "@mui/icons-material";
import { forwardRef, useImperativeHandle, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { applyJob } from "../../redux/applicationsSlice";

const ApplyJobModal = (props, ref) => {
  const { job } = props;
  const [isOpen, setIsOpen] = useState(false);
  const initialState = {
    name: "",
    contact: "",
    email: "",
    resume: "",
  };
  const [applicationDetails, setApplicationDetails] = useState(initialState);
  const { isApplying } = useSelector((state) => state.applications);
  const dispatch = useDispatch();

  const openModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
    setApplicationDetails(initialState);
  };

  useImperativeHandle(ref, () => ({ openModal, closeModal }));

  const handleChange = (e) => {
    setApplicationDetails({
      ...applicationDetails,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = () => {
    for (const field in applicationDetails) {
      if (
        typeof applicationDetails[field] === "string" &&
        !applicationDetails[field]
      )
        return;
    }
    dispatch(applyJob({ ...applicationDetails, jobId: job.id }));
    closeModal();
  };

  return (
    <div>
      <Dialog open={isOpen} fullWidth>
        <DialogTitle>
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
          >
            Apply {job?.title} @ {job?.companyName}
            <IconButton
              onClick={() => {
                closeModal();
              }}
            >
              <CloseButton />
            </IconButton>
          </Box>
        </DialogTitle>
        <DialogContent>
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <TextField
                name="name"
                onChange={handleChange}
                value={applicationDetails.name}
                autoComplete="off"
                label="Name *"
                variant="filled"
                color="secondary"
                InputProps={{ disableUnderline: true }}
                fullWidth
              />
            </Grid>

            <Grid item xs={6}>
              <TextField
                autoComplete="off"
                onChange={handleChange}
                label="Contact number *"
                name="contact"
                value={applicationDetails.contact}
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
                label="email *"
                name="email"
                value={applicationDetails.email}
                variant="filled"
                color="secondary"
                InputProps={{ disableUnderline: true }}
                fullWidth
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                label="Resume link *"
                onChange={handleChange}
                autoComplete="off"
                name="resume"
                value={applicationDetails.resume}
                variant="filled"
                color="secondary"
                InputProps={{ disableUnderline: true }}
                fullWidth
              />
              <Typography variant="caption" color="red">
                *google drive or any link with view access
              </Typography>
            </Grid>
          </Grid>
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
              disabled={isApplying}
            >
              {isApplying ? (
                <CircularProgress color="secondary" size={22} />
              ) : (
                "Apply"
              )}
            </Button>
          </Box>
        </DialogActions>
      </Dialog>
    </div>
  );
};
export default forwardRef(ApplyJobModal);
