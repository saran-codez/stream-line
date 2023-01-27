import { useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";

import { auth } from "../../firebase/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";
import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";
import { getUserById } from "../../redux/userSlice";

function Home() {
  const [user, loading, error] = useAuthState(auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { currentUser, isLoading } = useSelector((state) => state.user);

  useEffect(() => {
    if (loading) return;
    if (!user) {
      navigate("/", { replace: true });
    }
    if (user) {
      dispatch(getUserById(user.uid));
    }
    if (error) console.log(error);
  }, [loading, user, navigate, error, dispatch]);

  useEffect(() => {
    if (isLoading || !user) return;
    if (currentUser.recruiter) {
      navigate("/recruiter", { replace: true });
    } else if (!currentUser.recruiter) navigate("/user", { replace: true });
  }, [currentUser, navigate, isLoading, user]);

  return (
    <>
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        height="100vh"
        width="100vw"
      >
        <CircularProgress />
      </Box>
    </>
  );
}

export default Home;
