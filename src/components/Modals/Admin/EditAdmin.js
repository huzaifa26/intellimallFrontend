import React, { useState, useEffect } from "react";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import Alert from "@material-ui/lab/Alert";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";

import { db } from "../../firebase/firebase";
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
}));

const EditAdmin = ({
  open,
  handleClose,
  currentUsername,
  currentemail,
  currentpassword,
  currentID,
}) => {
  const classes = useStyles();
  const [userName, setuserName] = useState(currentUsername);
  const [email, setemail] = useState(currentemail);
  const [password, setpassword] = useState(currentpassword);
  const [error, setError] = useState();

  const updateUser = async (e) => {
    e.preventDefault();
    try {
      const UpdatedUser = await db.collection("Admins").doc(currentID).set(
        {
          username: userName,
          email_address: email,
          password: password,
          last_updated_at: firebase.firestore.FieldValue.serverTimestamp(),
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
      <DialogTitle id="form-dialog-title">Edit Admin</DialogTitle>
      <DialogContent>
        <form className={classes.form} onSubmit={updateUser}>
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
                id="password"
                autoComplete="current-password"
                value={password}
                onChange={(e) => setpassword(e.target.value)}
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
            Update Admin
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default EditAdmin;
