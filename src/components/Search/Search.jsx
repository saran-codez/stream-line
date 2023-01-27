import { Box, Button, Select, MenuItem } from "@mui/material";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { makeStyles } from "tss-react/mui";
import { filterJobs } from "../../redux/jobsSlice";

const useStyles = makeStyles()(() => ({
  wrapper: {
    backgroundColor: "#f0ecec",
    display: "flex",
    boxShadow: "0px 1px 5px rgba(0, 0, 0, 0.1)",
    borderRadius: "5px",
    "& > *": {
      flex: 1,
      height: "45px",
      margin: "8px",
    },
  },
}));

const Search = () => {
  const { classes } = useStyles();
  const [filters, setFilters] = useState({
    type: "Full Time",
    location: "Remote",
  });

  const dispatch = useDispatch();

  const handleChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  return (
    <Box p={2} mt={-5} mb={2} className={classes.wrapper} alignItems="center">
      <Select value={filters.type} name="type" onChange={handleChange}>
        <MenuItem value="Full Time">Full Time</MenuItem>
        <MenuItem value="Part Time">Part Time</MenuItem>
        <MenuItem value="Contract">Contract</MenuItem>
      </Select>
      <Select value={filters.location} name="location" onChange={handleChange}>
        <MenuItem value="Remote">Remote</MenuItem>
        <MenuItem value="In-office">In-office</MenuItem>
      </Select>
      <Button
        style={{ fontWeight: "bold" }}
        variant="contained"
        color="primary"
        disableElevation
        onClick={() => dispatch(filterJobs(filters))}
      >
        Search
      </Button>
    </Box>
  );
};
export default Search;
