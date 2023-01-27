import { Box, Typography } from "@mui/material";
import JobCard from "../JobCard/JobCard";

const PostedJobsList = ({ jobs }) => {
  return (
    <>
      <Box>
        <Typography variant="h5" fontWeight="bold">
          JOBS BY ME
        </Typography>
        {jobs.length === 0 ? (
          <Typography variant="h6">Post some jobs to get started</Typography>
        ) : (
          jobs.map((job, idx) => <JobCard key={idx} {...job} recruiter />)
        )}
      </Box>
    </>
  );
};
export default PostedJobsList;
