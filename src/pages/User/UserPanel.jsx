import { Box, Button, Grid, Typography } from "@mui/material";
import Header from "../../components/Header/Header";
import JobCard from "../../components/JobCard/JobCard";
import Search from "../../components/Search/Search";
import NoData from "../../components/NoData/NoData";
import { Close as CloseIcon } from "@mui/icons-material";
import ViewJobModal from "../../components/ViewJobModal/ViewJobModal";
import { useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { auth } from "../../firebase/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";
import { getJobs } from "../../redux/jobsSlice";
import Loader from "../../components/Loader/Loader";

const UserPanel = () => {
  const viewJobModalRef = useRef();
  const { jobs, isLoading, isFiltered } = useSelector((state) => state.jobs);
  const dispatch = useDispatch();
  const [authUser, loading, error] = useAuthState(auth);
  const navigate = useNavigate();
  const { currentUser } = useSelector((state) => state.user);

  useEffect(() => {
    if (loading) return;
    if (!authUser) {
      navigate("/", { replace: true });
    }
    if (error) console.log(error);
  }, [loading, authUser, navigate, error, dispatch, currentUser]);

  useEffect(() => {
    dispatch(getJobs());
  }, [dispatch]);

  return (
    <>
      <Header email={authUser?.email} />
      <ViewJobModal ref={viewJobModalRef} />
      <Grid container justifyContent={"center"} mb={3}>
        <Grid item xs={10}>
          <Search />
          {isFiltered && (
            <Box mb={0.25}>
              <Button
                color="secondary"
                onClick={() => dispatch(getJobs())}
                style={{ cursor: "pointer" }}
                my={1}
                p={1}
                border={1}
              >
                <Typography mr={0.25}>clear filters</Typography>
                <CloseIcon />
              </Button>
            </Box>
          )}
          {isLoading ? (
            <Loader />
          ) : jobs?.length === 0 ? (
            <NoData />
          ) : (
            jobs?.map((job, idx) => (
              <JobCard
                {...job}
                key={idx}
                modalHandler={viewJobModalRef?.current}
              />
            ))
          )}
        </Grid>
      </Grid>
    </>
  );
};
export default UserPanel;
