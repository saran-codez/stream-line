import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { loginWithEmailAndPassword } from "../../firebase/auth";
import { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../firebase/firebase";
import { useNavigate } from "react-router-dom";

export default function LogInPage() {
  const initialState = {
    email: "",
    password: "",
  };
  const [userState, setUserState] = useState(initialState);
  const [user, loading, error] = useAuthState(auth);
  const navigate = useNavigate();
  useEffect(() => {
    if (loading) return;
    if (user) navigate("/home");
  }, [loading, user]);
  const handleChange = (e) => {
    setUserState({ ...userState, [e.target.name]: e.target.value });
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    loginWithEmailAndPassword(userState.email, userState.password);
    setUserState(initialState);
  };
  return (
    <>
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
            Log In
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{ mt: 1 }}
          >
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              value={userState.email}
              onChange={handleChange}
              label="Email Address"
              name="email"
              autoComplete="off"
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              value={userState.password}
              onChange={handleChange}
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="off"
            />

            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
            </Button>
            <Grid container>
              <Grid item xs>
                <Link href="#" variant="body2" color="#000">
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
                Don't have an account?{" "}
                <Link href="/register" variant="body2" color="#000">
                  {"Sign Up"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </>
  );
}
