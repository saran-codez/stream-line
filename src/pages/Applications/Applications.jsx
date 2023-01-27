import { Box, Grid, Typography } from "@mui/material";
import { useEffect } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import ApplicationCard from "../../components/ApplicationCard/ApplicationCard";
import Header from "../../components/Header/Header";
import Loader from "../../components/Loader/Loader";
import { auth } from "../../firebase/firebase";
import { getApplicationsById, getJobById } from "../../redux/applicationsSlice";

const Applications = () => {
  const { jobId } = useParams();
  const dispatch = useDispatch();
  const [authUser, loading, error] = useAuthState(auth);
  const navigate = useNavigate();
  const { job, isFetching } = useSelector((state) => state.applications);
  const { applications, isLoading } = useSelector(
    (state) => state.applications
  );

  useEffect(() => {
    if (loading) return;
    if (!authUser) {
      navigate("/", { replace: true });
    }
    dispatch(getJobById(jobId));
    if (error) console.log(error);
  }, [loading, authUser, navigate, error, dispatch, jobId]);

  useEffect(() => {
    dispatch(getApplicationsById(jobId));
  }, [jobId, dispatch]);

  return (
    <Box>
      <Header email={authUser?.email} recruiter />
      {isFetching ? (
        <Loader />
      ) : (
        <Grid justifyContent="center" mb={3}>
          <Grid item xs={10}>
            <Typography variant="h4" textAlign="center" py={2}>
              {job.title} - applications
            </Typography>
            <Box>
              {isLoading ? (
                <Loader />
              ) : (
                applications.map((application, idx) => (
                  <ApplicationCard key={idx} {...application} />
                ))
              )}
            </Box>
          </Grid>
        </Grid>
      )}
    </Box>
  );
};
export default Applications;
