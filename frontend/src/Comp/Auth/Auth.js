import React, { useContext, useState } from "react";



import useStyles from "./styles";
import Input from "./Input";



import {
  Avatar,
  Button,
  Paper,
  Grid,
  Typography,
  Container,
} from "@material-ui/core";
import { useHistory } from "react-router-dom";

//import { GoogleLogin } from "react-google-login";
import Icon from "./icon";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import AuthContext from '../../auth/AuthContext'
const initialState = {
  name:"",
  email: "",
  password: "",
  confirmPassword: "",
};

const Auth = () => {
  const authContext=useContext(AuthContext)
  const {loginuser,registeruser}=authContext
  const classes = useStyles();
  const [showPassword, setShowPassword] = useState(false);
  const [isSignup, setIsSignup] = useState(false);
  const [formData, setFormData] = useState(initialState);

  const history = useHistory();

  const handleShowPassword = () => setShowPassword(!showPassword);


  //Handling Submit
  const handleSubmit = (e) => {
    e.preventDefault(); // prevent default behavior of browser [reloading/refresh]
    console.log(formData);
    if (isSignup) {
      registeruser(formData, history);
    } else {
      loginuser(formData, history);
    }
  };

  //After form submit
  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const switchMode = () => {
    setIsSignup((prevIsSignup) => !prevIsSignup);
    handleShowPassword(false);
  };

  // //Googgle Login Success
  // const googleSuccess = async (res) => {
  //   //console.log(res);

  //   const result = res?.profileObj;
  //   const token = res?.tokenId;

  //   try {
  //     dispatch({ type: AUTH, data: { result, token } });
  //     history.push("/");
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  const googleError = (error) => {
    console.log(error);
    console.log("Google Sign In Failed");
  };

  return (
    <>
    
      <Container component="main" maxWidth="xs">
        <Paper className={classes.paper} elevation={3}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            {isSignup ? "Sign up" : "Sign in"}
          </Typography>
          <form className={classes.form} onSubmit={handleSubmit}>
            <Grid container spacing={2}>
              {isSignup && (
                <>
                  <Input
                    name="name"
                    label="Name"
                    handleChange={handleChange}
                    autoFocus
                   
                  />
                 
                </>
              )}
              <Input
                name="email"
                label="Email Address"
                handleChange={handleChange}
                type="email"
              />
              <Input
                name="password"
                label="Password"
                handleChange={handleChange}
                type={showPassword ? "text" : "password"}
                handleShowPassword={handleShowPassword}
              />
              {isSignup && (
                <Input
                  name="confirmPassword"
                  label="Repeat Password"
                  handleChange={handleChange}
                  type="password"
                />
              )}
            </Grid>

            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              {isSignup ? "Sign Up" : "Sign In"}
            </Button>
            {/* <GoogleLogin
              clientId="822102600828-9nmno5md47cqni094jkr1cmd0h7tvtp8.apps.googleusercontent.com"
              render={(renderProps) => (
                <Button
                  className={classes.googleButton}
                  color="primary"
                  fullWidth
                  onClick={renderProps.onClick}
                  disabled={renderProps.disabled}
                  startIcon={<Icon />}
                  variant="contained"
                >
                  Google Sign In
                </Button>
              )}
              onSuccess={googleSuccess}
              onFailure={googleError}
              cookiePolicy="single_host_origin"
            /> */}

            <Grid container justify="flex-end">
              <Grid item>
                <Button onClick={switchMode}>
                  {isSignup
                    ? "Already have an account? Sign in"
                    : "Don't have an account? Sign Up"}
                </Button>
              </Grid>
            </Grid>
          </form>
        </Paper>
      </Container>
    </>
  );
};

export default Auth;
