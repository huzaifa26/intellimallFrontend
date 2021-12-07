import React, { useState } from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Alert from "@material-ui/lab/Alert";
import { useHistory } from "react-router-dom";
import { db } from "../firebase/firebase";
import { Card } from "@material-ui/core";
import { useEffect } from "react";

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {"Copyright © "}
      <Link color="inherit" href="">
        Athena
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  root: {
    boxShadow:
      "rgba(0,0,0,0.1) 0px 2px 4px 0px, rgba(0,0,0,0.1) 0px 8px 16px 0px",
    padding: "20px",
    marginTop: theme.spacing(8),
  },
  paper: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function Signin({ setcurrentUser }) {

  const classes = useStyles();
  const history = useHistory();

  const [userName, setuserName] = useState();
  const [password, setpassword] = useState();
  const [signInData, setSignInData] = useState();
  const [error, setError] = useState();

  useEffect(()=>{
    fetch("http://localhost:5000/admin")
    .then(response => response.json())
    .then(response => {
      setSignInData(()=>response)
    })
  },[])

  console.log(signInData)

  const Login = async (e) => {
    e.preventDefault();


    for (let i = 0; i < signInData.length; i++) {

      if (userName === signInData[i].email_address){
        if (password === signInData[i].password){
          console.log("Sign In successfull")
          history.push("/dashboard");
        } else {
          setError("Incorrect password")
        }
      }
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Card className={classes.root}>
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <form className={classes.form} onSubmit={Login}>
            {error && (
              <Alert
                severity="error"
                onClose={() => {
                  setError(undefined);
                }}
                style={{
                  marginBottom: "20px",
                }}
              >
                {error}
              </Alert>
            )}
            <TextField
              autoComplete="uname"
              name="userName"
              variant="outlined"
              required
              fullWidth
              id="userName"
              label="User Name"
              autoFocus
              onChange={(e) => setuserName(e.target.value)}
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              onChange={(e) => setpassword(e.target.value)}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
              onClick={()=>{
                fetch("http://localhost:5000/admin")
                  .then(response => response.json())
                  .then(response => {
                    setSignInData(()=>response)
                  })
              }}
            >
              Sign IN
            </Button>
          </form>
        </div>
        <Box mt={8}>
          <Copyright />
        </Box>
      </Card>
    </Container>
  );
}