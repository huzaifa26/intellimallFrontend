import React, { useState } from "react";
import { Typography, Card, TextField, Grid, Button } from "@material-ui/core";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";

import { db } from "../firebase/firebase";

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const Settings = ({ apiKey, currentUser }) => {
  const [password, setpassword] = useState(currentUser.password);
  const [key, setkey] = useState(apiKey[0].key);
  const [open, setOpen] = useState(false);
  const [open2, setOpen2] = useState(false);

  const handleClick = () => {
    setOpen(true);
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  const handleClick2 = () => {
    setOpen2(true);
  };

  const handleClose2 = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen2(false);
  };

  const updatePassword = async (e) => {
    e.preventDefault();
    try {
      const res = await db.collection("Admins").doc(currentUser.id).set(
        {
          password: password,
        },
        { merge: true }
      );
      handleClick();
    } catch (error) {
      console.log(error);
    }
  };

  const updateApiKey = async (e) => {
    e.preventDefault();
    try {
      const res = await db.collection("Api").doc(apiKey[0].id).set(
        {
          key: key,
        },
        { merge: true }
      );
      handleClick2();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      {/* <Typography variant="h4">Settings</Typography> */}
      <Card
        style={{
          padding: "20px",
        }}
      >
        <Grid container spacing={2}>
          <Grid item xs={12} md={10}>
            <TextField
              name="password"
              variant="outlined"
              fullWidth
              id="password"
              label="Password"
              value={password}
              onChange={(e) => setpassword(e.target.value)}
            />
          </Grid>
          <Grid item xs={12} md={2}>
            <Button
              variant="contained"
              color="primary"
              fullWidth
              onClick={updatePassword}
            >
              Update Password
            </Button>
          </Grid>
          <Grid item xs={12} md={10}>
            <TextField
              name="apiKey"
              variant="outlined"
              fullWidth
              id="apiKey"
              label="Api Key"
              value={key}
              onChange={(e) => setkey(e.target.value)}
            />
          </Grid>
          <Grid item xs={12} md={2}>
            <Button
              variant="contained"
              color="primary"
              fullWidth
              onClick={updateApiKey}
            >
              Update Api Key
            </Button>
          </Grid>
        </Grid>
      </Card>
      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="success">
          Password Updated!
        </Alert>
      </Snackbar>
      <Snackbar open={open2} autoHideDuration={6000} onClose={handleClose2}>
        <Alert onClose={handleClose2} severity="success">
          API Key Updated!
        </Alert>
      </Snackbar>
    </>
  );
};

export default Settings;
