import React, { useState } from "react";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import Alert from "@material-ui/lab/Alert";
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
    overflowX: "hidden",
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  input: {
    display: "none",
  },
}));

const AddUser = ({ open, handleClose, error, setError }) => {
  const classes = useStyles();
  const [userName, setuserName] = useState();
  const [email, setemail] = useState();
  const [password, setpassword] = useState();
  const [phoneNumber, setphoneNumber] = useState();
  const [image, setImage] = useState();

  const handleChange = (e) => {
    if (e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };

  const adduser = (e) => {
    e.preventDefault();
    const uploadImage = storage.ref(`images/${image.name}`).put(image);
    uploadImage.on(
      (error) => {
        console.log(error);
      },
      () => {
        storage
          .ref("images")
          .child(image.name)
          .getDownloadURL()
          .then(async (url) => {
            try {
              const checkUser = await db
                .collection("Members")
                .where("username", "==", userName)
                .get();

              if (checkUser.empty) {
                e.target.reset();
                const res = await db.collection("Members").add({
                  created_on: firebase.firestore.FieldValue.serverTimestamp(),
                  email_address: email,
                  password: password,
                  is_approved: false,
                  is_online: false,
                  phone_number: phoneNumber,
                  username: userName,
                  last_seen_at: 1,
                  user_image: url,
                });
              } else {
                setError("An User with same Username Already Exists");
              }
            } catch (error) {
              console.log(error);
            }
          });
      }
    );
  };
  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="form-dialog-title"
    >
      <DialogTitle id="form-dialog-title">Add User</DialogTitle>
      <DialogContent>
        <form className={classes.form} onSubmit={adduser}>
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
            <Grid item xs={8}>
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
            </Grid>
            <Grid item xs={4}>
              <PhotoCamera color="primary" />
              <input
                accept="image/*"
                id="contained-button-file"
                type="file"
                onChange={handleChange}
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
                type="password"
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
            Add User
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AddUser;
