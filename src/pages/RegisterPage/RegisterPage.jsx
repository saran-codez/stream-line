import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { useEffect, useState } from "react";
import { registerWithEmailAndPassword } from "../../firebase/auth";
import { auth } from "../../firebase/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";
import Checkbox from "@mui/material/Checkbox";

const RegisterPage = () => {
  const initialState = {
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    recruiter: false,
  };
  const [errorMsg, setErrorMsg] = useState("");
  const [user, loading, error] = useAuthState(auth);
  const navigate = useNavigate();
  const [userDetails, setUserDetails] = useState(initialState);
  const handleChange = (e) => {
    switch (e.target.name) {
      case "recruiter":
        setUserDetails({
          ...userDetails,
          [e.target.name]: e.target.checked,
        });
        break;
      default:
        setUserDetails({
          ...userDetails,
          [e.target.name]: e.target.value,
        });
        break;
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    for (const field in userDetails) {
      if (typeof userDetails[field] === "string" && !userDetails[field]) return;
    }
    registerWithEmailAndPassword(
      userDetails.firstName,
      userDetails.lastName,
      userDetails.email,
      userDetails.password,
      userDetails.recruiter
    ).catch((err) => setErrorMsg(err));
    setUserDetails(initialState);
  };

  useEffect(() => {
    if (loading) return;
    if (user) navigate("/home", { replace: true });
    if (error) console.log(error);
  }, [loading, user, error, navigate]);

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="body">
          StreamLine
        </Typography>
        <Typography component="h1" variant="h5">
          Sign up
        </Typography>
        <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                autoComplete="off"
                name="firstName"
                value={userDetails.firstName}
                required
                fullWidth
                id="firstName"
                label="First Name"
                autoFocus
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                fullWidth
                value={userDetails.lastName}
                id="lastName"
                label="Last Name"
                name="lastName"
                autoComplete="off"
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                value={userDetails.email}
                autoComplete="off"
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                value={userDetails.password}
                autoComplete="off"
                onChange={handleChange}
              />
            </Grid>
            <Grid
              item
              xs={12}
              container
              justifyContent="space-between"
              alignItems="center"
            >
              <Typography>I am a recruiter</Typography>
              <Checkbox name="recruiter" onChange={handleChange} />
            </Grid>
            {errorMsg ? (
              <Grid
                item
                xs={12}
                alignItems="center"
                justifyContent="center"
                textAlign="center"
                color="#ff0000"
              >
                {errorMsg}
              </Grid>
            ) : null}
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Sign Up
          </Button>
          <Grid container justifyContent="flex-end">
            <Grid item>
              Already have an account?{" "}
              <Link href="/" variant="body2" color="#000">
                Sign in
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
};
export default RegisterPage;
