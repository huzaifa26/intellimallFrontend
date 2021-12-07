import React, { useState } from "react";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import Alert from "@material-ui/lab/Alert";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import { Typography, Divider, MenuItem } from "@material-ui/core";

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

const AddTask = ({ open, handleClose, users, locations }) => {
  const classes = useStyles();
  const [teamMember1, setteamMember1] = useState("");
  const [teamMember2, setteamMember2] = useState("");
  const [teamMember3, setteamMember3] = useState("");
  const [address, setaddress] = useState();

  const [riskLevel, setriskLevel] = useState();
  const [title, settitle] = useState();
  const [error, setError] = useState();

  const addTask = async (e) => {
    e.preventDefault();
    try {
      e.target.reset();
      const res = await db.collection("Tasks").add({
        created_on: firebase.firestore.FieldValue.serverTimestamp(),
        address: address.address,
        assigned_to: Array(teamMember1, teamMember2, teamMember3),
        location: Array(address.latitude, address.longitude),
        risk_level: riskLevel,
        location_id: address.id,
        status: "Not Started",
        title: title,
      });
    } catch (error) {
      console.log(error);
    }
  };

  const closeModal = () => {
    setteamMember1("");
    setteamMember2("");
    setteamMember3("");
    handleClose();
  };

  return (
    <Dialog
      open={open}
      onClose={closeModal}
      aria-labelledby="form-dialog-title"
    >
      <DialogTitle id="form-dialog-title">Add Task</DialogTitle>
      <DialogContent>
        <form className={classes.form} onSubmit={addTask}>
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
                autoComplete="title"
                name="title"
                variant="outlined"
                required
                fullWidth
                id="title"
                label="Title"
                autoFocus
                onChange={(e) => settitle(e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <Typography variant="h6">Assign To:</Typography>
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                select
                required
                fullWidth
                id="teammember1"
                label="Team Member 1"
                name="teammember1"
                onChange={(e) => setteamMember1(e.target.value)}
              >
                {users.map((item) => {
                  if (
                    item.is_approved &&
                    item.id != teamMember2 &&
                    item.id != teamMember3
                  ) {
                    return (
                      <MenuItem key={item.id} value={item.id}>
                        {item.username}
                      </MenuItem>
                    );
                  }
                })}
                <MenuItem>Not Needed</MenuItem>
              </TextField>
            </Grid>
            <Grid item xs={6}>
              <TextField
                variant="outlined"
                select
                fullWidth
                id="teammember2"
                label="Team Member 2"
                name="teammember2"
                onChange={(e) => setteamMember2(e.target.value)}
              >
                {users.map((item) => {
                  if (
                    item.is_approved &&
                    item.id != teamMember1 &&
                    item.id != teamMember3
                  ) {
                    return (
                      <MenuItem key={item.id} value={item.id}>
                        {item.username}
                      </MenuItem>
                    );
                  }
                })}
                <MenuItem>Not Needed</MenuItem>
              </TextField>
            </Grid>
            <Grid item xs={6}>
              <TextField
                variant="outlined"
                select
                fullWidth
                id="teammember3"
                label="Team Member 3"
                name="teammember3"
                onChange={(e) => setteamMember3(e.target.value)}
              >
                {users.map((item) => {
                  if (
                    item.is_approved &&
                    item.id != teamMember2 &&
                    item.id != teamMember1
                  ) {
                    return (
                      <MenuItem key={item.id} value={item.id}>
                        {item.username}
                      </MenuItem>
                    );
                  }
                })}
                <MenuItem>Not Needed</MenuItem>
              </TextField>
            </Grid>
            <Grid item xs={12}>
              <Divider variant="middle" />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                select
                name="address"
                label="Address"
                id="address"
                onChange={(e) => setaddress(e.target.value)}
              >
                {locations.map((item) => (
                  <MenuItem key={item.id} value={item}>
                    {item.address}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="risklevel"
                label="Risk Level"
                id="risklevel"
                onChange={(e) => setriskLevel(e.target.value)}
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
            Add Task
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AddTask;
