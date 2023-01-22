import { useEffect, useRef } from "react";
import { Box, Button, CircularProgress, Grid, Typography } from "@mui/material";
import Header from "./components/Header/Header";
import JobCard from "./components/JobCard/JobCard";
import PostJobModal from "./components/PostJobModal/PostJobModal";
import Search from "./components/Search/Search";
import { useDispatch, useSelector } from "react-redux";
import { getJobs } from "./redux/jobsSlice";
import NoData from "./components/NoData/NoData";
import { Close as CloseIcon } from "@mui/icons-material";
import ViewJobModal from "./components/ViewJobModal/ViewJobModal";

function App() {
  const { jobs, isLoading, isFiltered } = useSelector((state) => state.jobs);
  const dispatch = useDispatch();
  const postJobModalRef = useRef();
  const viewJobModalRef = useRef();
  useEffect(() => {
    dispatch(getJobs());
  }, [dispatch]);
  useEffect(() => console.log({ jobs, isLoading }), [jobs]);
  return (
    <>
      <Header openModal={postJobModalRef.current?.openModal} />
      <PostJobModal ref={postJobModalRef} />
      <ViewJobModal ref={viewJobModalRef} />
      <ViewJobModal />
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
            <Box display="flex" justifyContent="center">
              <CircularProgress />
            </Box>
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
}

export default App;
