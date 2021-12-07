import React, { useState } from "react";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import PhotoCamera from "@material-ui/icons/PhotoCamera";

import { db, storage } from "../../firebase/firebase";
import firebase from "firebase";

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
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
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  input: {
    display: "none",
  },
}));

const AddUser = ({
  open,
  handleClose,
  currentID,
  currentUsername,
  currentemail,
  currentpassword,
  currentphone,
}) => {
  const classes = useStyles();
  const [userName, setuserName] = useState(currentUsername);
  const [email, setemail] = useState(currentemail);
  const [password, setpassword] = useState(currentpassword);
  const [phoneNumber, setphoneNumber] = useState(currentphone);

  const updateUser = async (e) => {
    e.preventDefault();
    try {
      const res = await db.collection("Users").doc(currentID).set(
        {
          email_address: email,
          password: password,
          phone_number: phoneNumber,
          username: userName,
        },
        { merge: true }
      );
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="form-dialog-title"
    >
      <DialogTitle id="form-dialog-title">Update User</DialogTitle>
      <DialogContent>
        <form className={classes.form} onSubmit={updateUser}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                autoComplete="uname"
                name="userName"
                variant="outlined"
                required
                fullWidth
                id="userName"
                label="User Name"
                autoFocus
                value={userName}
                onChange={(e) => setuserName(e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                value={email}
                onChange={(e) => setemail(e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="password"
                label="Password"
                value={password}
                id="password"
                autoComplete="current-password"
                onChange={(e) => setpassword(e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="phonenumber"
                label="Phone Number"
                id="phonenumber"
                autoComplete="phonenumber"
                value={phoneNumber}
                onChange={(e) => setphoneNumber(e.target.value)}
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Update User
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AddUser;
