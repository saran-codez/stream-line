import { Box } from "@mui/material";
import { useEffect, useRef } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Header from "../../components/Header/Header";
import Loader from "../../components/Loader/Loader";
import PostedJobsList from "../../components/PostedJobsList/PostedJobsList";
import ViewJobModal from "../../components/ViewJobModal/ViewJobModal";
import { auth } from "../../firebase/firebase";
import { getJobsByUserId } from "../../redux/recruiterSlice";

const RecruiterPanel = () => {
  const dispatch = useDispatch();
  const [authUser, loading, error] = useAuthState(auth);
  const navigate = useNavigate();
  const { currentUser } = useSelector((state) => state.user);
  const { postedJobs, isLoading } = useSelector((state) => state.recruiter);
  const viewJobModalRef = useRef();

  useEffect(() => {
    if (loading) return;
    if (!authUser) {
      navigate("/", { replace: true });
    }
    dispatch(getJobsByUserId(authUser?.uid));
    if (error) console.log(error);
  }, [loading, authUser, navigate, error, dispatch, currentUser]);

  return (
    <Box>
      <Header recruiter email={authUser?.email} />
      <ViewJobModal ref={viewJobModalRef} />
      {isLoading ? <Loader /> : <PostedJobsList jobs={postedJobs} />}
    </Box>
  );
};
export default RecruiterPanel;
